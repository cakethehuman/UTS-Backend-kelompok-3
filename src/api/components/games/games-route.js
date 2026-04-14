const express = require('express');

const gamesController = require('./games-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/games', route);

  // Get all games
  route.get('/', gamesController.getGame);

  // Get games by id
  route.get('/:id', gamesController.getGames);
};
