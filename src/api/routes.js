const express = require('express');

const games = require('./components/games/games-route');
const tickets = require('./components/tickets/tickets-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  tickets(app);
  users(app);
  games(app);

  return app;
};
