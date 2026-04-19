// admin service akan mengambil repository dari user
const { errorResponder, errorTypes } = require('../../../core/errors');
const adminRepository = require('./admin-repository');


// get functions
async function getTickets() {
	return adminRepository.getTickets();
}

async function getTeamsById(id) {
	return adminRepository.getTeamsById(id);
}
async function getUserById(id) {
	return adminRepository.getUsersById(id);
}
async function getSeatsById(id) {
	return adminRepository.getSeatsById(id);
}
async function getGamesById(id) {
	return adminRepository.getGamesById(id);
}
async function getOrderById(id) {
	return adminRepository.getOrderById(id);
}

async function createTeams(name, abbreviation, venue, state, city) {
	return adminRepository.createTeams(name, abbreviation, venue, state, city);
}

async function createSeats(seatsInfo) {
	return adminRepository.createSeats(seatsInfo);
}

async function createGame(homeTeamInfo, awayTeamInfo, date) {
	return adminRepository.createGame(homeTeamInfo, awayTeamInfo, date);
}

async function createTickets(userInfo, gameInfo, seatInfo, orderInfo) {
	return adminRepository.createTickets(userInfo, gameInfo, seatInfo, orderInfo);
}

async function deleteTicket(id) {
	return adminRepository.deleteTicket(id);
}


async function getOrders(filters) {
	const allowedFilters = ['status', "orderId"]; // untuk sekarang status dulu
	const query = {}; // ini yang akan di pass ke adminRepo
	// Object.keys mereturn key yang ada json object
	Object.keys(filters).forEach((key) => {
		if (allowedFilters.includes(key) && filters[key]){// filters[key] mengecek truthy / falsy nya
			query[key] = filters[key];
		} 
	});
	return adminRepository.getOrders(query);
}

async function cancellationApproval(orderId, action, reason) {
	const order = await adminRepository.getOrderById(orderId);
	const seat = await adminRepository.getSeatsById(order.seatId);

	if (!order) {
		throw errorResponder(
			errorTypes.VALIDATION,
			"Order not found!"
		);
	}

	if (!seat) {
		throw errorResponder(
			errorTypes.VALIDATION,
			"Seat not found!"
		)
	}

	if (order.status !== "requesting cancel") {
		throw errorResponder(
			errorTypes.VALIDATION,
			"Invalid request"
		);
	}

	if (action === "approve") {
		if (seat.isBooked){
			await refund(orderId);
			return adminRepository.getOrderById(orderId);
		}
		else {
			await adminRepository.updateOrderStatus(orderId, "cancelled");
			return adminRepository.getOrderById(orderId);
		}
	}
	else {
		await adminRepository.updateOrderStatus(orderId, "paid");
		return adminRepository.getOrderById(orderId);
	}
}

async function refund(orderId) {
	const ticket = await adminRepository.getTicketByOrderId(orderId);
	if (!ticket) {
		throw errorResponder(
			errorTypes.VALIDATION,
			'Ticket not found'
		);
	}
	const userId = ticket.userInfo.userId;
	const seatId = ticket.seatInfo.seatId;
	const [seat, user] = await Promise.all([
		adminRepository.getSeatsById(seatId),
		adminRepository.getUsersById(userId)
	]);

	if (!user || !seat) {
		throw errorResponder(
			errorTypes.VALIDATION,
			"Cannot found user or seat"
		);
	}

	

	await Promise.all([
		adminRepository.addUserCredit(userId, seat.price),
		adminRepository.cancelOrder(orderId), 
		adminRepository.updateSeatStatus(seatId, false),
		adminRepository.deleteTicket(ticket._id)
	]);
	return "Success";
}

async function getTicketByOrderId(orderId) {
	return adminRepository.getTicketByOrderId(orderId);
}

async function deleteTicket(id) {
	return adminRepository.deleteTicket(id);
}

module.exports = {
	getTeamsById,
	getUserById,
	getSeatsById,
	getGamesById,
	getOrderById,
	createTickets,
	deleteTicket,
	createGame,
	createTickets,
	createSeats,
	createTeams,
	getTickets,
	getOrders,
	cancellationApproval,
	getTicketByOrderId,
	deleteTicket,
	
};
