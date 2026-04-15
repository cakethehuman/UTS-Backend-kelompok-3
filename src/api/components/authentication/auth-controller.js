const authService = require('./auth-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const jwt = require('jsonwebtoken');

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
      const {email, password, confirmPassword, fullName, credit} = request.body;
      const user = authService.emailExists(email);
      if (user){
        throw errorResponder(
          errorTypes.EMAIL_ALREADY_TAKEN,
          'User with this email already exist!'
        );
      }
      if (!email || !password || !fullName || !confirmPassword){
        throw errorResponder(
          errorTypes.VALIDATION,
          'Please provide an email, password, confirmPassword, and fullName',
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

      const success = await authService.register(
        email, 
        password, 
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

async function getMe(request, response) {

  //   const authHeader = request.headers.authorization;

  //   if (!authHeader) {
  //     return response.status(401).json({
  //       message: "Token required"
  //     });
  //   }
  //   const token = authHeader.split(" ")[1];
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   const user = await authService.getMe(decoded.id);

  //   return response.status(200).json(user);
  // } catch (err) {
  //   return response.status(403).json({
  //     message: "Invalid token"
  //   });
    if (!request.user){
      return response.status(401).json({
        message: "Token required"
      });
    }
    return response.status(200).json(
      request.user
    );

}



  module.exports = {
    login,
    register,
    getMe
  }