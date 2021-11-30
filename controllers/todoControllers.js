// const User = require('../model/User');
const Todo = require('../model/Todo');
const ErrorResponse = require('../utils/ErrorResponse');

const newTodo = async (req, res) => {
  const user = req.user;
  const { name } = req.body;

  const newTodo = await Todo.create({ name, user: user._id });

  res.send(newTodo);
};

const findTodo = async (req, res) => {
  const id = req.params.id;

  let todo = await Todo.findById(id).populate('user');

  if (!todo) throw new ErrorResponse('Resource not found.', 400);

  let user = { ...todo.user._doc };
  delete user.password;
  delete user.email;
  delete user.__v;
  delete user.createdAt;
  delete user.updatedAt;

  todo.user = user;

  res.send(todo);
};

const updateTodo = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  let todo = await Todo.findById(id);

  if (!todo) throw new ErrorResponse('Resource not found.', 400);

  if (`${todo.user}` !== `${user._id}`)
    throw new ErrorResponse('Resource not owned.', 403);

  todo = await Todo.findByIdAndUpdate(
    id,
    { name: req.body.name },
    { new: true, runValidators: true }
  );

  res.send(todo);
};

const deleteTodo = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  const todo = await Todo.findById(id).populate('user');

  if (!todo) throw new ErrorResponse('Resource not found.', 400);

  // A User can not delete todos owned by others users
  if (user.role === 'USER' && `${todo.user._id}` !== `${user._id}`)
    throw new ErrorResponse('Resource not owned.', 403);

  // A Admin can delete todos from users, but not from others Admins
  if (todo.user.role === 'ADMIN' && `${todo.user._id}` !== `${user._id}`)
    throw new ErrorResponse(
      'You can not delete Todos from others Admins.',
      403
    );

  const deletedTodo = await Todo.findByIdAndDelete(id, { new: true });

  res.send(deletedTodo);
};

module.exports = { newTodo, findTodo, updateTodo, deleteTodo };
