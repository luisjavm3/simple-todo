const { Router } = require('express');
const { logout, signin, signup } = require('../controllers/authControllers');

const authRoutes = Router();

authRoutes.route('/signup').post(signup);
authRoutes.route('/signin').post(signin);
authRoutes.route('/logout').post(logout);

module.exports = authRoutes;
