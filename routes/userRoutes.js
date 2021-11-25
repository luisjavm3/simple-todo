const express = require('express');

const isAuth = require('../middlewares/isAuth');

const userRoutes = express.Router();

userRoutes.route('/me').get(isAuth, (req, res) => {
  res.send('Seeing my own information.');
});

module.exports = userRoutes;
