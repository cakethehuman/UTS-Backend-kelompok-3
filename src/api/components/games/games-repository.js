const mongoose = require('mongoose');
const {Games} = require('../../../models');
const {Seats} = require('../../../models');

async function getGames() {
	return Games.find({}).populate({path: 'homeTeam', select: 'name abbreviation -_id'}).populate({path: 'awayTeam', select: 'name abbreviation -_id'}).populate({path : "location", select: "city vanue -_id"});
}

async function getGame(id) {
	return Games.findById(id);
}

async function getSeats(id) {
	return Seats.find({gameId: id});
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
	createGame,
};
