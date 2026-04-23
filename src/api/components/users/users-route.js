const express = require('express');

const usersController = require('./users-controller');
const authenticateToken = require('../../../utils/AuthenticateToken');

const route = express.Router();

module.exports = (app) => {
	app.use('/users', route);

	route.post('/:id/balance', usersController.addCredits);

	// // Get list of users
	// route.get('/', usersController.getUsers);
	// // Get list of users
	// route.get('/', usersController.getUsers);

	// // Create a new user
	// route.post('/', usersController.createUser);

	// Get user detail
	route.post('/me', usersController.getUser);

	// Update user
	route.put('/:id', usersController.updateUser);

	// Delete user
	route.delete('/:id', usersController.deleteUser);

	// Get User Detail by ID (Admin only)
	route.get('/users/:id', verifyLogin, verifyAdmin, adminController.getUserById);
};
