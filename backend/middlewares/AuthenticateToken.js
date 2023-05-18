const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');
const ErrorUtils = require('../utils/ErrorUtils');

const AuthenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const isBlacklisted = await BlacklistedToken.findOne({ token });

    if (isBlacklisted) {
      return ErrorUtils.handleError(res, 401, 'Unauthorized Access');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return ErrorUtils.handleDefaultError(res, 500);
  }

}

module.exports = AuthenticateToken;