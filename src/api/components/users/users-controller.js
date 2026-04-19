const usersService = require('./users-service');
const {errorResponder, errorTypes} = require('../../../core/errors');
const {emailMatched} = require('../../../utils/email');
const {passwordMatched} = require('../../../utils/password');

async function getUsers(request, response, next) {
	try {
		const users = await usersService.getUsers();

		return response.status(200).json(users);
	} catch (error) {
		return next(error);
	}
}

async function getUser(request, response, next) {
	try {
		const {email: email, password: password} = request.body;
		const user = await usersService.getUserByEmail(email);

		const emailMatch = await emailMatched(email, user.email);
		const passwordMatch = await passwordMatched(password, user.password);

		if (!user || !emailMatch || !passwordMatch) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Something went wrong!');
		}

		return response.status(200).json(user);
	} catch (error) {
		return next(error);
	}
}

async function addCredits(request, response, next) {
	try {
		const {amount} = request.body;
		const {id} = request.params;

		const newCredit = await usersService.addCredits(id, amount);

		if (newCredit === null) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found or update failed');
		}

		return response.status(200).json({
			message: 'credit added successfully',
			credit: newCredit,
		});
	} catch (error) {
		return next(error);
	}
}


module.exports = {
	addCredits,
};
