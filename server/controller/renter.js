const _ = require('lodash');
const Renter = require('model/renter');
const { Router: router } = require('express');
const User = require('../model/user');
const { sendList } = require('./requests-helpers');
const { sendCreated, sendUpdated, sendDeleted } = require('./requests-helpers');
const { hasPermissionTo, actions } = require('../utils/permission-checker');
const { authenticate } = require('../middleware/authMiddleware');


/*
  Provide Api for Renters

  Renters list GET /api/v1/Renter/
  @header
         Authorization: Bearer {token}

  Renter create  POST /api/v1/Renter/
  @header
        Authorization: Bearer {token}
  @param
       name: {string}
       isOwner: {boolean}
       organizationId: {string}

  Renters update  PUT /api/v1/Renter/:RenterId
  @header
        Authorization: Bearer {token}

  Renters remove  DELETE /api/v1/Renter/:RenterId
  @header
      Authorization: Bearer {token}
*/

const getRenters = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.VIEW_RENTERS, user, res)) {
        return;
      }

      Renter.find()
        .then(renters => sendList(res, { renters }))
        .catch(next);
    })
    .catch(next);
};

async function getRenter(req, res) {
  const user = await User.findById(req.user.id);

  if (!hasPermissionTo(actions.VIEW_RENTERS, user, res)) {
    return;
  }

  const renter = await Renter.findById(req.params.renterId);
  sendCreated(res, renter);
}

const createRenter = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_RENTERS, user, res)) {
        return;
      }

      const renter = new Renter();
      const { name, isParticipiant } = req.body;
      _.extend(renter, {
        name,
        isParticipiant,
        organizationId: user.organizationId,
      });

      renter.save()
        .then(sendCreated(res))
        .catch(next);
    })
    .catch(next);
};

const removeRenter = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_RENTERS, user, res)) {
        return;
      }

      Renter.findByIdAndRemove(req.params.renterId)
        .then(sendDeleted(res))
        .catch(next);
    })
    .catch(next);
};

const updateRenter = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_RENTERS, user, res)) {
        return;
      }

      Renter.findById(req.params.renterId)
        .then(renter => {
          _.extend(renter, req.body);
          return renter.save();
        })
        .then(sendUpdated(res))
        .catch(next);
    })
    .catch(next);
};

// eslint-disable-next-line no-unused-vars
module.exports = ({ config, db }) => {
  const api = router();

  api.get('/', authenticate, getRenters);
  api.post('/', authenticate, createRenter);
  api.get('/:renterId', authenticate, getRenter);
  api.delete('/:renterId', authenticate, removeRenter);
  api.put('/:renterId', authenticate, updateRenter);

  return api;
};
