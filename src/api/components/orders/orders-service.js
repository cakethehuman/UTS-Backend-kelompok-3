const ordersRepository = require('./orders-repository');
const ticketService = require("../tickets/tickets-service");
const { errorResponder, errorTypes } = require('../../../core/errors');
async function createTicket(tiket) {
	return ordersRepository.createTicket(tiket)
}

async function orderForTheSameGameAndSeat(userId, seatId, gameId){
	const order = await ordersRepository.getOrderByEveryId(userId, seatId, gameId);
	return !!order;
}

async function orderPlacement(userId, seatId, gameId) {
	const isOrdered = await orderForTheSameGameAndSeat(userId, seatId, gameId)
	if (!isOrdered) {
		return ordersRepository.orderPlacement(userId, seatId, gameId);
	}
	else {
		throw errorResponder(
			errorTypes.VALIDATION,
			"You have already placed an order on this particular seat on this game"
		);
	}
}

async function getOrdersById(id) {
	return ordersRepository.getOrdersById(id);
}
async function getUser(id) {
	return ordersRepository.getUser(id);
}

async function getseatPrice(id) {
	return ordersRepository.getseatPrice(id);
}


async function changeOrderStatus(orderId) {	
	return ordersRepository.changeOrderStatus(orderId);
}

async function cancel(orderId) {
	return ordersRepository.cancel(orderId);

}

async function payment(user, seat, order){

	const game = await ordersRepository.getGameById(order.gameId);
	const awayTeamId = game.awayTeam.teamId;
	const homeTeamId = game.homeTeam.teamId;
	if (order.status === "paid") {
		throw errorResponder(
			errorTypes.VALIDATION,
			"You have paid this order!"
		);
	}
	if (user.credit > seat.price && !seat.isBooked){
		
		
		seat.isBooked = true;
		const tiket = {
			userInfo: {
				userId: user.id,
				email: user.email,
				fullName: user.fullName
			},
			gameInfo: {
				gameId: game._id,
				homeTeam: game.homeTeam.name,
				awayTeam: game.awayTeam.name,
			},
			seatInfo: {
				seatId: seat._id,
				seatNumber: seat.seatNumber,
				isBooked: seat.isBooked
			},
			orderInfo: {
				orderId: order._id
			}
		};
		if (tiket) {
			user.credit -= seat.price;
			await Promise.all([user.save(), seat.save(), 	changeOrderStatus(order._id)]); // save the state to the user and seat db (simultaneously)

			return tiket;
		}
		else {
			seat.isBooked = false;
			await seat.save();
			return NaN;
		}
	}
	
}



module.exports = {
	orderPlacement,
	getOrdersById,
	payment,
	createTicket,
	getUser,
	getseatPrice,
	cancel
};
