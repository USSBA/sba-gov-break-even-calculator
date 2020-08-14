const _ = require('lodash');
const Service = require('@aws-ee/services-container/lib/service');

const { runAndCatch } = require('../helpers/utils');
const createSchema = require('../schema/create-widget');
const updateSchema = require('../schema/update-widget');

const settingKeys = {
  tableName: 'dbTableWidgets',
};

class WidgetService extends Service {
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
    this._scanner = () => dbService.helper.scanner().table(table);
  }

  async find(requestContext, { id, fields = [] }) {
    // TODO - figure out permissions

    const result = await this._getter()
      .key({ id })
      .projection(fields)
      .get();

    return this._fromDbToDataObject(result);
  }

  async mustFind(requestContext, { id, fields = [] }) {
    const result = await this.find(requestContext, { id, fields });
    if (!result) throw this.boom.notFound(`widget with id "${id}" does not exist`, true);
    return result;
  }

  async create(requestContext, rawData) {
    const [validationService] = await this.service(['jsonSchemaValidationService']);

    // TODO - figure out permissions

    // Validate input
    await validationService.ensureValid(rawData, createSchema);

    // For now, we assume that 'createdBy' and 'updatedBy' are always users and not groups
    const by = _.get(requestContext, 'principalIdentifier'); // principalIdentifier shape is { username, ns: user.ns }
    const id = rawData.id;

    // Prepare the db object
    const dbObject = this._fromRawToDbObject(rawData, { rev: 0, createdBy: by, updatedBy: by });

    // Time to save the the db object
    const result = await runAndCatch(async () => {
      return this._updater()
        .condition('attribute_not_exists(id)') // yes we need this
        .key({ id })
        .item(dbObject)
        .update();
    }, async () => {
      throw this.boom.badRequest(`widget with id "${id}" already exists`, true);
    });

    return result;
  }

  async update(requestContext, rawData) {
    const [validationService] = await this.service(['jsonSchemaValidationService']);

    // TODO - figure out permissions

    // Validate input
    await validationService.ensureValid(rawData, updateSchema);

    // For now, we assume that 'updatedBy' is always a user and not a group
    const by = _.get(requestContext, 'principalIdentifier'); // principalIdentifier shape is { username, ns: user.ns }
    const { id, rev } = rawData;

    // Prepare the db object
    const dbObject = _.omit(this._fromRawToDbObject(rawData, { updatedBy: by }), ['rev']);

    // Time to save the the db object
    const result = await runAndCatch(async () => {
      return this._updater()
        .condition('attribute_exists(id)') // yes we need this
        .key({ id })
        .rev(rev)
        .item(dbObject)
        .update();
    }, async () => {
      // There are two scenarios here:
      // 1 - The widget does not exist
      // 2 - The "rev" does not match
      // We will display the appropriate error message accordingly
      const existing = await this.find(requestContext, { id, fields: ['id', 'updatedBy'] });
      if (existing) {
        throw this.boom.badRequest(`widget information changed by "${(existing.updatedBy || {}).username}" just before your request is processed, please try again`, true);
      }
      throw this.boom.notFound(`widget with id "${id}" does not exist`, true);
    });

    return result;
  }

  async delete(requestContext, { id }) {
    // TODO - figure out permissions

    // Lets now remove the item from the database
    const result = await runAndCatch(async () => {
      return this._deleter()
        .condition('attribute_exists(id)') // yes we need this
        .key({ id })
        .delete();
    }, async () => {
      throw this.boom.notFound(`widget with id "${id}" does not exist`, true);
    });

    return result;
  }

  async list({ fields = [] } = {}) {
    // Remember doing a scanning is not a good idea if you billions of rows
    return this._scanner()
      .limit(1000)
      .projection(fields)
      .scan();
  }

  // Do some properties renaming to prepare the object to be saved in the database
  _fromRawToDbObject(rawObject, overridingProps = {}) {
    const dbObject = { ...rawObject, ...overridingProps };
    return dbObject;
  }

  // Do some properties renaming to restore the object that was saved in the database
  _fromDbToDataObject(rawDb, overridingProps = {}) {
    if (_.isNil(rawDb)) return rawDb; // important, leave this if statement here, otherwise, your update methods won't work correctly
    if (!_.isObject(rawDb)) return rawDb;

    const dataObject = { ...rawDb, ...overridingProps };
    return dataObject;
  }

}

module.exports = WidgetService;
