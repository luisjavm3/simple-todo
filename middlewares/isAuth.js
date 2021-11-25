const jwt = require('jsonwebtoken');

const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../model/User');

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = String(authorization).split(' ')[1];

  if (!token) throw new ErrorResponse('There is no authorization means.', 401);

  const JWT_SECRET = process.env.JWT_SECRET || 'this_is_an_unsafe_jwt_secret';

  const { id } = jwt.verify(token, JWT_SECRET);

  const user = await User.findById(id);

  if (!user) throw new ErrorResponse('There is no user with the given ID.');

  req.user = user;

  next();
};

module.exports = isAuth;
