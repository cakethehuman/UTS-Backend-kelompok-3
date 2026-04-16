const express = require('express');

const adminController = require('./admin-controller');

const route = express.Router();

module.exports = (app) => {
	app.use('/admin', route);

	// make seats
	// route.get();

	// Seats
	// route.get('/games/:id/seats', usersController.getSeats)

	// make teams
	route.post('/teams', adminController.createTeams)

	// GAMES
	// Make a game
	route.post('/games', adminController.createGames);

	// Make a ticket
	route.post('/tickets', adminController.createTickets);
};
