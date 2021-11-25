const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'this_is_an_unsafe_jwt_secret';

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};

module.exports = generateToken;
