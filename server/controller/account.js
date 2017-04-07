const _ = require('lodash');
const { Router: router } = require('express');
const User = require('model/user');
const passport = require('passport');
const { NotAcceptable, Unauthorized } = require('rest-api-errors');

const { generateAccessToken, respond, authenticate } = require('../middleware/authMiddleware');
const {
  sendOne,
  sendCreated,
  sendResponse,
  withoutErrors,
  sendUpdated,
} = require('./requests-helpers');
const { hasPermissionTo, actions } = require('../utils/permission-checker');

/**
* Provide Api for Account

  Account Register  POST /api/v1/account/
  @params
         email {string}
         password {string}
         firstName {string}
         lastName {string}

 Account Register  POST /api/v1/account/:inviteToken
 @params
         email {string}
         password {string}
         firstName {string}
         lastName {string}

  Account Login  POST /api/v1/account/login
  @params
         email {string}
         password {string}

  Account Logout  GET /api/v1/account/logout
  @header
         Authorization: Bearer {token}

  Account My  GET /api/v1/account/me
  @header
         Authorization: Bearer {token}

 Account change profile PUT /api/v1/account/
 @header
        Authorization: Bearer {token}
 @params
        profile {Object}
        profile.firstName {string}
        profile.lanstName {string}

Account change password PUT /api/v1/account/change-password
@header
       Authorization: Bearer {token}
@params
       oldPassword {string}
       newPassword {string}
 **/


const createUser = (role, organizationId) => (req, res, next, calback) => {
  const user = new User({
    organizationId,
    username: req.body.email,
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
    roles: role,
    isApproved: false,
  });
  User.register(user, req.body.password,
    withoutErrors(next, createdUser => {
      if (calback) {
        return calback(createdUser);
      }
      return sendCreated(res, createdUser.publicOnly());
    }));
};

const createUserWithToken = (req, res, next) => {
  const { inviteToken } = req.params;
  User.findOne({ 'inviteTokens.token': inviteToken })
    .then(user => {
      createUser('user', user.organizationId)(req, res, next, createdUser => {
        User.update({ _id: user._id }, { $pull:
          { inviteTokens: { token: inviteToken } } },
          withoutErrors(next, () => sendCreated(res, createdUser.publicOnly())));
      });
    })
    .catch(next);
};

const isCanLogin = (req, res, next) => {
  User.findOne({ username: req.body.email })
    .then(user => {
      if (user && !user.isApproved) {
        return Promise.reject(
          new Unauthorized(401, 'Not approved yet.')
        );
      }

      return next();
    })
    .catch(next);
};

const getUserProfile = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => sendOne(res, { user: user.publicOnly() }))
    .catch(next);
};

const changeProfile = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (req.params.userId !== user._id.toString() &&
        !hasPermissionTo(actions.EDIT_ACCOUNT, user, res)) {
        return;
      }
      _.extend(user.profile, req.body.profile);
      user.save()
        .then(savedUser => sendUpdated(res)(savedUser.publicOnly()))
        .catch(next);
    }).catch(next);
};


const changePassword = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      User.authenticate()(user.username, req.body.oldPassword, (err, authUser) => {
        if (!authUser) {
          return next(new NotAcceptable(406, 'Incorrect password'));
        }
        return user.setPassword(req.body.newPassword,
          withoutErrors(next, updatedUser =>
            updatedUser.save()
            .then(savedUser => sendUpdated(res)(savedUser.publicOnly()))
            .catch(next)));
      });
      return;
    }).catch(next);
};

// eslint-disable-next-line no-unused-vars
module.exports = ({ config, db }) => {
  const api = router();

  api.post(
    '/login',
    isCanLogin,
    passport.authenticate('local', { session: false, scope: [] }),
    generateAccessToken,
    respond
  );

  api.get('/logout', authenticate,
    (req, res, next) => {
      req.logout();
      sendResponse(res);
      next();
    });

  api.get('/me', authenticate, getUserProfile);
  api.post('/:inviteToken', createUserWithToken);
  api.post('/', (req, res, next) => createUser('owner')(req, res, next));
  api.put('/change-password', authenticate, changePassword);
  api.put('/:userId', authenticate, changeProfile);

  return api;
};
