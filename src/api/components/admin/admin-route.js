const express = require('express');

const adminController = require('./admin-controller');
const verifyLogin = require('../../../utils/AuthenticateToken');

const verifyAdmin = require('../../../middleware/admin');

const route = express.Router();

module.exports = (app) => {
	app.use('/admin', route);

	// see all the tickets that have been made
	route.get('/tickets', verifyLogin, verifyAdmin, adminController.getTickets);

	// make teams
	route.post('/teams', verifyLogin, verifyAdmin, adminController.createTeams);

	// games route

	// Make a game
	route.post('/games', verifyLogin, verifyAdmin, adminController.createGames);

	// update teams

	// update seats

	// tickets routes

	// update ticket
	route.post('/tickets', verifyLogin, verifyAdmin, adminController.createTickets);

	// Delete a Ticket by id
	route.delete('/tickets/:id', verifyLogin, verifyAdmin, adminController.deleteTicket);

	// Checking order list

	route.get('/orders', verifyLogin, verifyAdmin, adminController.getOrders);

	// changing order data, can be used to confirming cancellation for user order
	// refund if seat is booked, if not don't refund
	route.patch("/orders/cancellationApproval/:orderId", verifyLogin, verifyAdmin, adminController.cancellationApproval);
};
