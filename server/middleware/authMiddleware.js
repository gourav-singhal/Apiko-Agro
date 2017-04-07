const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('config/config');

const authenticate = expressJwt({ secret: config.secret });

/* eslint-disable */
const generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
  }, config.secret, {
    expiresIn: config.tokenTime
  });
  next();
};
/* eslint-disable */

const respond = (req, res) => res.status(200).json({
  user: req.user.username,
  token: req.token
});


module.exports =  {
  authenticate,
  generateAccessToken,
  respond
};
