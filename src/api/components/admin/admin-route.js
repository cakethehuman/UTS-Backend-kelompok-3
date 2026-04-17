const express = require('express');

const adminController = require('./admin-controller');
const verifyLogin = require('../../../utils/AuthenticateToken');

const verifyAdmin = require('../../../middleware/admin')

const route = express.Router();

module.exports = (app) => {
	app.use('/admin', route);

	// see all the tickets that have been made
	route.get('/tickets', verifyLogin, verifyAdmin, adminController.getTickets);

	// make teams
	route.post('/teams', verifyLogin, verifyAdmin, adminController.createTeams);

	// update teams

	// GAMES
	// Make a game
	route.post('/games', verifyLogin, verifyAdmin, adminController.createGames);

	// update teams

	// update seats

	// update ticket
	route.post('/tickets', verifyLogin, verifyAdmin, adminController.createTickets);
};
