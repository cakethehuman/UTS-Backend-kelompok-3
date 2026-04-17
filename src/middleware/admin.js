const { errorResponder, errorTypes } = require('../core/errors');


// middleware for authorizing admin

function authorizeAdmin(request, response, next){
  if (request.user && request.user.role === 'admin'){
    next(); // checks if user exist and the role is admin
  } 
  else {
    return next(
      errorTypes.FORBIDDEN,
      'Access denied: Admin only!'
    );
  }
}

module.exports = authorizeAdmin;