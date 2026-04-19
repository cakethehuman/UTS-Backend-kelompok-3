const express = require('express');
const verifyLogin = require('../../../utils/AuthenticateToken');
const ticketsController = require('./tickets-controller');
const authenticateToken = require('../../../utils/AuthenticateToken');

const route = express.Router();

module.exports = (app) => {
  app.use('/tickets', route);

  // // Get tickets lists
  // route.get('/', verifyLogin, ticketsController.getTickets);
  
  // Get ticket in hand
  route.get('/me', authenticateToken, ticketsController.getMyTicket);
  
  // patch ticket by id
  route.patch('/:id/cancel', ticketsController.cancelTicket);
};
