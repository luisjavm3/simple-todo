const IsEmail = require('isemail');

const validateEmail = (email) => {
  return IsEmail.validate(email);
};

module.exports = validateEmail;
