const _ = require('lodash');
const permissions = require('./permissions');
const actions = require('./constants');
const { MethodNotAllowed } = require('rest-api-errors');
/**
  Provide check permissions for action,
    if pas 'res' param automatically sending response for client [403]

  @example
          import hasUserPermissionFor  = require('../../utils/permission-checker';

          if (!hasUserPermissionFor('CREATE_ORGANIZATION', userId, res)) {
            return false;
         }
**/

const ADMIN = 'admin';

// string => array => array
const isRoleHasPermission = action => role =>
 action === ADMIN || _.includes(permissions[role], action);

 /**
   Check permissions for acion

   @param action: String
   @param user: Object
   @param res: Object
   @return Boolean

  @example
          if (!hasPermissionTo(actions.CREATE_LANDLORD, user, res)) {
                throw new MethodNotAllowed();
          }

 **/
const hasPermissionTo = (action, user) => {
  const userPermissions = user && user.isApproved && user.roles.map(isRoleHasPermission(action));

  if (!(userPermissions && _.includes(userPermissions, true))) {
    throw new MethodNotAllowed(405, 'Permission denied');
  }

  return true;
};

module.exports = {
  hasPermissionTo,
  actions,
};

