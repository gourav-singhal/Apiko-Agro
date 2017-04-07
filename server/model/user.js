const _ = require('lodash');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;
const { Unauthorized } = require('rest-api-errors');

const PUBLIC_FIELDS = ['_id', 'username', 'profile', 'roles'];

const User = new Schema({
  username: {
    type: String,
    required: [true],
    unique: true,
  },
  profile: {
    firstName: {
      type: String,
      required: [true],
    },
    lastName: {
      type: String,
      required: [true],
    },
    email: {
      type: String,
      required: [true],
    },
  },
  roles: {
    type: Array,
    required: [true],
  },
  isApproved: {
    type: Boolean,
    required: [true],
  },
  inviteTokens: Array,
  organizationId: String,
});

User.plugin(passportLocalMongoose);

User.methods.publicOnly = function publicOnly() {
  return _.pick(this, PUBLIC_FIELDS);
};

User.methods.localAuthenticate = function localAuthenticate(username, password, done) {
  this.findOne({ username }).then(user => {
    if (!user) {
      return done(new Unauthorized(401, 'Incorrect username.'), false);
    }
    return user.authenticate(password, (err, userData) => {
      if (!userData) {
        return done(new Unauthorized(401, 'Incorrect password.'), false);
      }
      return done(null, user);
    });
  })
  .catch(done);
};

module.exports = mongoose.model('User', User);
