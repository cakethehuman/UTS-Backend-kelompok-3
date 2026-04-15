const gamesRepository = require('./games-repository');

async function getGames() {
	return gamesRepository.getGames();
}

async function getGame(id) {
	return gamesRepository.getGame(id);
}

async function getSeats(id) {
	return gamesRepository.getSeats(id);
}

async function createGame(homeTeam, awayTeam, date, status) {
	return gamesRepository.createGame(homeTeam, awayTeam, date, status);
}

module.exports = {
	getGame,
	getGames,
	getSeats,
	createGame,
};
