const mongoose = require('mongoose');

const blacklistedTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.BLACKLISTED_TOKEN_EXPIRY_DB
  }
});

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

module.exports = BlacklistedToken;