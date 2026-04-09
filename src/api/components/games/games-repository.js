const {Games} = require('../../../models');

async function getGames() {
  return Games.find({});
}

async function getGame(id) {
  return Games.findById(id);
}

// async function getUserByEmail(email) {
//   return Users.findOne({ email });
// }

module.exports = {
  getGame,
  getGames,
};
