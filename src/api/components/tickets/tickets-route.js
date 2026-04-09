const express = require('express');

const ticketsController = require('./tickets-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/tickets', route);

  // Get list of tickets
  route.get('/', ticketsController.getTickets);

  // Create a new ticket
  route.post('/', ticketsController.createTickets);

  // TODO: Get a Ticket by id
  route.get('/:id', ticketsController.getTicketById);

  // TODO: Update a Ticket by id
  route.put('/:id', ticketsController.updateTicket);

  // TODO: Delete a Ticket by id
  route.delete('/:id', ticketsController.deleteTicket);
};
