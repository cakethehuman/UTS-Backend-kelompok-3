const authService = require('./auth-service');
const { hashPassword } = require('../../../utils/password')
const { errorResponder, errorTypes } = require('../../../core/errors');

async function login(request, response, next) {
  // checking incomplete body
  try {
    const { email, password } = request.body;
    if ( !email || !password ) {
      throw errorResponder(
        errorTypes.VALIDATION,
        'Please provide an email and a password!'
      );
    }
    const token = await authService.login(email, password);
    return response.status(200).json({accessToken: token})
  } catch (err){
      next(err);
  }
}
async function register(request, response, next){
    try {
      const {email, password, confirmPassword, fullName} = request.body;
      if (!email || !password || !fullName || !confirmPassword){
        throw errorResponder(
          errorTypes.VALIDATION,
          'Please provide an email, password, confirmPassword,  and fullName',
        );
      }
      if (password !== confirmPassword){
        throw errorResponder(
          errorTypes.VALIDATION,
          'Please make sure that password and confirmPassword field the same',
        );
      }
      if (password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must be at least 8 characters long'
      );
    }
      const hashedPassword = await hashPassword(password);
      const success = await authService.register(
        email, 
        hashedPassword, 
        fullName
      )
      if (!success){
        throw errorResponder(
          errorTypes.UNPROCESSABLE_ENTITY,
          'Failed to register the user'
        );
      }
      return response.status(201).json({message: 'User registered successfully!'});
    } catch (err){
        next(err)
    }
  }  

  module.exports = {
    login,
    register
  }