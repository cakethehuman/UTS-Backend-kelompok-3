/* eslint-disable prettier/prettier */
const teamsService = require('./teams-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getTeams(request, response, next) {
  try {
    const teams = await teamsService.getTeams(request.user.id);
    if(!teams){
      throw errorResponder(
        errorTypes.VALIDATION,
        "Cannot Find Teams"
      );
    }
    return response.status(200).json(teams);
  } catch(error) {
    next(error);
  }
}

async function getTeamsById(request, response, next) {
  try {
    const teams = await teamsService.getTeamsById(
      request.params.id
    )
    if(!teams){
      throw errorResponder(
        errorTypes.VALIDATION,
        "Cannot Find Teams"
      );
    }
    return response.status(200).json(teams);
  } catch(error) {
    next(error);
  }
}

module.exports = {
  getTeams,
  getTeamsById
};
