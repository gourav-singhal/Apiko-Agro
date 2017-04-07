const _ = require('lodash');
const User = require('../model/user');
const Area = require('../model/area');
const File = require('../model/file');
const { Router: router } = require('express');
const { sendCreated, sendList, sendUpdated } = require('./requests-helpers');
const { authenticate } = require('../middleware/authMiddleware');
const { hasPermissionTo, actions } = require('../utils/permission-checker');

/**
 * Provide Api for Ares

 Areas list  GET /api/v1/areas/
 @header
        Authorization: Bearer {token}

 Area insert  POST /api/v1/areas/
 @header
        Authorization: Bearer {token}
 @param

 Area update  PUT /api/v1/areas/:areaId
 @header
        Authorization: Bearer {token}

 Area remove  DELETE /api/v1/areas/:areaId
 @header
        Authorization: Bearer {token}
 **/

const getAreas = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.VIEW_AREAS, user, res)) {
        return;
      }

      Area.find()
        .then(areas => sendList(res, { areas }))
        .catch(next);
    })
    .catch(next);
};

async function getArea(req, res) {
  const user = await User.findById(req.user.id);

  if (!hasPermissionTo(actions.VIEW_AREAS, user, res)) {
    return;
  }

  const area = await Area.findById(req.params.areaId);
  sendCreated(res, area);
}

async function getAreaByPolygon(req, res) {
  const user = await User.findById(req.user.id);

  if (!hasPermissionTo(actions.VIEW_AREAS, user, res)) {
    return;
  }

  const area = await Area.findOne({ polygonId: req.params.polygonId });
  sendCreated(res, area);
}

const createArea = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_AREAS, user, res)) {
        return;
      }
      const area = new Area();
      const files = req.body.files;
      area.insert(_.extend(req.body, { organizationId: user.organizationId }))
        .then(createdArea => {
          if (files && files.length) {
            const file = new File();
            files.forEach(fileObj => _.extend(fileObj, { organizationId: user.organizationId }));
            file.insertAll(files)
              .then(insertedFiles => {
                Area.update({ _id: createdArea._id },
                  { $set: { fileIds: insertedFiles.insertedIds } })
                  .then(() => sendCreated(res, createdArea))
                  .catch(next);
              })
              .catch(next);
          } else {
            sendCreated(res, createdArea);
          }
        })
        .catch(next);
    }).catch(next);
};

const updateArea = (req, res, next) => {
  const files = req.body.files;
  const areaId = req.params.areaId;
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_AREAS, user, res)) {
        return;
      }
      Area.findById(areaId)
        .then(area => {
          _.extend(area, req.body);
          if (files && files.length) {
            const file = new File();
            file.insertAll(files)
              .then(insertedFiles => {
                _.extend(area, { fileIds: _.concat(area.fileIds, insertedFiles.insertedIds) });
                return area.save();
              })
              .catch(next);
          }
          return area.save();
        })
        .then(sendUpdated(res))
        .catch(next);
    })
    .catch(next);
};

const removeArea = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!hasPermissionTo(actions.EDIT_AREAS, user, res)) {
        return;
      }
      return;
    })
    .catch(next);
};


// eslint-disable-next-line no-unused-vars
module.exports = ({ config, db }) => {
  const api = router();

  api.get('/', authenticate, getAreas);
  api.post('/', authenticate, createArea);
  api.get('/:areaId', authenticate, getArea);
  api.get('/polygon/:polygonId', authenticate, getAreaByPolygon);
  api.put('/:areaId', authenticate, updateArea);
  api.delete('/:areaId', authenticate, removeArea);

  return api;
};
