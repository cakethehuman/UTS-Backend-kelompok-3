const express = require('express');

const gamesController = require('./games-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/games', route);

  // Get all games
  route.get('/', gamesController.getGame);
  
  // make games (admin only later)
  // route.post('/', gamesController.makeGame)

  // Get games by id
  route.get('/:id', gamesController.getGames);
};
