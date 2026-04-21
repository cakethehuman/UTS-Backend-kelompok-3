const mongoose = require('mongoose');
const {Games} = require('../../../models');
const {Seats} = require('../../../models');

async function getGames() {
	return Games.find({});
}

async function getGame(id) {
	return Games.findById(id);
}

async function getSeats(id) {
	return Seats.find({gameId: id});
}

async function getGameSeat(gameId, seatId) {
	return Seats.findOne({_id: seatId, gameId: gameId});
}

async function createGame(homeTeam, awayTeam, date, status) {
	return Games.create({homeTeam, awayTeam, date, status});
}

// async function getUserByEmail(email) {
//   return Users.findOne({ email });
// }

module.exports = {
	getGame,
	getGames,
	getSeats,
	getGameSeat,
	createGame,
};
