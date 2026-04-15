const adminService = require('./admin-service');
const {generateSeats} = require('../../../utils/seatGenerator');
const {errorResponder, errorTypes} = require('../../../core/errors');

//create seats
async function createSeat(request, response, next) {
	try {
		const {seatsInfo} = request.body;

		const seats = await adminService.createSeat(seatsInfo);

		if (!seats) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed cant make seats');
		}
		return response.status(201).json({message: 'Berasil taro seats'});
	} catch (error) {
		next(error);
	}
}

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

		const seats = await generateSeats(success._id);
		adminService.createSeats(seats);
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
	createSeat,
};
