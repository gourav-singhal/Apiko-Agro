/* eslint-disable */
const { Router: router } = require('express');
const User = require('../model/user');
const { authenticate } = require('../middleware/authMiddleware');
const { MethodNotAllowed } = require('rest-api-errors');
const { hasPermissionTo, actions } = require('../utils/permission-checker');
const config = require('../config/config');
/* eslint-disable */

/**
 *
 Provide Api for Amazon S3

 Amazon S3 config  GET /api/v1/amazonS3
   @header
          Authorization: Bearer {token}
 **/

const getConfig = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.UPLOAD_FILES, user, res)) {
        throw new MethodNotAllowed();
      }
      res.status(200).json({ config: config.AS3 });
    }).catch(next);
};

// eslint-disable-next-line no-unused-vars
module.exports = ({ config, db }) => {
  const api = router();
  api.get('/', authenticate, getConfig);

  return api;
};
