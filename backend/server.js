require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const AuthRoute = require('./routes/AuthRoute');
const BookRoute = require('./routes/BookRoute');

const app = express();

app.use(cors({
  origin: 'https://the-book-keeper.netlify.app',
  credentials: true
}));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

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
    console.error('Internal server error:', err.message);
  });