// admin service akan mengambil repository dari user
const adminRepository = require('./admin-repository');

async function createSeats(seatsInfo) {
	return adminRepository.createSeats(seatsInfo);
}

async function createGame(homeTeam, awayTeam, date, status) {
	return adminRepository.createGame(homeTeam, awayTeam, date, status);
}

async function createTickets(match, seatId, price, date, status) {
	return adminRepository.createTickets(match, seatId, price, date, status);
}

module.exports = {
	createGame,
	createTickets,
	createSeats,
};
