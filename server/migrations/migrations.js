const _ = require('lodash');
const Field = require('../model/field');
const Area = require('../model/area');
const Landlord = require('../model/landlord');
const landlordsData = require('../../fixtures/lendlords.json');

/**
 To write a migration, define an object as last element of the array below.

 Properties of migration object:
        version {number}
        name {string}
        up {function} code to migrate up to current version
        down {function} code to migrate down to previous version

 To run migration, change argument of "migrateToVersion" function in server/index.js
 **/

module.exports = [
  {
    version: 1,
    name: 'Add polygonIds to Field collection',
    up(next) {
      Field.find({})
        .then(fields => {
          const areasOfFieldsPromises = fields.map(field => Area.find({ fieldId: field._id }));

          Promise.all(areasOfFieldsPromises)
            .then(areasOfFields => areasOfFields.map(areas => areas.map(area => area.polygonId)))
            .then(polygonIdsOfField => fields.reduce((fieldsSavingPromises, field, i) => {
              const polygonIds = polygonIdsOfField[i];
              if (polygonIds) {
                _.extend(field, { polygonIds });
                fieldsSavingPromises.push(field.save());
              }
              return fieldsSavingPromises;
            }, []))
            .then(fieldsSavingPromises => Promise.all(fieldsSavingPromises))
            .then(next);
        });
    },
    down(next) {
      Field.update({},
        { $unset: { polygonIds: '' } },
        { multi: true }
      )
        .then(next);
    },
  },
  {
    version: 2,
    name: 'Remove all areas',
    up(next) {
      Area.remove({}).then(next);
    },
    down(next) {
      Field.find({})
        .then(fields => fields.reduce((areaSavingPromises, field) => {
          field.polygonIds.forEach(polygonId => {
            const area = new Area();
            _.extend(area, {
              organizationId: '58d0fc0dfdca810695a37f99', // default organization
              fieldId: field._id,
              localityId: field.localityId,
              polygonId,
            });
            areaSavingPromises.push(area.save());
          });
          return areaSavingPromises;
        }, []))
        .then(areasSavingPromises => Promise.all(areasSavingPromises))
        .then(next);
    },
  },
  {
    version: 3,
    name: 'Upload landlords',
    up(next) {
      const personalIds = [];
      const landlordsSavingPromises = landlordsData.map(landlordData => {
        if (!personalIds.includes(landlordData['ІПН'])) {
          personalIds.push(landlordData['ІПН']);
          const landlord = new Landlord();

          _.extend(landlord, {
            fullName: landlordData['П.І.П'],
            status: landlordData['Стан'] === 'Помер' ? 'dead' : 'alive',
            personalId: landlordData['ІПН'],
            organizationId: '58d0fc0dfdca810695a37f99', // default organization
          });

          return landlord.save();
        }
        return null;
      });

      Promise.all(_.compact(landlordsSavingPromises)).then(next);
    },
    down(next) {
      Landlord.remove({}).then(next);
    },
  },
];
