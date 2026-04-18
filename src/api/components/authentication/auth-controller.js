const authService = require('./auth-service');
const usersService = require('../users/users-service');
const {hashPassword, passwordMatched} = require('../../../utils/password');

const {errorResponder, errorTypes} = require('../../../core/errors');
const jwt = require('jsonwebtoken');
const {getUser} = require('../orders/orders-repository');
const {emailMatched} = require('../../../utils/email');
const {nameMatched} = require('../../../utils/name');

async function login(request, response, next) {
	// checking incomplete body
	try {
		const {email, password} = request.body;
		if (!email || !password) {
			throw errorResponder(errorTypes.VALIDATION, 'Please provide an email and a password!');
		}
		const token = await authService.login(email, password);
		return response.status(200).json({accessToken: token});
	} catch (err) {
		next(err);
	}
}

async function register(request, response, next) {
	try {
		const {email, password, confirmPassword, fullName, credit} = request.body;
		const user = await authService.emailExists(email);
		if (user) {
			throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, 'User with this email already exist!');
		}
		if (!email || !password || !fullName || !confirmPassword) {
			throw errorResponder(errorTypes.VALIDATION, 'Please provide an email, password, confirmPassword, and fullName');
		}
		if (password !== confirmPassword) {
			throw errorResponder(errorTypes.VALIDATION, 'Please make sure that password and confirmPassword field the same');
		}
		if (password.length < 8) {
			throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password must be at least 8 characters long');
		}
		if (credit < 0) {
			throw errorResponder(errorTypes.VALIDATION_ERROR, 'Credit must be at least 0');
		}
		const success = await authService.register(email, password, fullName, credit);
		if (!success) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to register the user');
		}
		return response.status(201).json({message: 'User registered successfully!'});
	} catch (err) {
		next(err);
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
	if (!request.user) {
		return response.status(401).json({
			message: 'Token required',
		});
	}
	return response.status(200).json(request.user);
}

async function changePassword(request, response, next) {
	// TODO: Implement this function
	const {userId} = request.params;
	const {oldPassword: oldPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword} = request.body;
	// Make sure that:
	// - the user exists by checking the user ID
	// - the old password is correct
	// - the new password is at least 8 characters long
	// - the new password is different from the old password
	// - the new password and confirm new password match
	//
	const user = await usersService.getUser(userId);
	const matchOldPw = await passwordMatched(oldPassword, user.password);
	const matchOldWithNewPw = await passwordMatched(newPassword, user.password);
	try {
		if (!user || !matchOldPw || matchOldWithNewPw) {
			throw errorResponder(errorTypes.VALIDATION_ERROR, 'Something went wrong!');
		}

		if (newPassword.length < 8) {
			throw errorResponder(errorTypes.PASSWORD_ALTERING_VALIDATION_ERROR, 'New password must be at least 8 characters!');
		}

		if (newPassword !== confirmNewPassword) {
			throw errorResponder(errorTypes.PASSWORD_ALTERING_VALIDATION_ERROR, 'New password confirmation must be same as the new password');
		}

		const hashedPassword = await hashPassword(newPassword);
		const success = await authService.changePassword(userId, hashedPassword);

		if (!success) {
			return next(errorResponder(errorTypes.NOT_IMPLEMENTED, ''));
		}
	} catch (error) {
		return next(error);
	}
	return response.status(200).json({message: 'Password successfully changed!'});

	// Note that the password is hashed in the database, so you need to
	// compare the hashed password with the old password. Use the passwordMatched
	// function from src/utils/password.js to compare the old password with the
	// hashed password.
	//
	// If any of the conditions above is not met, return an error response
	// with the appropriate status code and message.
	//
	// If all conditions are met, update the user's password and return
	// a success response.
}

async function changeEmail(request, response, next) {
	const {userId} = request.params;
	const {newEmail, password: password} = request.body;

	const user = await usersService.getUser(userId);

	//const userEmail = await authService.emailExists(newEmail);
	//const matchEmail = await emailMatched(oldEmail, user.email);
	const matchPw = await passwordMatched(password, user.password);
	//|| userEmail || !matchEmail
	try {
		if (!user || !matchPw) {
			throw errorResponder(errorTypes.ALERT, 'Something is wrong!');
		}
		const success = await authService.changeEmail(userId, newEmail);
	} catch (error) {
		return next(error);
	}
	return response.status(200).json({message: 'Email successfully changed'});
}

async function changeFullName(request, response, next) {
	const {userId} = request.params;
	const {newName, password: password} = request.body;

	const user = await usersService.getUser(userId);

	//const userEmail = await authService.emailExists(newEmail);
	//const matchEmail = await emailMatched(oldEmail, user.email);
	const matchPw = await passwordMatched(password, user.password);
	//|| userEmail || !matchEmail
	try {
		if (!newName) {
			throw errorResponder(errorTypes.NAME_INVALID, 'Mind your name!');
		}
		if (!user || !matchPw) {
			throw errorResponder(errorTypes.ALERT, 'Something is wrong!');
		}
		const success = await authService.changeFullName(userId, newName);
	} catch (error) {
		return next(error);
	}
	return response.status(200).json({message: 'Name successfully changed'});
}

module.exports = {
	login,
	register,
	getMe,
	changePassword,
	changeEmail,
	changeFullName,
};
