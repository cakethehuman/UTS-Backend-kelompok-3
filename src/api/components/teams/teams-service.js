const teamsRepository = require('./teams-repository');

async function getTeams() {
  return teamsRepository.getTeams();
}

async function getTeamsById(id) {
  return teamsRepository.getTeamsById(id);
}

module.exports = {
  getTeams,
  getTeamsById
};
