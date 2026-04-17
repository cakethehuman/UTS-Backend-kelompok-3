// admin service akan mengambil repository dari user
const adminRepository = require('./admin-repository');

async function getTickets() {
	return adminRepository.getTickets();
}

async function createTeams(name, abbreviation, vanue, state, city) {
	return adminRepository.createTeams(name, abbreviation, vanue, state, city);
}

async function createSeats(seatsInfo) {
	return adminRepository.createSeats(seatsInfo);
}

async function createGame(homeTeam, awayTeam, location, date, status) {
	return adminRepository.createGame(homeTeam, awayTeam, location, date, status);
}

async function createTickets(match, seatId, price, date, status) {
	return adminRepository.createTickets(match, seatId, price, date, status);
}

module.exports = {
	createGame,
	createTickets,
	createSeats,
	createTeams,
	getTickets,
};
