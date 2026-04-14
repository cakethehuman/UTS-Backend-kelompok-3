const gamesScheduleService = require('./games-service');
const {errorResponder, errorTypes} = require('../../../core/errors');

async function getGames(request, response, next) {
  try {
    const users = await gamesScheduleService.getGames();

    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

async function getGame(request, response, next) {
  try {
    const user = await gamesScheduleService.getGames(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getGame,
  getGames,
};
