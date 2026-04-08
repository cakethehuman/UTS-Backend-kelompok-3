const ticketsRepository = require('./tickets-repository');

async function getTickets() {
  return ticketsRepository.getTickets();
}

async function createTickets(match, seatId, price, gameTimeAndDate, status) {
  return ticketsRepository.createTickets(
    match,
    seatId,
    price,
    gameTimeAndDate,
    status
  );
}

module.exports = {
  getTickets,
  createTickets,
};
