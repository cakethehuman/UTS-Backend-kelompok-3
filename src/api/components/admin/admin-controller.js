const adminService = require('./admin-service');
const {errorResponder, errorTypes} = require('../../../core/errors');

async function createGames(request, response, next) {
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

		const success = await adminService.createGame(homeTeam, awayTeam, date, status);

		if (!success) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to create a game');
		}

		return response.status(201).json({message: 'Games created successfully'});
	} catch (error) {
		return next(error);
	}
}

async function createTickets(request, response, next) {
	try {
		const {match, seatId, price, date, status} = request.body;

		const tickets = await adminService.createTickets(match, seatId, price, date, status);

		return response.status(200).json(tickets);
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	createGames,
	createTickets,
};
