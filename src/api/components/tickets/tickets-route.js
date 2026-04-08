const express = require('express');

const ticketsController = require('./tickets-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/tickets', route);

  // Get list of books
  route.get('/', ticketsController.getTickets);

  // Create a new book
  route.post('/', ticketsController.createTickets);

  // TODO: Get a book by id

  // TODO: Update a book by id

  // TODO: Delete a book by id
};
