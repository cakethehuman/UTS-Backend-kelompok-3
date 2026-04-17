const express = require('express');
const verifyLogin = require('../../../utils/AuthenticateToken');
const ordersController = require('./orders-controller');
const authenticateToken = require('../../../utils/AuthenticateToken');

const route = express.Router();

module.exports = (app) => {
  app.use('/orders', route);

  // buy ticket
  route.post('/', verifyLogin, ordersController.buyTicket);

  // ticket payment
  route.post('/payment', verifyLogin, ordersController.payment);
};
