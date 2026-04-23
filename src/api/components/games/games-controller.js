const gamesService = require('./games-service');
const {errorResponder, errorTypes} = require('../../../core/errors');
const {createSeat} = require('../admin/admin-repository');

async function getGames(request, response, next) {
	try {
		const games = await gamesService.getGames();

		if (!games) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Games not found');
		}

		return response.status(200).json(games);
	} catch (error) {
		return next(error);
	}
}

async function getGame(request, response, next) {
	try {
		const user = await gamesService.getGame(request.params.id);

		if (!user) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
		}

		return response.status(200).json(user);
	} catch (error) {
		return next(error);
	}
}

async function getSeats(request, response, next) {
	try {
		const seats = await gamesService.getSeats(request.params.id);

		if (!seats) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Seats not found');
		}

		return response.status(200).json(seats);
	} catch (error) {
		return next(error);
	}
}

async function getGameSeat(request, response, next) {
	try {
		const {gameId, id} = request.params;
		const seat = await gamesService.getGameSeat(gameId, id);

		if (!seat) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Seat not found in this game');
		}

		return response.status(200).json(seat);
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	getGame,
	getGames,
	getSeats,
	getGameSeat,
};
