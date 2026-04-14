const usersRepository = require('./games-repository');

async function getGames() {
  return usersRepository.getGames();
}

async function getGame(id) {
  return usersRepository.getGame(id);
}

module.exports = {
  getGame,
  getGames,
};
