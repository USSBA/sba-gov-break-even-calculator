// This is where we keep all the static settings that we can derive from other settings.
// This helps us reduce the number of env variables that we need to pass to lambda, as an example.
// Remember there is a limit of about 4K for env variables.

const settingKeys = {
  tablePrefix: 'dbTablePrefix',
};

const provider = {
  getDefaults: settings => {
    const map = {};

    const tablePrefix = settings.get(settingKeys.tablePrefix);
    const table = (key, suffix) => {
      map[key] = `${tablePrefix}-${suffix}`;
    };

    // Db Insertion Point (do not change this text, it is being used by hygen cli)

    // add all the static settings you want to the map
    // example:  map[<setting name>] = setting value;

    return map;
  },
};

module.exports = provider;
