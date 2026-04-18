const {Seats} = require('../../../models');
const {Games} = require('../../../models');
const {Tickets} = require('../../../models');
const {Teams} = require('../../../models');

async function getTickets() {
	return Tickets.find({}).populate([
		{path: 'userInfo', select: 'fullName -_id'},
		{path: 'gameInfo', select: 'homeTeam awayTeam -_id'},
	]);
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
	getTickets,
};
