const Service = require('@aws-ee/services-container/lib/service');

const { runAndCatch } = require('../helpers/utils');
const obtainWriteLockSchema = require('../schema/obtain-write-lock');
const releaseWriteLockSchema = require('../schema/release-write-lock');

const settingKeys = {
  tableName: 'dbTableLocks',
};

class LockService extends Service {
  constructor() {
    super();
    this.dependency(['jsonSchemaValidationService', 'dbService']);
  }

  async init() {
    await super.init();
    const [dbService] = await this.service(['dbService']);
    const table = this.settings.get(settingKeys.tableName);

    this._getter = () => dbService.helper.getter().table(table);
    this._updater = () => dbService.helper.updater().table(table);
    this._query = () => dbService.helper.query().table(table);
    this._deleter = () => dbService.helper.deleter().table(table);
  }

  // If a lock could not be obtained undefined is returned
  async obtainWriteLock(rawData) {
    const [validationService] = await this.service(['jsonSchemaValidationService']);

    // Validate input
    await validationService.ensureValid(rawData, obtainWriteLockSchema);
    const { id, expiresIn } = rawData;
    const nowInSeconds = Math.ceil(Date.now() / 1000);
    const ttl = nowInSeconds + expiresIn;

    try {
      await this._updater()
        // .mark(['readLocks'])
        // .condition('attribute_not_exists(writeLock) AND (attribute_not_exists(readLocks) OR attribute_type(readLocks, :isNull ))') // later when we implement read locks
        .condition('attribute_not_exists(id) OR #ttl < :now ') // yes we need this
        .key('id', id)
        .names({ '#ttl': 'ttl' })
        .values({ ':now': nowInSeconds })
        .item({
          ttl,
        })
        .update();

      return id;
    } catch (err) {
      // Yes, in most cases, catching an exception to simply ignore it, is not a good practice. But, this is by design.
      return undefined;
    }
  }

  // Release the write lock
  async releaseWriteLock(rawData) {
    const [validationService] = await this.service(['jsonSchemaValidationService']);

    // Validate input
    await validationService.ensureValid(rawData, releaseWriteLockSchema);
    const { writeToken } = rawData;

    await runAndCatch(
      async () => {
        return this._deleter()
          .condition('attribute_exists(id)')
          .key('id', writeToken)
          .delete();
      },
      async () => {
        // we ignore the ConditionalCheckFailedException exception because it simply means that the entry might
        // have already been removed
      },
    );
  }

  // TODO
  // - read locks APIs
  // - extendWriteLock (to extend the expire of a lock)
  // - obtainReadLock
  // - extendReadLock
  // - releaseReadLock
  // - vacuumExpiredLocks
}

module.exports = LockService;
