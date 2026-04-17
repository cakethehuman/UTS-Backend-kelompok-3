const {Orders} = require('../../../models');
const {Tickets} = require('../../../models');
const { Seats } = require('../../../models');
const { Users } = require('../../../models');

async function buyTicket(userId, seatId, gameId) {
	return Orders.create({userId, seatId, gameId});
}

async function getUserCreds(id) {
	return Users.findById(id);
}

async function getseatPrice(id) {
	return Seats.findById(id);
}

async function payment(orderId) {
	return Orders.updateOne({_id: orderId}, {$set: {status: 'paid'}});
}

async function getOrdersById(orderId) {
	return Orders.findById(orderId);
}

async function createTicket(tiket) {
	return Tickets.create(tiket);
}

module.exports = {
	buyTicket,
	payment,
	createTicket,
	getOrdersById,
	getseatPrice,
	getUserCreds
};
