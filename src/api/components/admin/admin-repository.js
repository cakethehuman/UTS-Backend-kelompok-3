const {Seats} = require('../../../models');
const {Games} = require('../../../models');
const {Tickets} = require('../../../models');

async function createSeats(seatsInfo) {
	return Seats.create(seatsInfo);
}
async function createGame(homeTeam, awayTeam, date, status) {
	return Games.create({homeTeam, awayTeam, date, status});
}

async function createTickets(match, seatId, price, date, status) {
	return Tickets.create({match, seatId, price, date, status});
}

module.exports = {
	createGame,
	createTickets,
	createSeats,
};
