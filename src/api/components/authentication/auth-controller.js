const authService = require('./auth-service');

const { errorResponder, errorTypes } = require('../../../core/errors');

async function login(request, response, next) {
  // checking incomplete body
  const { email, password } = request.body;

  if ( !email || !password ) {
    throw errorResponder(
      errorTypes.VALIDATION,
      'Please provide an email and a password!'
    );
  }
}