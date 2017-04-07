const Field = require('model/field');
const User = require('model/user');
const Area = require('model/area');
const Polygon = require('model/polygon');
const Renter = require('model/renter');
const Landlord = require('../model/landlord');
const Contract = require('model/contract');
const Organization = require('model/organization');

const _ = require('lodash');
const { Router: router } = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { sendList, sendCreated, sendDeleted, sendUpdated } = require('./requests-helpers');
const { hasPermissionTo, actions } = require('../utils/permission-checker');
const getInnerPolygons = require('../utils/polygons/innerPolygons');
/**
 * Provide Api for Fields

 Fields list GET /api/v1/fields/
 @header
        Authorization: Bearer {token}

 Fields create  POST /api/v1/fields/
 @header
        Authorization: Bearer {token}
 @param
       name: {string}
 localitiesIds: {string}

 Fields update  PUT /api/v1/fields/:fieldId
 @header
        Authorization: Bearer {token}

 Fields remove  DELETE /api/v1/fields/:fieldId
 @header
        Authorization: Bearer {token}
 **/

const getFields = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.VIEW_FIELDS, user, res)) {
        return;
      }

      Organization.findOne({ _id: user.organizationId })
        .then(organization => organization && Field.find({
          organizationId: organization._id,
          localityId: { $in: organization.localities.map(locality => locality.id) },
        }))
        .then(fields => sendList(res, { fields }))
        .catch(next);
    })
    .catch(next);
};

const createField = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_FIELDS, user, res)) {
        return;
      }

      Organization.findOne({
        ownerId: req.user.id,
      })
        .then(organization => {
          const field = new Field();
          const fieldToSave = Object.assign(req.body, {
            organizationId: organization._id,
          });

          _.extend(field, fieldToSave);
          return field.save();
        })
        .then(sendCreated(res))
        .catch(next);
    })
    .catch(next);
};

const updateField = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_FIELDS, user, res)) {
        return;
      }

      Field.findById(req.params.fieldId)
        .then(field => {
          Area.update({
            polygonId: { $in: req.body.innerPolygonsIds },
          }, { fieldId: field._id });

          _.extend(field, req.body.field);
          return field.save();
        })
        .then(sendUpdated(res))
        .catch(next);
    })
    .catch(next);
};

const removeField = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_FIELDS, user, res)) {
        return;
      }

      Field.findByIdAndRemove(req.params.fieldId)
        .then(sendDeleted(res))
        .catch(next);
    })
    .catch(next);
};

const getInnerPolygonsByLocality = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!hasPermissionTo(actions.EDIT_FIELDS, user, res)) {
      return;
    }
    const polygons = await Polygon.find({ localityId: req.body.localityId });
    const innerPolygons = getInnerPolygons(req.body.fieldCoords, polygons);
    const organization = await Organization.findById(user.organizationId);

    const resultForTable = [];
    for (const polygon of innerPolygons) {
      const area = await Area.findOne({ polygonId: polygon._id }) || {};
      const contract = await Contract.findOne({ polygonId: polygon._id }) || {};
      const landlord = await Landlord.findOne({ _id: { $in: area.landlordIds } }) || {};
      const renter = await Renter.findById(area.renterId) || {};

      resultForTable.push({
        _id: polygon._id,
        cadastralNumber: polygon.cadastralNumber,
        landlordName: landlord.name,
        renterName: renter.name,
        contractNumber: contract.registrationNumber,
        isOrganizationOwner: area.organizationId === organization._id.toString(),
      });
    }

    sendList(res)(resultForTable);
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line no-unused-vars
module.exports = ({ config, db }) => {
  const api = router();

  api.get('/', authenticate, getFields);
  api.post('/', authenticate, createField);
  api.post('/inner-polygons', authenticate, getInnerPolygonsByLocality);
  api.put('/:fieldId', authenticate, updateField);
  api.delete('/:fieldId', authenticate, removeField);

  return api;
};
