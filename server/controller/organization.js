const _ = require('lodash');
const { Router: router } = require('express');
const User = require('../model/user');
const Organization = require('model/organization');
const { authenticate } = require('../middleware/authMiddleware');
const { sendCreated, sendOne, sendUpdated } = require('./requests-helpers');
const { hasPermissionTo, actions } = require('../utils/permission-checker');

/**
 * Provide Api for Organization

 Organization Create  POST /api/v1/organization/
 @header
        Authorization: Bearer {token}
 @params
        name {string}

 Organization list  GET /api/v1/organization/
 @header
       Authorization: Bearer {token}

 Organization update  PUT /api/v1/organization/
 @header
        Authorization: Bearer {token}
 **/

const createOrganization = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_ORGANIZATIONS, user, res)) {
        return;
      }

      const organization = new Organization();
      _.extend(organization, {
        name: req.body.name,
        ownerId: req.user.id || 'adminId',
        localities: req.body.localities,
      });
      organization.save(organization)
        .then(savedOrganization => {
          _.extend(user, { organizationId: organization._id });
          user.save();

          return sendCreated(res, savedOrganization);
        })
        .catch(next);
    });
};

const getOrganization = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.VIEW_ORGANIZATIONS, user, res)) {
        return;
      }

      Organization.findOne({ _id: user.organizationId })
        .then(organization =>
          sendOne(res, { organization: organization && organization.publicOnly() })
        )
        .catch(next);
    }).catch(next);
};

const updateOrganization = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_ORGANIZATIONS, user, res)) {
        return;
      }

      Organization.findOne({ _id: req.params.organizationId })
        .then(organization => {
          _.extend(organization, req.body);
          return organization.save();
        })
        .then(sendUpdated(res))
        .catch(next);
    }).catch(next);
};

// eslint-disable-next-line no-unused-vars
module.exports = ({ config, db }) => {
  const api = router();

  api.get('/', authenticate, getOrganization);

  api.post('/', authenticate, createOrganization);

  api.put('/:organizationId', authenticate, updateOrganization);

  return api;
};
