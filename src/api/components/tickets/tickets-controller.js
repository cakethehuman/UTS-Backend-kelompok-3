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

async function createTickets(request, response, next) {
  try {
    const {match, seatId, price, gameTimeAndDate, status} = request.body;

    const tickets = await ticketService.createTickets(match, seatId, price, gameTimeAndDate, status);

    return response.status(200).json(tickets);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTickets,
  createTickets,
};
