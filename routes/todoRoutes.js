const { Router } = require('express');
const { newTodo } = require('../controllers/todoControllers');
const isAuth = require('../middlewares/isAuth');

const todoRoutes = Router();

todoRoutes.route('/').post(isAuth, newTodo);

module.exports = todoRoutes;
