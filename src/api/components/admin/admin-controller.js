const adminService = require('./admin-service');
const {generateSeats} = require('../../../utils/seatGenerator');
const {errorResponder, errorTypes} = require('../../../core/errors');

// see all tickets
async function getTickets(request, response, next) {
	try {
		const tikets = await adminService.getTickets();
		return response.status(200).json(tikets);
	} catch (error) {
		next(error);
	}
}

// make teams
async function createTeams(request, response, next) {
	try {
		const {name, abbreviation, venue, state, city} = request.body;

		const teams = await adminService.createTeams(name, abbreviation, venue, state, city);

		return response.status(201).json({message: 'Team has been made'});
	} catch (error) {
		next(error);
	}
}

//create seats
async function createSeat(request, response, next) {
	try {
		const {seatsInfo} = request.body;

		if (!seatsInfo) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'No seat info to make seats');
		}

		const seats = await adminService.createSeat(seatsInfo);

		if (!seats) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed cant make seats');
		}
		return response.status(201).json({message: 'Seat created successfully'});
	} catch (error) {
		next(error);
	}
}

// create games
async function createGames(request, response, next) {
	try {
		const {homeTeam, awayTeam, date, status} = request.body;
		const location = homeTeam;

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

		const success = await adminService.createGame(homeTeam, awayTeam, location, date, status);

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

// make tickets
async function createTickets(request, response, next) {
	try {
		const {match, seatId, price, date, status} = request.body;

		const tickets = await adminService.createTickets(match, seatId, price, date, status);

		return response.status(200).json(tickets);
	} catch (error) {
		return next(error);
	}
}

async function deleteTicket(request, response, next) {
  try {
    const {id} = request.params;

    const ticket = await adminService.deleteTicket(id);

    if (!ticket) {
      return response.status(404).json({message: 'Ticket not found'});
    }

    return response.status(200).json({
      message: 'Ticket has been deleted. Your refund is being processed.',
      data: ticket,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createGames,
  createTickets,
  deleteTicket,
	createGames,
	createTickets,
	createSeat,
	createTeams,
	getTickets,
};
