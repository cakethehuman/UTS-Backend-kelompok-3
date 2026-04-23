// admin service akan mengambil repository dari user
const {errorResponder, errorTypes} = require('../../../core/errors');
const adminRepository = require('./admin-repository');

// get functions
async function getTickets() {
	return adminRepository.getTickets();
}

async function getOrders() {
	return adminRepository.getOrders();
}

async function getTeams(id) {
	return adminRepository.getTeams(id);
}

async function getTeamsById(id) {
	return adminRepository.getTeamsById(id);
}

async function getUsers() {
	return adminRepository.getUsers();
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

// create functions
async function createTeams(name, abbreviation, venue, state, city) {
	return adminRepository.createTeams(name, abbreviation, venue, state, city);
}

async function createSeat(gameId, seatNumber, price) {
	return adminRepository.createSeat(gameId, seatNumber, price);
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
	const allowedFilters = ['status', 'orderId']; // untuk sekarang status dulu
	const query = {}; // ini yang akan di pass ke adminRepo
	// Object.keys mereturn key yang ada json object
	Object.keys(filters).forEach((key) => {
		if (allowedFilters.includes(key) && filters[key] ) {
			// filters[key] mengecek truthy / falsy nya
			query[key] = filters[key];
		}
	});
	return adminRepository.getOrders(query);
}

async function cancellationApproval(orderId, action, reason) {
	const order = await adminRepository.getOrderById(orderId);
	const seat = await adminRepository.getSeatsById(order.seatId);

	if (!order) {
		throw errorResponder(errorTypes.VALIDATION, 'Order not found!');
	}

	if (!seat) {
		throw errorResponder(errorTypes.VALIDATION, 'Seat not found!');
	}

	if (order.status !== 'requesting cancel') {
		throw errorResponder(errorTypes.VALIDATION, 'Invalid request');
	}

	if (action === 'approve') {
		if (seat.isBooked) {
			await refund(orderId);
			return adminRepository.getOrderById(orderId);
		} else {
			await adminRepository.updateOrderStatus(orderId, 'cancelled');
			return adminRepository.getOrderById(orderId);
		}
	} else {
		await adminRepository.updateOrderStatus(orderId, 'paid');
		return adminRepository.getOrderById(orderId);
	}
}

async function refund(orderId) {
	const ticket = await adminRepository.getTicketByOrderId(orderId);
	if (!ticket) {
		throw errorResponder(errorTypes.VALIDATION, 'Ticket not found');
	}
	const userId = ticket.userInfo.userId;
	const seatId = ticket.seatInfo.seatId;
	const [seat, user] = await Promise.all([adminRepository.getSeatsById(seatId), adminRepository.getUsersById(userId)]);

	if (!user || !seat) {
		throw errorResponder(errorTypes.VALIDATION, 'Cannot found user or seat');
	}

	await Promise.all([adminRepository.addUserCredit(userId, seat.price), adminRepository.cancelOrder(orderId), adminRepository.updateSeatStatus(seatId, false), adminRepository.deleteTicket(ticket._id)]);
	return 'Success';
}

async function getTicketByOrderId(orderId) {
	return adminRepository.getTicketByOrderId(orderId);
}

// update functions

async function updateGame(id, info) {
	return adminRepository.updateGame(id, info);
}

async function updateTeam(id, info) {
	return adminRepository.updateTeam(id, info);
}

// delete functions

async function deleteGame(id) {
	return adminRepository.deleteGame(id);
}

async function deleteTeam(id) {
	return adminRepository.deleteTeam(id);
}

async function deleteTicket(id) {
	return adminRepository.deleteTicket(id);
}

module.exports = {
	// Games
	getGamesById,
	createGame,
	updateGame,
	deleteGame,

	// Teams
	getTeams,
	getTeamsById,
	createTeams,
	updateTeam,
	deleteTeam,

	// Tickets
	getTickets,
	getTicketByOrderId,
	createTickets,
	deleteTicket,

	// Users
	getUsers,
	getUserById,

	// seats
	getSeatsById,
	createSeats,
	createSeat,

	// Orders
	getOrders,
	getOrderById,
	cancellationApproval,
};
