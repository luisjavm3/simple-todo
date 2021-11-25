const User = require('../model/User');

const signup = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(200).json(newUser);
};

const signin = (req, res) => {};

const logout = (req, res) => {};

module.exports = { signin, signup, logout };
