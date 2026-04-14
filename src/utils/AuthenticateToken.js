const { verifyAccessToken } = require('./jwt');
const { errorResponder, errorTypes } = require('../core/errors');

function authenticateToken(request, response, next) {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token> 
  // returns token if authHeader is truthy, truthy in string case is it's not empty, the length is > 0


  if (!token) {
    return next(errorResponder(
      errorTypes.NO_TOKEN),
      'Access token required'
    );
  }
  try {
    const user = verifyAccessToken(token)
    request.user = user;
    next();
  } catch (err) {
    return next(errorResponder(
      errorTypes.INVALID_CREDENTIALS,
      'Invalid or expired token'
    ));
  }
}

module.exports = {
  authenticateToken,
}