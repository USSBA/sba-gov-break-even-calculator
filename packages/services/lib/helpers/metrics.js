const { metricScope } = require('aws-embedded-metrics');

async function sendMetrics(service, items) {
  const metrics = metricScope(metrics => async event => {
    metrics.putDimensions({ Service: service });
    metrics.putMetric('Duration', items.duration, 'Milliseconds');
    metrics.putMetric('Success', items.success);
    metrics.setProperty('TransactionId', items.transactionId);
    metrics.setProperty('Start', items.start);
    metrics.setProperty('End', items.end);
    metrics.setProperty('StartTimestamp', items.startTimestamp);
    metrics.setProperty('EndTimestamp', items.endTimestamp);
    metrics.setProperty('Payload', items.payload);
  });
  await metrics();
}

module.exports = {
  sendMetrics,
};
