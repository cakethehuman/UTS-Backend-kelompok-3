const express = require('express');

const ticketsController = require('./tickets-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/tickets', route);

  // Get tickets lists
  route.get('/', ticketsController.getTickets);

  // Get a Ticket by id
  route.get('/:id', ticketsController.getTicketById);

  // Ticket by id
  route.put('/:id', ticketsController.updateTicket);

  // Delete a Ticket by id
  route.delete('/:id', ticketsController.deleteTicket);
};
