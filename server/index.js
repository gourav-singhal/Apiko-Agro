const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const path = require('path');
const mailer = require('express-mailer');

const config = require('config/config');
const routes = require('routes');
const User = require('model/user');
const errorHandler = require('controller/errorHandler');
const migrateToVersion = require('migrations');
require('./scheduler');

const app = express();

// middleware
app.use(bodyParser.json({
  limit: config.bodyLimit,
}));


// mailer
mailer.extend(app, config.emailing);


// jade
// this part of code not worked, have no idea why,
// so need create folder views folder in root project
app.set('views', path.join(__dirname, '/../public/templates'));
app.set('view engine', 'jade');
app.use(express.static(path.join(process.env.PWD, '/public')));

// Authorization
app.use(passport.initialize());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, new User().localAuthenticate.bind(User)));

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log('LocalStrategy')
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// api routes v1
app.use('/api/v1', routes);
app.use(errorHandler);

// migrate database to selected version defined in ./migrations/migration.js
migrateToVersion(3);

module.exports = app;
