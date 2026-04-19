const {Orders} = require('../../../models');
const {Tickets} = require('../../../models');
const {Seats} = require('../../../models');
const {Users} = require('../../../models');
const {Games} = require('../../../models');
const {Teams} = require('../../../models');

async function orderPlacement(userInfo, seatInfo, gameInfo) {
	return Orders.create({
		userId: userInfo._id,
		gameId: gameInfo._id,
		seatId: seatInfo._id,
		userInfo: {
			email: userInfo.email,
			fullName: userInfo.fullName,
		},
		gameInfo: {
			homeTeam: gameInfo.homeTeam.name,
			awayTeam: gameInfo.awayTeam.name,
		},
		seatInfo: {
			seatNumber: seatInfo.seatNumber,
			price: seatInfo.price,
		},
	});
}

async function getUser(id) {
	return Users.findById(id);
}

async function getGame(id) {
	return Games.findById(id);
}

async function getSeat(id) {
	return Seats.findById(id);
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

async function getOrdersByUserId(userId) {
	return Orders.find({userId: userId});
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
			$set: {status: 'requesting cancel'},
			$ne: {status: 'requesting cancel'},
		}
	);
}

async function getOrderByEveryId(userId, seatId, gameId) {
	return Orders.findOne({
		userId: userId,
		seatId: seatId,
		gameId: gameId,
		status: {$ne: 'cancelled'},
	});
}

module.exports = {
	orderPlacement,
	changeOrderStatus,
	createTicket,
	getOrdersById,
	getOrdersByUserId,
	getGameById,
	getseatPrice,
	getUser,
	getGame,
	getSeat,
	getTeamById,
	cancel,
	getOrderByEveryId,
};
