// admin service akan mengambil repository dari user
const adminRepository = require('./admin-repository');

async function createGames(homeTeam, awayTeam, date, status) {
  return adminRepository.createTickets(homeTeam, awayTeam, date, status);
}

async function createTickets(match, seatId, price, gameTimeAndDate, status) {
  return adminRepository.createTickets(
    match,
    seatId,
    price,
    gameTimeAndDate,
    status
  );
}

async function deleteTicket(id) {
  return adminRepository.deleteTicket(id);
}

module.exports = {
  createGames,
  createTickets,
  deleteTicket,
};
