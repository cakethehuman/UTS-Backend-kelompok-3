/* eslint-disable prettier/prettier */
const {response, request} = require('express');
const ticketService = require('./tickets-service');
const {errorResponder, errorTypes} = require('../../../core/errors');

async function getTickets(request, response) {
	try {
		const tickets = await ticketService.getTickets();
		return response.status(200).json(tickets);
	} catch (error) {
		return errorResponder(response, error, errorTypes.INTERNAL_SERVER_ERROR);
	}
}

async function getTicketById(request, response) {
	try {
		const {id} = request.params;
		const ticket = await ticketService.getTicketById(id);

		if (!ticket) {
			throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Ticket not found');
		}

		return response.status(200).json(ticket);
	} catch (error) {
		return errorResponder(response, error, errorTypes.INTERNAL_SERVER_ERROR);
	}
}

async function updateTicket(request, response) {
	try {
		const {id} = request.params;
		const updateData = request.body;

		const updatedTicket = await ticketService.updateTicket(id, updateData);

		if (!updatedTicket) {
			return errorResponder(response, 'Ticket not found', errorTypes.NOT_FOUND);
		}

		return response.status(200).json(updatedTicket);
	} catch (error) {
		return errorResponder(response, error, errorTypes.BAD_REQUEST);
	}
}

async function deleteTicket(request, response) {
	try {
		const {id} = request.params;
		const deletedTicket = await ticketService.deleteTicket(id);

		if (!deletedTicket) {
			return errorResponder(response, 'Ticket not found', errorTypes.NOT_FOUND);
		}

		return response.status(200).json({message: 'Ticket deleted successfully'});
	} catch (error) {
		return errorResponder(response, error, errorTypes.INTERNAL_SERVER_ERROR);
	}
}

async function cancelTicket(request, response) {
	try {
		const {id} = request.params;
		const ticket = await ticketService.getTicketById(id);

		// validate if the ticket can be cancelled based on its current status
		if (!ticket) {
			return errorResponder(response, 'Ticket not found', errorTypes.NOT_FOUND);
		}

		const cancelledTicket = await ticketService.cancelTicket(id);
		return response.status(200).json(cancelledTicket);
	} catch (error) {
		return errorResponder(response, error, errorTypes.UNPROCESSABLE_ENTITY);
	}
}

async function getMyTicket(request, response, next) {
	try {
		const {id} = request.params.id;

		const tickets = await ticketService.getTicketsById(id);
		response.status(200).json({message: tickets});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getTickets,
	getTicketById,
	updateTicket,
	deleteTicket,
	cancelTicket,
	getMyTicket,
};
