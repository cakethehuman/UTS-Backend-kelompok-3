const {Games} = require('../../../models');
const {Tickets} = require('../../../models');

async function createGames(homeTeam, awayTeam, date, status) {
  return Games.create({homeTeam, awayTeam, date, status});
}

async function createTickets(match, seatId, price, gameTimeAndDate, status) {
  return Tickets.create({match, seatId, price, gameTimeAndDate, status});
}

async function deleteTicket(id) {
  return Tickets.findByIdAndDelete(id);
}
// async function getUserByEmail(email) {
//   return Users.findOne({ email });
// }

module.exports = {
  createGames,
  createTickets,
  deleteTicket,
};
