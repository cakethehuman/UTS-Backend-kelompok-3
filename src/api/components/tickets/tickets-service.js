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

async function getTicketById(id) {
  return ticketsRepository.getTicketById(id);
}

async function updateTicket(id, updateData) {
  return ticketsRepository.updateTicket(id, updateData);
}

async function deleteTicket(id) {
  return ticketsRepository.deleteTicket(id);
}

module.exports = {
  getTickets,
  createTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
