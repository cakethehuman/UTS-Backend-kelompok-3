const express = require('express');

const tickets = require('./components/tickets/tickets-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  tickets(app);
  users(app);

  return app;
};
