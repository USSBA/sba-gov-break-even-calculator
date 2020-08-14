const _ = require('lodash');

// To handle batch write operation using DocumentClient
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#batchWrite-property
// https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html
// NOTE: The following properties are legacy and should not be used:
//  - AttributesToGet
//  - AttributeUpdates
//  - ConditionalOperator
//  - Expected

/*
 * "A single call to BatchWriteItem can write up to 16 MB of data,
 *  which can comprise as many as 25 put or delete requests.
 *  Individual items to be written can be as large as 400 KB."
 * https://docs.amazonaws.cn/en_us/amazondynamodb/latest/APIReference/API_BatchWriteItem.html
 */
const DEFAULT_BATCH_WRITE_ITEM_LIMIT = 25;

class DbBatchWriter {
  constructor(log = console, client) {
    this.log = log;
    this.client = client; // this is the DynamoDB.DocumentClient. This allows us to use the client.createSet() as needed
    this.params = {
      RequestItems: {},
    };
    this.createdAtState = { enabled: true, value: '' };
    this.updatedAtState = { enabled: true, value: '' };

    const self = this;
    this.internals = {
      itemLimit: DEFAULT_BATCH_WRITE_ITEM_LIMIT,
      currentSize: 0,
      tableName: null,
      puts: [],
      deletes: [],
      revGiven: false,
      toParams() {
        if (this.tableName === null) return self.params;
        self.params.RequestItems[this.tableName] = [...this.puts, ...this.deletes];
        return self.params;
      },
    };
  }

  table(name) {
    if (!_.isString(name) || _.isEmpty(_.trim(name)))
      throw new Error(`DbBatchWriter.table("${name}" <== must be a string and can not be empty).`);
    this.internals.tableName = name;
    return this;
  }

  disableCreatedAt() {
    if (this.params.UpdateExpression)
      throw new Error(
        'You tried to call DbBatchWriter.disableCreatedAt() after you called DbBatchWriter.update(). Call disableCreatedAt() before calling update().',
      );
    this.createdAtState.enabled = false;
    return this;
  }

  createdAt(str) {
    if (this.params.UpdateExpression)
      throw new Error(
        'You tried to call DbBatchWriter.createdAt() after you called DbBatchWriter.update(). Call createdAt() before calling update().',
      );
    if (!_.isDate(str) && (!_.isString(str) || _.isEmpty(_.trim(str))))
      throw new Error(`DbBatchWriter.createdAt("${str}" <== must be a string or Date and can not be empty).`);
    this.createdAtState.enabled = true;
    this.createdAtState.value = _.isDate(str) ? str.toISOString() : str;
    return this;
  }

  disableUpdatedAt() {
    if (this.params.UpdateExpression)
      throw new Error(
        'You tried to call DbBatchWriter.disableUpdatedAt() after you called DbBatchWriter.update(). Call disableUpdatedAt() before calling update().',
      );
    this.updatedAtState.enabled = false;
    return this;
  }

  updatedAt(str) {
    if (this.params.UpdateExpression)
      throw new Error(
        'You tried to call DbBatchWriter.updatedAt() after you called DbBatchWriter.update(). Call updatedAt() before calling update().',
      );
    if (!_.isDate(str) && (!_.isString(str) || _.isEmpty(_.trim(str))))
      throw new Error(`DbBatchWriter.updatedAt("${str}" <== must be a string or Date and can not be empty).`);
    this.updatedAtState.enabled = true;
    this.updatedAtState.value = _.isDate(str) ? str.toISOString() : str;
    return this;
  }

  putItems(items) {
    if (!items || !Array.isArray(items)) return this;

    if (this.internals.currentSize + items.length > this.internals.itemLimit)
      throw new Error(
        `You tried to call DbBatchWriter.deleteItems() with more than ${this.internals.itemLimit} put or delete. Only ${this.internals.itemLimit} put or delete operations per request`,
      );

    items.forEach(item => {
      if (_.isUndefined(item.createdAt)) {
        let createdAt = this.createdAtState.value;
        if (this.createdAtState.enabled) {
          createdAt = _.isEmpty(createdAt) ? new Date().toISOString() : createdAt;
          item.createdAt = createdAt;
        }
      }

      if (_.isUndefined(item.updatedAt)) {
        let updatedAt = this.updatedAtState.value;
        if (this.updatedAtState.enabled) {
          updatedAt = _.isEmpty(updatedAt) ? new Date().toISOString() : updatedAt;
          item.updatedAt = updatedAt;
        }
      }
    });

    this.internals.puts = this.internals.puts.concat(
      items.map(item => {
        if (!_.isUndefined(item.PutRequest)) {
          return item;
        }

        return {
          PutRequest: { Item: item },
        };
      }),
    );

    this.internals.currentSize += items.length;

    return this;
  }

  deleteItems(keys) {
    if (!keys || !Array.isArray(keys)) return this;

    if (this.internals.currentSize + keys.length > this.internals.itemLimit)
      throw new Error(
        `You tried to call DbBatchWriter.deleteItems() with more than ${this.internals.itemLimit} put or delete. Only ${this.internals.itemLimit} put or delete operations per request`,
      );

    this.internals.deletes = this.internals.deletes.concat(
      keys.map(key => {
        if (!_.isUndefined(key.DeleteRequest)) {
          return key;
        }

        return {
          DeleteRequest: { Key: { HashKey: key } },
        };
      }),
    );

    this.internals.currentSize += keys.length;

    return this;
  }

  // suggested as 25 items by docs or 16 MB of data
  itemLimit(limit) {
    if (limit <= 0)
      throw new Error(
        `DbBatchWriter.itemLimit("${limit}" <== is not a valid value). Only positive number limits are allowed.`,
      );

    this.internals.limit = limit;
    return this;
  }

  // same as ReturnItemCollectionMetrics
  metrics(str) {
    const upper = str.toUpperCase();
    const allowed = ['NONE', 'SIZE'];
    if (!allowed.includes(upper))
      throw new Error(
        `DbBatchWriter.metrics("${upper}" <== is not a valid value). Only ${allowed.join(',')} are allowed.`,
      );
    this.params.ReturnItemCollectionMetrics = upper;
    return this;
  }

  // same as ReturnConsumedCapacity
  capacity(str = '') {
    const upper = str.toUpperCase();
    const allowed = ['INDEXES', 'TOTAL', 'NONE'];
    if (!allowed.includes(upper))
      throw new Error(
        `DbBatchWriter.capacity("${upper}" <== is not a valid value). Only ${allowed.join(',')} are allowed.`,
      );
    this.params.ReturnConsumedCapacity = upper;
    return this;
  }

  async write() {
    return this.client.batchWrite(this.internals.toParams()).promise();
  }
}

module.exports = DbBatchWriter;
