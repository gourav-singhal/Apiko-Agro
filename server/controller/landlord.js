/* eslint-disable */
const _ = require('lodash');
const { Router: router } = require('express');
const { MethodNotAllowed } = require('rest-api-errors');

const User = require('../model/user');
const Landlord = require('../model/landlord');
const File = require('../model/file');

const { authenticate } = require('../middleware/authMiddleware');
const { hasPermissionTo, actions } = require('../utils/permission-checker');
const {
  sendCreated,
  sendUpdated,
  sendList,
  sendDeleted } = require('./requests-helpers');
/* eslint-disable */

/**
* Provide Api for Landlords

  Landlords list GET /api/v1/landlords
  @header
  Authorization: Bearer {token}

  Landlord create  POST /api/v1/landlords
  @header
         Authorization: Bearer {token}

  Landlords update  PUT /api/v1/landlords/:landlordId
  @header
         Authorization: Bearer {token}

  Landlords remove  DELETE /api/v1/landlords/:landlordId
  @header
         Authorization: Bearer {token}
 **/

const getLandlords = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.VIEW_LANDLORDS, user, res)) {
        return;
      }
      Landlord.find({ ordanizationId: user.ordanizationId })
        .then(landlords => sendList(res, { landlords }))
        .catch(next);
    })
    .catch(next);
};

const createLandlord = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_LANDLORDS, user, res)) {
        return;
      }
      const landlord = new Landlord();

      const { body } = req;
      const { files } = body;


      landlord.insert(Object.assign(body, { organizationId: user.organizationId }))
        .then(insertedLandlord => {
          if(files && files.length) {
            const file = new File();
            files.forEach(file => _.extend(file, { organizationId: user.organizationId }));
            file.insertAll(files)
              .then(insertedFiles => {
                Landlord.update({ _id: insertedLandlord._id },
                  { $set: { fileIds: insertedFiles.insertedIds } })
                  .then(()=> sendCreated(res, insertedLandlord))
                  .catch(next);
              })
              .catch(next);
          }
          sendCreated(res, insertedLandlord);
        })
        .catch(next);
    })
    .catch(next);
};

const removeLandlord = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_LANDLORDS, user, res)) {
        return;
      }

      Landlord.findByIdAndRemove(req.params.landlordId)
        .then(sendDeleted(res))
        .catch(next);
    })
    .catch(next);
};

const updateLandlord = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_LANDLORDS, user, res)) {
        return;
      }

      Landlord.findById(req.params.landlordId)
        .then(landlord => {
          _.extend(landlord, req.body);
          return landlord.save();
        })
        .then(sendUpdated(res))
        .catch(next);
    })
    .catch(next);
};


// eslint-disable-next-line no-unused-vars
module.exports = ({ config, db }) => {
  const api = router();
  api.get('/', authenticate, getLandlords);
  api.post('/', authenticate, createLandlord);
  api.delete('/:landlordId', authenticate, removeLandlord);
  api.put('/:landlordId', authenticate, updateLandlord);

  return api;
};
