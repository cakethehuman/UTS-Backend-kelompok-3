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

module.exports = {
  createGames,
  createTickets,
};
