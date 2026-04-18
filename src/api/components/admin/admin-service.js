// admin service akan mengambil repository dari user
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

async function createTeams(name, abbreviation, venue, state, city) {
	return adminRepository.createTeams(name, abbreviation, venue, state, city);
}

async function createSeats(seatsInfo) {
	return adminRepository.createSeats(seatsInfo);
}

async function createGame(homeTeamInfo, awayTeamInfo, date) {
	return adminRepository.createGame(homeTeamInfo, awayTeamInfo, date);
}

async function createTickets(userInfo, gameInfo, seatInfo) {
	return adminRepository.createTickets(userInfo, gameInfo, seatInfo);
}

async function deleteTicket(id) {
	return adminRepository.deleteTicket(id);
}

module.exports = {
	getTeamsById,
	getUserById,
	getSeatsById,
	getGamesById,
	createTickets,
	deleteTicket,
	createGame,
	createTickets,
	createSeats,
	createTeams,
	getTickets,
};
