const { Router: router } = require('express');
const _ = require('lodash');
const Contract = require('model/contract');
const User = require('../model/user');
const { sendCreated, sendUpdated, sendList, sendDeleted } = require('./requests-helpers');
const { hasPermissionTo, actions } = require('../utils/permission-checker');
const { authenticate } = require('../middleware/authMiddleware');

/**
 * Provide Api for Contracts

 Contracts list GET /api/v1/contracts
 @header
 Authorization: Bearer {token}

 Contracts create  POST /api/v1/contracts/
 @params
         cadastralNumber {string}
         extract {string}
         registrationDate {date}
         registrationNumber {string}
         signatureDate {date}
         validity {number}

 Contracts update  PUT /api/v1/contracts/:contractId
 @params
         cadastralNumber {string}
         extract {string}
         registrationDate {date}
         registrationNumber {string}
         signatureDate {date}
         validity {number}

 Contracts delete  DELETE /api/v1/contracts/:contractId
 @header
 Authorization: Bearer {token}

 **/

const createContract = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_CONTRACTS, user, res)) {
        return;
      }
      const contract = new Contract();
      const { body } = req;

      contract.insert(body)
        .then(createdContract => sendCreated(res, createdContract))
        .catch(next);
    })
    .catch(next);
};

const getContracts = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.VIEW_CONTRACTS, user, res)) {
        return;
      }
      Contract.find()
        .then(contracts => sendList(res, { contracts }))
        .catch(next);
    }).catch(next);
};

const updateContact = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_CONTRACTS, user, res)) {
        return;
      }
      Contract.findById(req.params.contractId)
        .then(contract => {
          _.extend(contract, req.body);
          return contract.save();
        })
        .then(sendUpdated(res))
        .catch(next);
    }).catch(next);
};

const removeContract = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_CONTRACTS, user, res)) {
        return;
      }
      Contract.findByIdAndRemove(req.params.contractId)
        .then(sendDeleted(res))
        .catch(next);
    })
    .catch(next);
};

module.exports = () => {
  const api = router();
  api.post('/', authenticate, createContract);
  api.get('/', authenticate, getContracts);
  api.put('/:contractId', authenticate, updateContact);
  api.delete('/:contractId', authenticate, removeContract);

  return api;
};
