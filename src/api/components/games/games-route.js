const express = require('express');
const verifyUser = require('../../../utils/AuthenticateToken')
const gamesController = require('./games-controller');

const route = express.Router();

module.exports = (app) => {
	app.use('/games', route);

  // Get all games
  route.get('/', verifyUser, gamesController.getGames);
  
  // make games (admin only later)
  // route.post('/', gamesController.makeGame)

  // Get games by id
  route.get('/:id', verifyUser, gamesController.getGame);

  // Get games seats
  route.get('/:id/seats', verifyUser, gamesController.getSeats);
};
