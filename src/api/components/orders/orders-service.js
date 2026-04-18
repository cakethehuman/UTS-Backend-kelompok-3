const ordersRepository = require('./orders-repository');

async function createTicket(tiket) {
	return ordersRepository.createTicket(tiket)
}

async function buyTicket(userId, seatId, gameId) {
	return ordersRepository.buyTicket(userId, seatId, gameId);
}

async function getOrdersById(id) {
	return ordersRepository.getOrdersById(id);
}
async function getUserCreds(id) {
	return ordersRepository.getUserCreds(id);
}

async function getseatPrice(id) {
	return ordersRepository.getseatPrice(id);
}


async function payment(orderId) {
	return ordersRepository.payment(orderId);
}


module.exports = {
	buyTicket,
	getOrdersById,
	payment,
	createTicket,
	getUserCreds,
	getseatPrice
};
