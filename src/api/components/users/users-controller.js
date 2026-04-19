const usersService = require('./users-service');
const {errorResponder, errorTypes} = require('../../../core/errors');

async function addCredits(request, response, next) {
  try {
    const { amount } = request.body;
    const { id } = request.params;

    const newCredit = await usersService.addCredits(id, amount);

    if (newCredit === null) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found or update failed');
    }

    return response.status(200).json({
      message: 'credit added successfully', 
      credit: newCredit 
    });
  } catch (error) {
    return next(error);
  }
}


module.exports = {
	addCredits,
};
