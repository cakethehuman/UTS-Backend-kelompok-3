const adminService = require('./admin-service');
const {generateSeats} = require('../../../utils/seatGenerator');
const {errorResponder, errorTypes} = require('../../../core/errors');
const {tr, da} = require('@faker-js/faker');
const {request} = require('express');

// Get all tickets
async function getTickets(request, response, next) {
	try {
		const tikets = await adminService.getTickets();

		if (!tikets) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to make tikets');
		}

		return response.status(200).json(tikets);
	} catch (error) {
		next(error);
	}
}

// get all orders

async function getOrders(request, response, next) {
	try {
		const tikets = await adminService.getOrders();

		if (!tikets) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to make tikets');
		}

		return response.status(200).json(tikets);
	} catch (error) {
		next(error);
	}
}

// make teams
async function createTeams(request, response, next) {
	try {
		const {name, abbreviation, venue, state, city} = request.body;

		if (!name) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a name');
		}

		if (!abbreviation) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a abbreviation');
		}

		if (!venue) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a venue');
		}

		if (!state) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a state');
		}

		if (!city) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a city');
		}

		const teams = await adminService.createTeams(name, abbreviation, venue, state, city);

		if (!teams) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to make a team');
		}

		return response.status(201).json({message: 'Team has been made successfully'});
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
		const {homeTeam, awayTeam, date} = request.body;

		const homeTeamInfo = await adminService.getTeamsById(homeTeam);

		if (!homeTeamInfo) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to fetch home team info');
		}

		const awayTeamInfo = await adminService.getTeamsById(awayTeam);

		if (!awayTeamInfo) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to fetch away team info');
		}

		if (!homeTeam) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a home team');
		}

		if (!awayTeam) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a away team');
		}

		if (!date) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add date');
		}

		const success = await adminService.createGame(homeTeamInfo, awayTeamInfo, date);

		if (!success) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to create a game');
		}

		const seats = await generateSeats(success._id);

		if (!seats) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to generate seats for the game');
		}

		adminService.createSeats(seats);
		return response.status(201).json({message: 'Games created successfully'});
	} catch (error) {
		return next(error);
	}
}

async function createGamesBulk(request, response, next) {
	try {
		const {jumlah} = request.body;
		const today = new Date();
		const teams = await adminService.getTeams();

		for (let i = 1; i <= jumlah; i++) {
			let random = Math.floor(Math.random() * teams.length);
			let random2 = Math.floor(Math.random() * teams.length);
			while (random == random2) {
				random2 = Math.floor(Math.random() * teams.length);
			}

			const addDates = Math.floor(Math.random() * 30);

			let gameDate = new Date();
			gameDate.setDate(today.getDate() + addDates);
			const makeGames = await adminService.createGame(teams[random], teams[random2], gameDate.toISOString().split('T')[0]);
		}

		return response.status(201).json({message: 'made random teams'});
	} catch (error) {
		next(error);
	}
}

// make tickets
async function createTickets(request, response, next) {
	try {
		const {userId, gameId, seatId} = request.body;

		if (!userId) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a usesrId');
		}

		if (!gameId) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a gameId');
		}

		if (!seatId) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a seatId');
		}

		const userInfo = await adminService.getUserById(userId);
		const gameInfo = await adminService.getGamesById(gameId);
		const seatInfo = await adminService.getSeatsById(seatId);

		const tickets = await adminService.createTickets(userInfo, gameInfo, seatInfo);

		if (!tickets) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to make tickets');
		}

		return response.status(200).json(tickets);
	} catch (error) {
		return next(error);
	}
}

// change stuff

// change games
async function updateGame(request, response, next) {
	try {
		const {id} = request.params;
		const info = request.body;
		const update = adminService.updateGame(id, info);

		if (!update) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to update games');
		}
		return response.status(200).json({message: 'Change success'});
	} catch (error) {
		next(error);
	}
}

async function updateTeam(request, response, next) {
	try {
		const {id} = request.params;
		const info = request.body;
		const update = adminService.updateTeam(id, info);

		if (!update) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to update games');
		}
		return response.status(200).json({message: 'Change success'});
	} catch (error) {
		next(error);
	}
}

// delete stuff
async function deleteGame(request, response, next) {
	try {
		const {id} = request.params;

		if (!id) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a id');
		}

		const games = await adminService.deleteGame(id);

		if (!games) {
			return response.status(404).json({message: 'Games not found'});
		}

		return response.status(200).json({message: 'Games has been deleted'});
	} catch (error) {
		return next(error);
	}
}

async function deleteTeam(request, response, next) {
	try {
		const {id} = request.params;

		if (!id) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a id');
		}

		const games = await adminService.deleteTeam(id);

		if (!games) {
			return response.status(404).json({message: 'Games not found'});
		}

		return response.status(200).json({message: 'Games has been deleted'});
	} catch (error) {
		return next(error);
	}
}

async function deleteTicket(request, response, next) {
	try {
		const {id} = request.params;

		if (!id) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a id');
		}

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
	// games
	createGames,
	createGamesBulk,
	updateGame,
	deleteGame,
	// tickets
	getTickets,
	createTickets,
	deleteTicket,
	createTickets,
	//seat
	createSeat,
	// teams
	createTeams,
	updateTeam,
	deleteTeam,
	// orders
	getOrders,
};
