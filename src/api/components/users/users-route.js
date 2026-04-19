const express = require('express');

const usersController = require('./users-controller');
const authenticateToken = require('../../../utils/AuthenticateToken');

const route = express.Router();

module.exports = (app) => {
	app.use('/users', route);

	route.post('/:id/balance', usersController.addCredits);
};
