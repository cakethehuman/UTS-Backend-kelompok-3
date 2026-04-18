const {Teams} = require('../../../models');

async function getTeams() {
  return Teams.find({});
}

async function getTeamsById(id) {
  return Teams.findById(id);
}

module.exports = {
  getTeams,
  getTeamsById,
};