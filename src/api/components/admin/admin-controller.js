const adminService = require('./admin-service');

async function createGames(request, response, next) {
  try {
    const {homeTeam, awayTeam, date, status} = request.body;

    const tickets = await adminService.createGames(
      homeTeam,
      awayTeam,
      date,
      status
    );

    return response.status(200).json(tickets);
  } catch (error) {
    return next(error);
  }
}

async function createTickets(request, response, next) {
  try {
    const {match, seatId, price, gameTimeAndDate, status} = request.body;

    const tickets = await adminService.createTickets(
      match,
      seatId,
      price,
      gameTimeAndDate,
      status
    );

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
};
