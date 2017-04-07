/* eslint-disable */

const _ = require('lodash');
const { Router: router } = require('express');
const User = require('../model/user');
const crypto = require('crypto');
const EmailSender = require('../utils/EmailSender');
const { sendAccepted, sendOne } = require('./requests-helpers');
const { authenticate } = require('../middleware/authMiddleware');
const errorHandler = require('./errorHandler');
const { hasPermissionTo, actions } = require('../utils/permission-checker');
const { withoutErrors } = require('./requests-helpers');
const { NotAcceptable } = require('rest-api-errors');

/* eslint-disable */

/**
* Provide Api for User
  User Invite  POST /api/v1/users/invite
  @header
         Authorization: Bearer {token}
  @params
         email: {string}
         subject: {string}
         language: {string}
 **/

const inviteUser = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if(!hasPermissionTo(actions.INVITE_USER, user, res)) {
        return;
      }
      const token = crypto.randomBytes(64).toString('hex');
      const tokenWithEmail = { token, email:req.body.email };
      User.update({ _id: user._id }, { $push: { inviteTokens: tokenWithEmail } },
        withoutErrors(next, () =>
          new EmailSender(req.body.subject, `invite-user_${req.body.language}`, res, {
            inviteLink: EmailSender.hrefFor(req, 'register', { inviteToken: token }, true),
          }).sendFor(req.body.email, withoutErrors(next, sendAccepted(res)))));
  }).catch(next);
};

const getEmailByInviteToken = (req, res, next) => {
  User.findOne({'inviteTokens.token': req.params.token })
    .then(user => {
      if (user) {
        const inviteToken = user.inviteTokens.find(inviteToken =>
          inviteToken.token === req.params.token);
        sendOne(res, { email: inviteToken.email });
      } else {
        throw new NotAcceptable(406, 'Token not found');
      }
    }).catch(next);
};

// eslint-disable-next-line no-unused-vars
module.exports = ({ config, db }) => {
  const api = router();
  api.get('/invite/:token', authenticate, getEmailByInviteToken);
  api.post('/invite', authenticate, inviteUser);
  return api;
};
