const Polygon = require('model/polygon');
const User = require('../model/user');
const { Router: router } = require('express');
const { sendList } = require('./requests-helpers');
const { authenticate } = require('../middleware/authMiddleware');
const { hasPermissionTo, actions } = require('../utils/permission-checker');

/**
 * Provide Api for Ares

   Ares list  GET /api/v1/polygons/:localityId
   @header
          Authorization: Bearer {token}
 **/

const getPolygons = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.VIEW_AREAS, user, res)) {
        return;
      }

      Polygon.find({ localityId: req.params.localityId })
        .then(polygons => sendList(res, { polygons }))
        .catch(next);
    });
};

// eslint-disable-next-line no-unused-vars
module.exports = ({ config, db }) => {
  const api = router();

  api.get('/:localityId', authenticate, getPolygons);

  return api;
};
