const ticketsRepository = require('./tickets-repository');

async function getTickets() {
  return ticketsRepository.getTickets();
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
  getTicketById,
  updateTicket,
  deleteTicket,
};
