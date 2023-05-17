require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const AuthRoute = require('./routes/AuthRoute');
const BookRoute = require('./routes/BookRoute');

const app = express();

app.use(express.json());

// routes
app.use(AuthRoute);
app.use(BookRoute);

mongoose.connect(process.env.MONGODB_URL)
  .then((result) => {
    // listen to port after connecting to db
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log('connected to db and listening on port', port);
    });
  })
  .catch((err) => {
    throw Error('Internal server error');
  });