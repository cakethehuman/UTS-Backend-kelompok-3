/* eslint-disable prettier/prettier */
const ticketService = require('./tickets-service');
// const { errorResponder, errorTypes } = require('../../../core/errors');

async function getTickets(request, response, next) {
  try {
    const tickets = await ticketService.getTickets();

    return response.status(200).json(tickets);
  } catch (error) {
    return next(error);
  }
}

async function getTicketById(request , response, next) {
  try {
    const { id } = request.params;
    const ticket = await ticketService.getTicketById(id);

    if (!ticket) {
      return response.status(404).json({ message: 'Ticket not found' });
    }

    return response.status(200).json(ticket);   
  }catch (error) {
    return next(error);
  }  
}

async function updateTicket(request, response, next) {
  try {
    const { id } = request.params;
    const updateData = request.body;

    const updatedTicket = await ticketService.updateTicket(id, updateData);

    if (!updatedTicket) {
      return response.status(404).json({ message: 'Ticket not found' });
    }

    return response.status(200).json(updatedTicket);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTickets,
  getTicketById,
  updateTicket,
};
