const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const validateEmail = require('../utils/validateEmail');

const UserSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', function (next) {
  // If the password has not been modified(or new), keep it the same.
  if (!this.isModified('password')) return next();

  const SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR) || 10;
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  this.password = bcrypt.hashSync(this.password, salt);
  return next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

UserSchema.methods.isMatch = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
