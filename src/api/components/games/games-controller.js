const gamesService = require('./games-service');
const {errorResponder, errorTypes} = require('../../../core/errors');

async function getGames(request, response, next) {
	try {
		const users = await gamesService.getGames();

		return response.status(200).json(users);
	} catch (error) {
		return next(error);
	}
}

async function getGame(request, response, next) {
	try {
		const user = await gamesService.getGames(request.params.id);

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

async function createGame(request, response, next) {
	try {
		const {homeTeam, awayTeam, date, status} = request.body;

		if (!homeTeam) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a home team');
		}

		if (!awayTeam) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a away team');
		}

		if (!date) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add date');
		}

		if (!status) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need game status');
		}

		const success = await gamesService.createGame(homeTeam, awayTeam, date, status);

		if (!success) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to create a game');
		}

		return response.status(201).json({message: 'Games created successfully'});
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	getGame,
	getGames,
	getSeats,
	createGame,
};
