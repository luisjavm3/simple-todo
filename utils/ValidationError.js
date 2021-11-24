class ValidationError extends Error {
  constructor(err) {
    super();
    this.type = 'ValidationError';
    this.code = 403;
    this.errors = {};
    this.name = this.constructor.name;

    Object.keys(err.errors).map((key) => {
      errors[key] = err.errors[key].message;
    });
  }
}

module.exports = ValidationError;
