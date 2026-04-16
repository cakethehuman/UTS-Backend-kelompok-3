/* eslint-disable prettier/prettier */
const { response, request } = require('express');
const ticketService = require('./tickets-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
async function buyTicket(request, response, next) {
  try{
    const {gameId,seatId,price,status} = request.body;
    const tiket = await ticketService.buyTicket(gameId,seatId,price,status);

    return response.status(201).json({message : "tiket berasil di beli"})
  } catch(error){
    return next(error);
  }
}


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

async function deleteTicket(request, response, next) {
  try {
    const { id } = request.params;

    const deletedTicket = await ticketService.deleteTicket(id);

    if (!deletedTicket) {
      return response.status(404).json({ message: 'Ticket not found' });
    }

    return response.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

async function getMyTicket(request, response, next) {
  try {
    const { id } = request.params.id;

    const tickets = await ticketService.getTicketsById(id)
    response.status(200).json({message: tickets})
  } catch (err){
    next(err)
  }
}

module.exports = {
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  buyTicket
  getMyTicket
};
