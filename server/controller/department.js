const _ = require('lodash');
const { Router: router } = require('express');

const Department = require('model/department');
const User = require('model/user');

const { sendCreated, sendUpdated, sendDeleted, sendList } = require('./requests-helpers');
const { hasPermissionTo, actions } = require('../utils/permission-checker');
const { authenticate } = require('../middleware/authMiddleware');


/**
 * Provide Api for Departments

Departments list GET /api/v1/department/
@header
       Authorization: Bearer {token}

Departments create  POST /api/v1/department/
@header
      Authorization: Bearer {token}
@param
     name: {string}
     localitiesIds: {string}

Departments update  PUT /api/v1/department/:departmentId
@header
      Authorization: Bearer {token}

Departments remove  DELETE /api/v1/department/:departmentId
@header
      Authorization: Bearer {token}
 **/

const getDepartments = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.VIEW_DEPARTMENTS, user, res)) {
        return;
      }
      Department.find({ organizationId: user.organizationId })
        .then(departments => sendList(res, { departments }))
        .catch(next);
    })
    .catch(next);
};

const createDepartment = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_DEPARTMENTS, user, res)) {
        return;
      }

      const department = new Department();

      const { name, localitiesIds, organizationId } = req.body;
      _.extend(department, { name, localitiesIds, organizationId });
      department.save()
        .then(savedDepartment => sendCreated(res, savedDepartment))
        .catch(next);
    })
    .catch(next);
};

const removeDepartment = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_DEPARTMENTS, user, res)) {
        return;
      }

      Department.findByIdAndRemove(req.params.departmentId)
        .then(sendDeleted(res))
        .catch(next);
    })
    .catch(next);
};

const updateDepartment = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_DEPARTMENTS, user, res)) {
        return;
      }

      Department.findById(req.params.departmentId)
        .then(department => {
          _.extend(department, req.body);
          return department.save();
        })
        .then(sendUpdated(res))
        .catch(next);
    })
    .catch(next);
};

// eslint-disable-next-line no-unused-vars
module.exports = ({ config, db }) => {
  const api = router();
  api.get('/', authenticate, getDepartments);
  api.post('/', authenticate, createDepartment);
  api.delete('/:departmentId', authenticate, removeDepartment);
  api.put('/:departmentId', authenticate, updateDepartment);

  return api;
};
