const {Tickets} = require('../../../models');

async function getTickets() {
  return Tickets.find({});
}

async function createTickets(match, seatId, price, gameTimeAndDate, status) {
  return Tickets.create({match, seatId, price, gameTimeAndDate, status});
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

module.exports = {
  getTickets,
  createTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
