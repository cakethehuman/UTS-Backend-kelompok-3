const {Orders} = require('../../../models');
const {Tickets} = require('../../../models');
const { Seats } = require('../../../models');
const { Users } = require('../../../models');
const { Games } = require("../../../models")
const { Teams } = require("../../../models")
async function orderPlacement(userId, seatId, gameId) {
	return Orders.create({userId, seatId, gameId});
}

async function getUser(id) {
	return Users.findById(id);
}

async function getseatPrice(id) {
	return Seats.findById(id);
}

async function changeOrderStatus(orderId) {
	return Orders.updateOne({_id: orderId}, {$set: {status: 'paid'}});
}

async function getOrdersById(orderId) {
	return Orders.findById(orderId);
}

async function createTicket(ticket) {
	return Tickets.create(ticket);
}

async function getGameById(id) {
	return Games.findById(id);
}

async function getTeamById(id) {
	return Teams.findById(id).lean();
}

async function cancel(orderId) {
	return Orders.updateOne(
		{
			_id: orderId,
		},
		{
			$set: {status: "requesting cancel"},
			$ne: {status: "requesting cancel"}
		}
	);
}


module.exports = {
	orderPlacement,
	changeOrderStatus,
	createTicket,
	getOrdersById,
	getGameById,
	getseatPrice,
	getUser,
	getTeamById,
	cancel
};
