const mongoose = require('mongoose');

const validateEmail = require('../utils/validateEmail');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'First name is required.'],
  },
  last_name: {
    type: String,
    required: [true, 'Last name is required. '],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: [true, 'Email already exists.'],
    validate: [validateEmail, 'Invalid email address.'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'Gender is required.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [6, 'Password must has at least 6 characters.'],
    maxlength: [30, 'Password must be less than or equal to 30.'],
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    required: true,
    default: 'USER',
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
