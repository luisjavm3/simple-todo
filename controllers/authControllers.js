const User = require('../model/User');
const ValidationError = require('../utils/ValidationError');

const signup = async (req, res) => {
  const { email } = req.body;

  const newUser = await User.create(req.body);

  res.send(newUser);
};

const signin = (req, res) => {};

const logout = (req, res) => {};

module.exports = { signin, signup, logout };
