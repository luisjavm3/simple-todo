const express = require('express');
require('express-async-errors');
const dotenv = require('dotenv');
const { json } = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler.js');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes.js');
const todoRoutes = require('./routes/todoRoutes.js');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, (err) => {
  if (!err) return console.log('Database connected.');

  console.log('Database connection failed.');
  process.exit();
});

const app = express();

app.use(json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
