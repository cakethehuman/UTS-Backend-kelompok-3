const ticketsRepository = require('./tickets-repository');

async function buyTicket(gameId,seatId,price,status) {
	return ticketsRepository.buyTicket(gameId,seatId,price,status);
}

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

module.exports = {
	getTickets,
	getTicketById,
	updateTicket,
	deleteTicket,
	buyTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  findTicketsbyId
};
