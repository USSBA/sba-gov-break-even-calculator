const _ = require('lodash');

function toVersionString(num) {
  return `v${_.padStart(num, 4, '0')}_`;
}

function parseVersionString(str) {
  return parseInt(str.substring(1), 10);
}

// Convenient function to wrap the db call with a catch for the ConditionalCheckFailedException
async function runAndCatch(fn, handler, code = 'ConditionalCheckFailedException') {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    if (error && error.code === code) {
      return handler(error);
    }

    throw error;
  }
}

/**
 * A utility interval function for exponential back-off strategy. (i.e., intervals of 1, 2, 4, 8, 16 .. seconds)
 *
 * @param {Number} attemptCount
 * @param {Number} baseInterval
 * @return {Number}
 */
function exponentialInterval(attemptCount, baseInterval = 500) {
  return baseInterval * 2 ** attemptCount;
}

/**
 * A utility interval function for liner back-off strategy. (i.e., intervals of 1, 2, 3, 4, 5 .. seconds)
 *
 * @param {Number} attemptCount
 * @param {Number} baseInterval
 * @return {Number}
 */
function linearInterval(attemptCount, baseInterval = 1000) {
  return baseInterval * attemptCount;
}

/**
 * Retries calling a function as many times as requested by the 'times' argument. The retries are done with
 * back-offs specified by the 'intervalFn'. By default, it uses {@link exponentialInterval} function to pause
 * between each retry with exponential back-off (i.e., intervals of 1, 2, 4, 8, 16 .. seconds)
 *
 * @param {Function} fn - the fn to retry if it is rejected ( "fn" must return a promise )
 *
 * @param {Number} times - how many times to attempt calling the function. This includes first attempt and all
 * retries.
 * @param {Function} intervalFn - The interval function to decide the pause between the attempts. The function is
 * invoked with one argument 'attempt' number. The 'attempt' here is the count of calls attempted so far. For
 * example, if the 'fn' fails during the first attempt then the 'intervalFn' is called with attempt = 1. The
 * intervalFn is expected to return the pause time in milliseconds to wait before making the next 'fn' call attempt.
 *
 * @returns {Promise<*>} The promise returned by the 'fn'. The returned promise will be rejected if the
 * 'fn' still fails after the specified number of attempts.
 */
function retry(fn, times = 3, intervalFn = exponentialInterval) {
  const tryAttempt = (attempt = 0) => {
    const errorHandlerFn = err => {
      // The first attempt should be counted in total tries (i.e., 'times')
      // so comparing the current attempt with '(times-1)' instead of 'times'
      if (attempt < times - 1) {
        return new Promise((resolve, reject) => {
          // increment the attempt count
          attempt += 1;
          // for retries after the first failed attempt use setTimeout to wait as directed by the 'intervalFn' before
          // attempting to call the function
          setTimeout(
            () =>
              tryAttempt(attempt)
                .then(resolve)
                .catch(reject),
            intervalFn(attempt),
          );
        });
      }
      return Promise.reject(err);
    };

    return fn().catch(errorHandlerFn);
  };

  return tryAttempt();
}

/**
 * A utility function to process given items in sequence of batches. Items in one batch are processed in-parallel but
 * all batches are processed sequentially i..e, processing of the next batch is not started until the previous batch is
 * complete.
 *
 * @param items Array of items to process
 * @param batchSize Number of items in a batch
 * @param processorFn A function to process the batch. The function is called with the item argument.
 * The function is expected to return a Promise with some result of processing the item.
 *
 * @returns {Promise<Array>}
 */
async function processInBatches(items, batchSize, processorFn) {
  const itemBatches = _.chunk(items, batchSize);

  let results = [];

  // Process all items in one batch in parallel and wait for the batch to
  // complete before moving on to the next batch
  for (let i = 0; i <= itemBatches.length; i += 1) {
    const itemsInThisBatch = itemBatches[i];
    // We need to await for each batch in loop to make sure they are awaited in sequence instead of
    // firing them in parallel disabling eslint for "no-await-in-loop" due to this
    // eslint-disable-next-line no-await-in-loop
    const resultsFromThisBatch = await Promise.all(
      //  Fire promise for each table in this batch and let it be processed in parallel
      _.map(itemsInThisBatch, processorFn),
    );

    // push all results from this batch into the main results array
    results = _.concat(results, resultsFromThisBatch);
  }
  return results;
}

/**
 * A utility function that processes items sequentially. The function uses the specified processorFn to process
 * items in the given order i.e., it does not process next item in the given array until the promise returned for
 * the processing of the previous item is resolved. If the processorFn throws error (or returns a promise rejection)
 * this functions stops processing next item and the error is bubbled up to the caller (via a promise rejection).
 *
 * @param items Array of items to process
 * @param processorFn A function to process the item. The function is called with the item argument.
 * The function is expected to return a Promise with some result of processing the item.
 *
 * @returns {Promise<Array>}
 */
async function processSequentially(items, processorFn) {
  return processInBatches(items, 1, processorFn);
}

module.exports = {
  toVersionString,
  parseVersionString,
  runAndCatch,
  exponentialInterval,
  linearInterval,
  retry,
  processSequentially,
  processInBatches,
};
