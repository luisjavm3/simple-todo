const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorResponse)
    return res.status(err.code).json({ error: err.message });

  if (err.name === 'ValidationError') {
    let errors = {};

    Object.keys(err.errors).map((key) => {
      errors[key] = err.errors[key].message;
    });

    return res.status(403).json({ type: 'ValidationError', errors });
  }

  res.status(400).json({ error: err?.message, stack: err });
};

module.exports = errorHandler;
