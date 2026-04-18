const {Seats} = require('../../../models');
const {Games} = require('../../../models');
const {Tickets} = require('../../../models');
const {Teams} = require('../../../models');
const {Users} = require('../../../models');
const {Orders} = require('../../../models');

// get functions
async function getTickets() {
	return Tickets.find({});
}

async function getOrders() {
	return Orders.find({});
}

async function getTeams(id) {
	return Teams.find({});
}

async function getTeamsById(id) {
	return Teams.findById(id);
}

async function getGamesById(id) {
	return Games.findById(id);
}

async function getSeatsById(id) {
	return Seats.findById(id);
}

async function getUsersById(id) {
	return Users.findById(id);
}

// create functions
async function createTeams(name, abbreviation, venue, state, city) {
	return Teams.create({name, abbreviation, venue, state, city});
}

async function createSeats(seatsInfo) {
	return Seats.create(seatsInfo);
}
async function createGame(homeTeamInfo, awayTeamInfo, date) {
	return Games.create({
		homeTeam: {
			teamId: homeTeamInfo._id,
			name: homeTeamInfo.name,
			abbreviation: homeTeamInfo.abbreviation,
		},
		awayTeam: {
			teamId: awayTeamInfo._id,
			name: awayTeamInfo.name,
			abbreviation: awayTeamInfo.abbreviation,
		},
		location: {
			venue: homeTeamInfo.venue,
			city: homeTeamInfo.city,
			state: homeTeamInfo.state,
		},
		date,
	});
}

async function createTickets(userInfo, gameInfo, seatInfo) {
	return Tickets.create({
		userInfo: {
			userId: userInfo._id,
			email: userInfo.email,
			fullName: userInfo.fullName,
		},
		gameInfo: {
			gameId: gameInfo._id,
			homeTeam: gameInfo.homeTeam.name,
			awayTeam: gameInfo.awayTeam.name,
		},
		seatInfo: {
			seatId: seatInfo._id,
			seatNumber: seatInfo.seatNumber,
			isBooked: seatInfo.isBooked,
		},
	});
}

async function updateGame(id, info) {
	return Games.updateOne({_id: id}, {$set: info});
}

async function updateTeam(id, info) {
	return Teams.updateOne({_id: id}, {$set: info});
}

// delete functions

async function deleteGame(id) {
	return Games.findByIdAndDelete(id);
}

async function deleteTeam(id) {
	return Teams.findByIdAndDelete(id);
}

async function deleteTicket(id) {
	return Tickets.findByIdAndDelete(id);
}

module.exports = {
	createGame,
	deleteGame,
	createTickets,
	createSeats,
	createTeams,
	getTickets,
	getTeams,
	getTeamsById,
	updateTeam,
	deleteTeam,
	getGamesById,
	getSeatsById,
	getUsersById,
	deleteTicket,
	updateGame,
	getOrders,
};
