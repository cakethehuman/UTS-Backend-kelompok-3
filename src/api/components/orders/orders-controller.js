const orderService = require('./orders-service');
const {errorResponder, errorTypes} = require('../../../core/errors');

async function orderPlacement(request, response, next) {
	try {
		const {seatId, gameId} = request.body;
		const userId = request.user.id;

		if (!userId) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a user id');
		}

		if (!seatId) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a seat id');
		}

		if (!gameId) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed need to add a game id');
		}

		const userInfo = await orderService.getUser(userId);

		if (!userInfo) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to find user');
		}
		console.log(seatId);

		const seatInfo = await orderService.getSeat(seatId);

		if (!seatInfo) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to find seat');
		}

		const gameInfo = await orderService.getGame(gameId);

		if (!gameInfo) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to find game');
		}

		console.log(gameInfo);
		const order = await orderService.orderPlacement(userInfo, seatInfo, gameInfo);

		if (!order) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to make ticket');
		}

		return response.status(201).json({
			message: 'Order has been placed',
			orderId: order._id,
		});
	} catch (error) {
		return next(error);
	}
}

async function payment(request, response, next) {
	try {
		let hasil;
		const tiketInfo = request.order;

		const currentUser = await orderService.getUser(tiketInfo.userId);
		const currentSeat = await orderService.getseatPrice(tiketInfo.seatId);

		try {
			if (!tiketInfo || !currentUser || !currentSeat) {
				throw errorResponder(errorTypes.VALIDATION, 'Something went wrong');
			}

			if (currentUser.credit >= currentSeat.price && !currentSeat.isBooked) {
				const order = await orderService.payment(currentUser, currentSeat, tiketInfo);
				hasil = await orderService.createTicket(order);
			} else if (!(currentUser.credit >= currentSeat.price)) {
				throw errorResponder(errorTypes.INSUFFICIENT_CREDIT, "Insufficient credit! You can't purchase a ticket");
			} else if (currentSeat.isBooked) {
				throw errorResponder(errorTypes.SEAT_BOOKED, 'Seat is booked, please find another seat');
			}
		} catch (error) {
			return next(error);
		}

		return response.status(201).json({
			message: 'Ticket payment has been confirmed and given to user',
			ticket: hasil,
		});
	} catch (error) {
		return next(error);
	}
}

async function cancel(request, response, next) {
	try {
		const orderId = request.order._id; // take from request from checkOwnership
		const userId = request.user.id; // take from verifyLogin
		if (!orderId || !userId) {
			throw errorResponder(errorTypes.VALIDATION, 'Something went wrong!');
		}
		// validation
		const success = await orderService.cancel(orderId);
		if (!success) {
			throw errorResponder(errorTypes.VALIDATION, 'Cannot make cancel request!');
		}
		return response.status(201).json({message: 'Ticket cancel request has been processed!'});
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	orderPlacement,
	payment,
	cancel,
};
