const Migration = require('model/migration');
const _ = require('lodash');
const migrations = require('./migrations');

module.exports = version => {
  const migrationsCount = migrations.length;

  if (!migrationsCount) {
    return;
  }

  if (_.isUndefined(version) || (version !== 'latest' && !_.isNumber(version))) {
    // eslint-disable-next-line no-console
    console.error('wrong migration version');
    return;
  }

  const newVersion = version === 'latest' ? migrations.length : version;

  Migration.findOne({}).then(migrationDoc => {
    const currentMigration = migrationDoc || new Migration();
    let migrationList;

    const currentVersion = currentMigration ? currentMigration.version : 0;
    if (newVersion === currentVersion) {
      return;
    }
    _.extend(currentMigration, { version: newVersion });

    if (newVersion > currentVersion) {
      migrationList = migrations.filter(migration => (
        migration.version > currentVersion && migration.version <= newVersion
      ));
      migrate('up', migrationList);
    } else {
      migrationList = migrations.filter(migration => (
        migration.version <= currentVersion && migration.version > newVersion
      ));
      migrate('down', migrationList.reverse());
    }

    currentMigration.save();
  });
};

function migrate(action, migrationList, index = 0) {
  const nextIndex = index + 1;
  const migration = migrationList[index];
  if (!migration) {
    return;
  }
  // eslint-disable-next-line no-console
  console.log(`Start migration to version ${migration.version}: ${migration.name}`);
  migration[action](() => {
    // eslint-disable-next-line no-console
    console.log(`End migration to version ${migration.version}: ${migration.name}`);
    migrate(action, migrationList, nextIndex);
  });
}
