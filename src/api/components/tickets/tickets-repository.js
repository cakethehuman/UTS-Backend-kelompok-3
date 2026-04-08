const {Tickets} = require('../../../models');

async function getTickets() {
  return Tickets.find({});
}

async function createTickets(match, seatId, price, gameTimeAndDate, status) {
  return Tickets.create({match, seatId, price, gameTimeAndDate, status});
}

module.exports = {
  getTickets,
  createTickets,
};
