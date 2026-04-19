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

async function createUser(request, response, next) {
	try {
		const {email, password, full_name: fullName, confirm_password: confirmPassword, credit} = request.body;
		const role = 'user';
		// Email is required and cannot be empty
		if (!email) {
			throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
		}

		// Full name is required and cannot be empty
		if (!fullName) {
			throw errorResponder(errorTypes.VALIDATION_ERROR, 'Full name is required');
		}

		// Email must be unique
		if (await usersService.emailExists(email)) {
			throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, 'Email already exists');
		}

		// The password is at least 8 characters long
		if (password.length < 8) {
			throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password must be at least 8 characters long');
		}

		// The password and confirm password must match
		if (password !== confirmPassword) {
			throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password and confirm password do not match');
		}

		// Create the user
		const success = await usersService.createUser(email, password, fullName, credit);

		if (!success) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to create user');
		}

		return response.status(201).json({message: 'User created successfully'});
	} catch (error) {
		return next(error);
	}
}

async function updateUser(request, response, next) {
	try {
		const {email, full_name: fullName} = request.body;

		// User must exist
		const user = await usersService.getUser(request.params.id);
		if (!user) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
		}

		// Email is required and cannot be empty
		if (!email) {
			throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
		}

		// Full name is required and cannot be empty
		if (!fullName) {
			throw errorResponder(errorTypes.VALIDATION_ERROR, 'Full name is required');
		}

		// Email must be unique, if it is changed
		if (email !== user.email && (await usersService.emailExists(email))) {
			throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, 'Email already exists');
		}

		const success = await usersService.updateUser(request.params.id, email, fullName);

		if (!success) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to update user');
		}

		return response.status(200).json({message: 'User updated successfully'});
	} catch (error) {
		return next(error);
	}
}

async function deleteUser(request, response, next) {
	try {
		const success = await usersService.deleteUser(request.params.id);

		if (!success) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to delete user');
		}

		return response.status(200).json({message: 'User deleted successfully'});
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	getUsers,
	getUser,
	addCredits,
	createUser,
	updateUser,
	deleteUser,
};
