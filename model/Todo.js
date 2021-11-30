const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Todo must have a user reference.'],
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Todo must have a name.'],
      maxlength: [
        100,
        'Todo name must be less than or equal to 100 characters.',
      ],
      minlength: [
        5,
        'Todo name must be greater than or equal to 5 characters.',
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
