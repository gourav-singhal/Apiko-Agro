const { Router: router } = require('express');
const ExchangeAct = require('model/exchange-act');
const User = require('../model/user');
const Area = require('../model/area');
const { sendCreated } = require('./requests-helpers');
const { hasPermissionTo, actions } = require('../utils/permission-checker');
const { authenticate } = require('../middleware/authMiddleware');

/**
 * Provide Api for Contracts

 Contracts create  POST /api/v1/contracts/
 @header
         Authorization: Bearer {token}
 @params
         firstAreaId: {string}
         secondAreaId: {string}
         firstRenterId: {string}
         secondRenterId:{string}
         dateOfExchange: {date}
         expiration: {number}

 **/

const createExchangeAct = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_EXCHANGE_ACTS, user, res)) {
        return;
      }
      const exchangeActInstance = new ExchangeAct();
      const { body } = req;

      exchangeActInstance.insert(Object.assign(body, { organizationId: user.organizationId }))
        .then(exchangeAct => {
          Area.update({ renterId: exchangeAct.firstRenterId },
            { $set: { renterId: exchangeAct.secondRenterId } }, () => {});
          Area.update({ renterId: exchangeAct.secondRenterId },
            { $set: { renterId: exchangeAct.firstRenterId } }, () => {});
          sendCreated(res, exchangeAct);
        })
        .catch(next);
    })
    .catch(next);
};


module.exports = () => {
  const api = router();
  api.post('/', authenticate, createExchangeAct);

  return api;
};
