const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');
const ErrorUtils = require('../utils/ErrorUtils');

const AuthenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return ErrorUtils.handleDefaultError(res, 401);
  }

  try {
    const isBlacklisted = await BlacklistedToken.findOne({ token });

    if (isBlacklisted) {
      return ErrorUtils.handleDefaultError(res, 401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return ErrorUtils.handleDefaultError(res, 401);
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return ErrorUtils.handleDefaultError(res, 500);
  }

}

module.exports = AuthenticateToken;