const User = require('../model/User');
const Todo = require('../model/Todo');

const newTodo = async (req, res) => {
  const user = req.user;
  const { name } = req.body;

  const newTodo = await Todo.create({ name, user: user._id });

  res.send(newTodo);
};

module.exports = { newTodo };
