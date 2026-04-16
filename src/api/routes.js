const express = require('express');

const admin = require('./components/admin/admin-route');
const games = require('./components/games/games-route');
const tickets = require('./components/tickets/tickets-route');
const users = require('./components/users/users-route');
const auth = require('./components/authentication/auth-route');
module.exports = () => {
	const app = express.Router();
	admin(app);
	tickets(app);
	users(app);
	games(app);
	auth(app);
	return app;
};
