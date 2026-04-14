
const userRepository = require('../users/users-repository');
const { passwordMatched } = require('../../../utils/password');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { generateAccessToken } = require('../../../utils/jwt');



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
  
}