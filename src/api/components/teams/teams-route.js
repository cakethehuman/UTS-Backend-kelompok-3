const express = require('express');
const verifyLogin = require('../../../utils/AuthenticateToken');
const teamsController = require('./teams-controller');

const route = express.Router();

module.exports = (app) => {
	app.use('/teams', route);

	// Get tickets lists
	route.post('/', verifyLogin, teams.createTeams);

	// // Get a Ticket by id
	// route.get('/:id', verifyLogin, teams.getTicketById);
};
