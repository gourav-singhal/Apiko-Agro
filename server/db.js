const mongoose = require('mongoose');
const config = require('config/config');

mongoose.Promise = global.Promise;

module.exports = callback =>
  callback(mongoose.connect(config.mongoURI));
