const User = require('../models/User');
const bcrypt = require('bcrypt');
const ErrorUtils = require('../utils/ErrorUtils');
const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');

const AuthController = () => {

  const getLogin = (req, res) => {
    res.send('Login Page');
  }

  const postLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return ErrorUtils.handleError(res, 400, 'Invalid credentials'); 
      } 
      
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return ErrorUtils.handleError(res, 400, 'Invalid credentials'); 
      }

      const accessToken = generateAccessToken(user);
      const userData = jwt.decode(accessToken);
      res.cookie('accessToken', accessToken);
      res.status(200).json(userData);
    } catch (err) {
      return ErrorUtils.handleDefaultError(res, 500);
    }
  }

  const getSignup = (req, res) => {
    res.send('Signup Page');
  }

  const postSignup = async (req, res) => {
    try {
      const user = await User.create(req.body);
      
      const accessToken = generateAccessToken(user);
      const userData = jwt.decode(accessToken);
      res.cookie('accessToken', accessToken);
      res.status(201).json(userData);
    } catch (err) {
      return ErrorUtils.handleDefaultError(res, 500);
    }
  };

  const getLogout = async (req, res) => {
    const accessToken = req.cookies['accessToken'];
    try {
      // blacklist access token on logout
      await addTokenToBlacklist(accessToken);
      req.user = null;
      res.clearCookie('accessToken');
      res.status(200).json({ msg: 'Logout successful!'})
    } catch (err) {
      console.log(err);
      return ErrorUtils.handleDefaultError(res, 500);
    }
  }

  const generateAccessToken = (user) => {
    const filteredUserData = {
      _id: user._id, 
      name: user.name, 
      email: user.email 
    }
    return jwt.sign(
      filteredUserData, 
      process.env.ACCESS_TOKEN_SECRET, 
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
  }
  
  const addTokenToBlacklist = (token) => {
    return BlacklistedToken.create({ token });
  }

  return {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    getLogout
  }
}

module.exports = AuthController;