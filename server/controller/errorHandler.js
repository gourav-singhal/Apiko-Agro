const { APIError, InternalServerError } = require('rest-api-errors');
const { STATUS_CODES } = require('http');

// eslint-disable-next-line
module.exports = (err, req, res, next) => {
  const error = err.status === 401 ||
    err instanceof APIError || err.name === 'ValidationError' ? err : new InternalServerError();

  if (error instanceof InternalServerError) {
    // eslint-disable-next-line
    console.log('-----> Unknown server error...');
    // todo: comment here for production
    // eslint-disable-next-line
    console.log(err);
  }
  res
    .status(error.status || 500)
    .json({
      code: error.code || 500,
      message: error.message || STATUS_CODES[error.status],
    });
};
