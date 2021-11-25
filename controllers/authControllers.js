const User = require('../model/User');
const generateToken = require('../utils/generateToken');

const signup = async (req, res) => {
  const newUser = await User.create(req.body);

  const token = generateToken(newUser._id);

  res.status(200).json({ token });
};

const signin = (req, res) => {};

const logout = (req, res) => {};

module.exports = { signin, signup, logout };
