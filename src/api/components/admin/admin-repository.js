const {Seats} = require('../../../models');
const {Games} = require('../../../models');
const {Tickets} = require('../../../models');
const {Teams} = require('../../../models');

async function getTickets() {
	return Tickets.find({}).populate([
		{path: 'userInfo', select: 'email fullName -_id'},
		{path: 'gameInfo', select: 'homeTeam awayTeam -_id'},
	]);
}

async function getTeamsById(id) {
	return Teams.indById(id);
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
async function createGame(homeTeamInfo, awayTeamInfo, date, status) {
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
			venue: homeTeamInfo.location.venue, 
			city: homeTeamInfo.location.city,
			state: homeTeamInfo.location.state,
		},
		date,
		status,
	});
}

async function createTickets(match, seatId, price, date, status) {
	return Tickets.create({match, seatId, price, date, status});
}

module.exports = {
	createGame,
	createTickets,
	createSeats,
	createTeams,
	getTickets,
	getTeamsById,
};
