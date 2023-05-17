const User = require('../models/User');

const AuthController = () => {

  const getLogin = (req, res) => {
    
  }

  const postLogin = (req, res) => {
    
  }

  const getSignup = (req, res) => {
    
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
    postSignup
  }
}

module.exports = AuthController;