const express = require('express');

const isAuth = require('../middlewares/isAuth');

const userRoutes = express.Router();

userRoutes.route('/me').get(isAuth, (req, res) => {
  let user = { ...req.user._doc };
  delete user.password;
  delete user.__v;

  res.send(user);
});

module.exports = userRoutes;
