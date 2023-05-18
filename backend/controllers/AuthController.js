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

      const tokens = generateTokens(user);
      setTokenCookies(res, tokens);
      res.status(200).json(tokens);
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
      res.status(201).json(user);
    } catch (err) {
      return ErrorUtils.handleDefaultError(res, 500);
    }
  };

  const getLogout = async (req, res) => {
    const accessToken = req.cookies['accessToken'];
    try {
      // blacklist access token on logout
      await BlacklistedToken.create({ token: accessToken });
      req.user = null;
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken', {
        path: '/refresh-token'
      });
      res.status(200).json({ msg: 'Logout successful!'})
    } catch (err) {
      console.log(err);
      return ErrorUtils.handleDefaultError(res, 500);
    }
  }

  const postToken = async (req, res) => {
    try {
      const refreshToken = req.body.refreshToken;
    
      if (!refreshToken) {
        return ErrorUtils.handleError(res, 401, 'No token received');
      }
      
      // check if current refresh token is blacklisted
      const isBlacklisted = await BlacklistedToken.exists({ token: refreshToken });

      if (isBlacklisted) {
        return ErrorUtils.handleError(res, 401, err.message);
      }

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
          return ErrorUtils.handleError(res, 401, err.message);
        }
        // add current refresh token to blacklist
        // before replacing it with a new one
        await addTokenToBlacklist(refreshToken);

        const tokens = generateTokens(user);
        setTokenCookies(res, tokens);
        res.status(200).json(tokens);
      });
    } catch (err) {
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
  
  const generateRefreshToken = (user) => {
    const filteredUserData = {
      _id: user._id, 
      name: user.name, 
      email: user.email 
    }
    return jwt.sign(
      filteredUserData, 
      process.env.REFRESH_TOKEN_SECRET, 
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
  }
  
  const generateTokens = (user) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return { accessToken, refreshToken };
  }
  
  const setTokenCookies = (res, tokens) => {
    const { accessToken, refreshToken } = tokens;
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: process.env.REFRESH_TOKEN_COOKIE_PATH
    });
  }
  
  const addTokenToBlacklist = (token) => {
    return BlacklistedToken.create({ token });
  }

  return {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    postToken,
    getLogout
  }
}

module.exports = AuthController;