const express = require('express');

const account = require('controller/account');
const amazonS3 = require('controller/amazonS3');
const department = require('controller/department');
const localities = require('controller/localities');
const fields = require('controller/fields');
const landlord = require('controller/landlord');
const renter = require('controller/renter');
const organization = require('controller/organization');
const user = require('controller/user');
const polygons = require('controller/polygons');
const areas = require('controller/areas');
const exchangeActs = require('controller/exchange-acts');

const config = require('config/config');
const middleware = require('middleware');
const initializeDb = require('db');
const contracts = require('controller/contracts');

const router = express();

// connect to db
initializeDb(db => {
  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/api/v1)
  router.use('/account', account({ config, db }));
  router.use('/amazonS3', amazonS3({ config, db }));
  router.use('/departments', department({ config, db }));
  router.use('/fields', fields({ config, db }));
  router.use('/areas', areas({ config, db }));
  router.use('/localities', localities({ config, db }));
  router.use('/landlords', landlord({ config, db }));
  router.use('/fields', fields({ config, db }));
  router.use('/renters', renter({ config, db }));
  router.use('/amazonS3', amazonS3({ config, db }));
  router.use('/organizations', organization({ config, db }));
  router.use('/users', user({ config, db }));
  router.use('/polygons', polygons({ config, db }));
  router.use('/contracts', contracts({ config, db }));
  router.use('/exchange-acts', exchangeActs({ config, db }));
});

module.exports = router;
