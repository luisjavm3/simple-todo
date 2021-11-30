const Todo = require('../model/Todo');

const getTodos = async (req, res) => {
  const userId = req.params.id;

  const todos = await Todo.find({ user: userId });

  res.send(todos);
};

module.exports = { getTodos };
