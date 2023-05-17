const ErrorUtils = {
  handleError: (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
  }
}

module.exports = ErrorUtils;