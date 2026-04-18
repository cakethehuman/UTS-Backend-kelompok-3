const {Seats} = require('../../../models');
const {Games} = require('../../../models');
const {Tickets} = require('../../../models');
const {Teams} = require('../../../models');
const {Users} = require('../../../models');

// get functions
async function getTickets() {
	return Tickets.find({});
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

async function createTeams(name, abbreviation, venue, state, city) {
	return Teams.create({name, abbreviation, venue, state, city});
}

async function deleteTicket(id) {
	return Tickets.findByIdAndDelete(id);
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

module.exports = {
	createGame,
	createTickets,
	createSeats,
	createTeams,
	getTickets,
	getTeamsById,
	getGamesById,
	getSeatsById,
	getUsersById,
	deleteTicket,
};
