const express = require('express');

const authController = require('./auth-controller');

const authenticateToken = require('../../../utils/AuthenticateToken');

const route = express.Router();

module.exports = (app) => {
	app.use('/auth', route);

	// register a new user
	route.post('/register', authController.register);

	// login
	route.post('/login', authController.login);
	// route.post('/logout', authController.logout);

	// endpoint to retrieve user's data
	route.get('/me', authenticateToken, authController.getMe);

	// change password
	route.patch('/:userId/password', authController.changePassword);

	// change user's email
	route.patch('/:userId/email', authController.changeEmail);

	// change username
	route.patch('/:userId/name', authController.changeFullName);
};
