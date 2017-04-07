const _ = require('lodash');

/**
  Method for expend model.
  @toextend
          const Model = new Schema({...
          Model.methods.insert = insert(Model);
          Model.methods.insertAll = insertAll(Model);
 **/

/**
   Provide insert single object via promise

   @param Object: Model to save
   @example
           const model = new Model();
           model.insert({}).then(...).catch(...)
 **/
// eslint-disable-next-line
const insert = schema => function (model) {
  return new Promise((resolve, reject) => {
    const pickModel = _.pick(model, Object.keys(schema.obj));
    _.extend(this, pickModel);
    this.save((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

/**
 Provide insert multiple objects via promise

   @param Array: Models to save
   @example
           const model = new Model();
           model.insertAll([{}]).then(...).catch(...)
 **/
// eslint-disable-next-line
const insertAll = schema => function (models) {
  return new Promise((resolve, reject) => {
    const pickModels = models.map(pickModel =>
      _.pick(pickModel, Object.keys(schema.obj)));
    this.collection.insert(pickModels, (err, insertedModels) => {
      if (err) {
        reject(err);
      }
      resolve(insertedModels);
    });
  });
};

module.exports = {
  insert,
  insertAll,
};
