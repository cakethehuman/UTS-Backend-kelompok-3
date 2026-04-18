// admin service akan mengambil repository dari user
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

async function getUserById(id) {
	return adminRepository.getUsersById(id);
}

async function getSeatsById(id) {
	return adminRepository.getSeatsById(id);
}

async function getGamesById(id) {
	return adminRepository.getGamesById(id);
}

// create functions
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
	getTeams,
	getTeamsById,
	deleteTeam,
	getUserById,
	getSeatsById,
	getGamesById,
	deleteGame,
	createTickets,
	deleteTicket,
	createGame,
	createTickets,
	createSeats,
	createTeams,
	updateTeam,
	getTeams,
	updateGame,
	getTickets,
	getOrders,
};
