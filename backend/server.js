require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then((result) => {
    // listen to port after connecting to db
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log('connected to db and listening on port', port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});