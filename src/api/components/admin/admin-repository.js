const {Games} = require('../../../models');
const {Tickets} = require('../../../models');

// for games and seats
async function createGames(homeTeam, awayTeam, date, status) {
	return Games.create({homeTeam, awayTeam, date, status});
}

async function createTickets(match, seatId, price, date, status) {
	return Tickets.create({match, seatId, price, date, status});
}

module.exports = {
	createGames,
	createTickets,
};
