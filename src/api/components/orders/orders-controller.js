/* eslint-disable prettier/prettier */
const {response, request} = require('express');
const ticketService = require('./orders-service');
const {errorResponder, errorTypes} = require('../../../core/errors');

async function buyTicket(request, response, next) {
	try {
		const {userId, seatId, gameId} = request.body;

		if (!userId) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a user id');
		}

		if (!seatId) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a seat id');
		}

		if (!gameId) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a game id');
		}

		const tiket = await ticketService.buyTicket(userId, seatId, gameId);

		if (!tiket) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to make ticket');
		}

		return response.status(201).json({message: 'Order has been placed'});
	} catch (error) {
		return next(error);
	}
}

async function payment(request, response, next) {
	try {
		const {orderId} = request.body;

		const order = await ticketService.payment(orderId);

		const tiketInfo = await ticketService.getOrdersById(orderId);

		const userCreds = await ticketService.getUserCreds(tiketInfo.userId);
		const seatPrice = await ticketService.getseatPrice(tiketInfo.seatId);

		console.log(userCreds.credit);

		const tiket = {
			userInfo: tiketInfo.userId,
			gameInfo: tiketInfo.gameId,
			seatInfo: tiketInfo.seatId,
		};

		const hasil = await ticketService.createTicket(tiket);

		return response.status(201).json({message: 'Ticket payment has been confirmed and given to user'});
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	buyTicket,
	payment,
};
