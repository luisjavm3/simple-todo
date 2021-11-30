const { Router } = require('express');

const {
  newTodo,
  updateTodo,
  deleteTodo,
  findTodo,
} = require('../controllers/todoControllers');
const isAuth = require('../middlewares/isAuth');

const todoRoutes = Router();

todoRoutes.route('/').post(isAuth, newTodo);
todoRoutes.route('/:id').get(isAuth, findTodo);
todoRoutes.route('/:id').put(isAuth, updateTodo);
todoRoutes.route('/:id').delete(isAuth, deleteTodo);

module.exports = todoRoutes;
