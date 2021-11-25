const User = require('../model/User');
const generateToken = require('../utils/generateToken');
const ErrorResponse = require('../utils/ErrorResponse');

const signup = async (req, res) => {
  const newUser = await User.create(req.body);

  const token = generateToken(newUser._id);

  res.status(200).json({ token });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.isMatch(password))
    throw new ErrorResponse('Wrong credentials.', 401);

  const token = generateToken(user.id);

  res.status(200).json({ token });
};

const logout = (req, res) => {};

module.exports = { signin, signup, logout };
