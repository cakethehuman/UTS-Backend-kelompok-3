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

async function findTicketsbyId(id) {
  return ticketsRepository.findTicketsbyId(id);
}

async function cancelTicket(ticketId, cancelData) {
  return ticketsRepository.cancelTicket(ticketId, cancelData);
}

module.exports = {
	getTickets,
	getTicketById,
	updateTicket,
	deleteTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  cancelTicket,
  findTicketsbyId,
};
