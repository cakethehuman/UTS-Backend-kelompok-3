const express = require('express');
const verifyLogin = require('../../../utils/AuthenticateToken');
const ticketsController = require('./tickets-controller');
const authenticateToken = require('../../../utils/AuthenticateToken');

const route = express.Router();

module.exports = (app) => {
  app.use('/tickets', route);

  // Get tickets lists
  route.get('/', verifyLogin, ticketsController.getTickets);
  
  // Get ticket in hand
  route.get('/me', authenticateToken, ticketsController.getMyTicket);

  // beli tiket
  route.post('/', verifyLogin, ticketsController.buyTicket);

  // Get a Ticket by id
  route.get('/:id', verifyLogin, ticketsController.getTicketById);

  // Ticket by id
  route.put('/:id', ticketsController.updateTicket);

  // Delete a Ticket by id
  route.delete('/:id', ticketsController.deleteTicket);

  // patch ticket by id
  route.patch('/:id/cancel', ticketsController.cancelTicket);
};
