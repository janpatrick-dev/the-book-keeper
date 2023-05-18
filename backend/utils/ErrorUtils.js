const ErrorUtils = {
  handleError: (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
  },
  handleDefaultError: (res, statusCode) => {
    const defaultErrors = {
      401: 'Unauthorized access',
      403: 'Bad request',
      500: 'Internal server error',
    };
    const errorMsg = defaultErrors[statusCode] || 'Unknown error';
    res.status(statusCode).json({ error: errorMsg });
  }
}

module.exports = ErrorUtils;