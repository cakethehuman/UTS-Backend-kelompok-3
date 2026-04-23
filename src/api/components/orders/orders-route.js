const express = require('express');
const verifyLogin = require('../../../utils/AuthenticateToken');

const verifyOwnership = require('../../../middleware/orderOwnership');

const ordersController = require('./orders-controller');

const route = express.Router();

module.exports = (app) => {
	app.use('/orders', route);

	// placing order
	route.post('/', verifyLogin, ordersController.orderPlacement);

	// ticket payment
	route.post('/payment', verifyLogin, verifyOwnership, ordersController.payment);

	// canceling the order and refund (refund can be done after admin confirming the cancel)
	route.patch('/cancel', verifyLogin, verifyOwnership, ordersController.cancel);
};
