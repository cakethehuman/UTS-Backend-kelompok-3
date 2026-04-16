const {Seats} = require('../../../models');
const {Games} = require('../../../models');
const {Tickets} = require('../../../models');
const {Teams} = require('../../../models');

async function createTeams(name, abbreviation, vanue, state, city) {
	return Teams.create({name, abbreviation, vanue, state, city});
}

async function createSeats(seatsInfo) {
	return Seats.create(seatsInfo);
}
async function createGame(homeTeam, awayTeam, location, date, status) {
	return Games.create({homeTeam, awayTeam, location, date, status});
}

async function createTickets(match, seatId, price, date, status) {
	return Tickets.create({match, seatId, price, date, status});
}

module.exports = {
	createGame,
	createTickets,
	createSeats,
	createTeams,
};
