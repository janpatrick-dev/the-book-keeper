const User = require('../models/User');
const bcrypt = require('bcrypt');
const ErrorUtils = require('../utils/ErrorUtils');

const AuthController = () => {

  const getLogin = (req, res) => {
    res.send('Login Page');
  }

  const postLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        ErrorUtils.handleError(res, 400, 'Incorrect email and/or password'); 
      } else {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          ErrorUtils.handleError(res, 400, 'Incorrect email and/or password'); 
        } else {
          res.status(200).json({
            _id: user._id, 
            name: user.name, 
            email: user.email 
         });
        }
      }
    } catch (err) {
      ErrorUtils.handleError(res, 500, 'Internal server error');
    }
  }

  const getSignup = (req, res) => {
    res.send('Signup Page');
  }

  const postSignup = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getLogin,
    postLogin,
    getSignup,
    postSignup
  }
}

module.exports = AuthController;