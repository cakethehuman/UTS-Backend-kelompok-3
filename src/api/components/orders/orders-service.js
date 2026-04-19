const ordersRepository = require('./orders-repository');
const ticketService = require("../tickets/tickets-service");
async function createTicket(tiket) {
	return ordersRepository.createTicket(tiket)
}

async function orderPlacement(userId, seatId, gameId) {
	return ordersRepository.orderPlacement(userId, seatId, gameId);
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

	console.log("Seat price: " + seat.price);
	const game = await ordersRepository.getGameById(order.gameId);
	console.log(game.homeTeam);
	console.log(game.awayTeam);
	const awayTeamId = game.awayTeam.teamId;
	const homeTeamId = game.homeTeam.teamId;
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
