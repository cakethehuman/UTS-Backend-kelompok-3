const express = require('express');

const adminController = require('./admin-controller');

const route = express.Router();

module.exports = (app) => {
	app.use('/admin', route);

	// see all the tickets that have been made
	route.get('/tickets', adminController.getTickets);

	// make teams
	route.post('/teams', adminController.createTeams);

	// update teams

	// GAMES
	// Make a game
	route.post('/games', adminController.createGames);

	// update teams

	// update seats

	// update ticket
	route.post('/tickets', adminController.createTickets);
};
