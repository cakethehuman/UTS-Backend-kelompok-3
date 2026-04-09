const {Tickets} = require('../../../models');

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

module.exports = {
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
