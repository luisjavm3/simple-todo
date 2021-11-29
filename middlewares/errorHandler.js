const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorResponse)
    return res.status(err.code).json({ error: err.message });

  switch (err.name) {
    case 'ValidationError':
      let errors = {};

      Object.keys(err.errors).map((key) => {
        errors[key] = err.errors[key].message;
      });

      return res.status(403).json({ type: 'ValidationError', errors });

    case 'JsonWebTokenError':
      return res.status(403).json({ error: err.message });

    default:
      break;
  }

  if (err.code === 11000) {
    let errors = {};
    const type = 'ValidationError';
    const field = Object.keys(err.keyValue)[0];
    errors[field] = `${field} already exists.`;

    return res.status(403).json({ type, errors });
  }

  res.status(400).json({ error: err?.message, stack: err });
};

module.exports = errorHandler;
