const express = require('express');

const usersController = require('./admin-controller');

const route = express.Router();

module.exports = (app) => {
	app.use('/admin', route);

	// Make a game
	route.post('/games', usersController.createGames);

	// Make a ticket
	route.post('/tickets', usersController.createTickets);
};
