const {Tickets} = require('../../../models');

async function buyTicket(gameId, seatId, price, status) {
	return Tickets.create({gameId, seatId, price, status});
}

async function getTickets() {
	return Tickets.find({});
}

async function getTicketById(id) {
	return Tickets.findById(id);
}

async function updateTicket(id, updateData) {
	return Tickets.findByIdAndUpdate(id, updateData, {new: true});
}

async function deleteTicket(id) {
	return Tickets.findByIdAndDelete(id);
}

async function findTicketsbyId(id) {
  return Tickets.find(id)
}

async function cancelTicket(id) {
  return Tickets.findByIdAndUpdate(id, {status: 'cancelled'}, {new: true});
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
  cancelTicket,
  findTicketsbyId
};
