const express = require('express');

const userRoutes = express.Router();

userRoutes.route('/').get((req, res) => {
  const data = req.body;

  res.send(data);
});

module.exports = userRoutes;
