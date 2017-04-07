const Localities = require('model/localities');
const User = require('../model/user');
const { Router: router } = require('express');
const { sendList } = require('./requests-helpers');
const { authenticate } = require('../middleware/authMiddleware');
const { hasPermissionTo, actions } = require('../utils/permission-checker');

const getLocalities = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.VIEW_LOCALITIES, user, res)) {
        return;
      }

      Localities.find()
        .then(localities => sendList(res, { localities }))
        .catch(next);
    });
};

// eslint-disable-next-line no-unused-vars
module.exports = ({ config, db }) => {
  const api = router();

  api.get('/', authenticate, getLocalities);

  return api;
};
