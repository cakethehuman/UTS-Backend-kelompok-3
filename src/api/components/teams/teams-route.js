const express = require('express');
const verifyLogin = require('../../../utils/AuthenticateToken');
const teamsController = require('./teams-controller');

const route = express.Router();

module.exports = (app) => {
	app.use('/teams', route);

	// Get teams lists
	route.get('/', verifyLogin, teamsController.getTeams);
	route.get('/:id', verifyLogin, teamsController.getTeamsById);
};
