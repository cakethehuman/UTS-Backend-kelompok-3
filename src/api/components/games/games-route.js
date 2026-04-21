const express = require('express');
const verifyUser = require('../../../utils/AuthenticateToken')
const gamesController = require('./games-controller');

const route = express.Router();

module.exports = (app) => {
	app.use('/games', route);

  // Get all games
  route.get('/', verifyUser, gamesController.getGames);
  
  // Get games by id
  route.get('/:id', verifyUser, gamesController.getGame);

  // Get seats in the game
  route.get('/:id/seats', verifyUser, gamesController.getSeats);

  // Get a game seat in the game
  route.get('/:gameId/seats/:id', verifyUser, gamesController.getSeat);
};
