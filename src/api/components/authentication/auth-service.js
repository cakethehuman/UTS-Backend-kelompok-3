
const userRepository = require('../users/users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { generateAccessToken } = require('../../../utils/jwt');
const { hash } = require('bcrypt');



async function login(email, password) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw errorResponder(
      errorTypes.INVALID_CREDENTIALS,
      'Didn\'t found the user with specified email!'
    );
  }
  
  const match = await passwordMatched(password, user.password);

  if (!match) {
    throw errorResponder(
      errorTypes.INVALID_PASSWORD,
      'Incorrect password!'
    );
  }
  
  const payload = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role
  };

  const token = generateAccessToken(payload);

  return {
    accessToken: token
  };

}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}


async function register(email, password, fullName){
  if (await emailExists(email) ){
    throw errorResponder(
      errorTypes.EMAIL_ALREADY_TAKEN,
      'Email already exists'
    )
  }
  const hashedPassword = await hashPassword(password);
  return usersRepository.createUser(email, hashedPassword, fullName);
}

async function getMe(){

}

module.exports = {
  login,
  register,
}