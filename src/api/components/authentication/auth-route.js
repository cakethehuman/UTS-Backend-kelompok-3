const express = require('express');

const authController = require('./auth-controller');

const authenticateToken = require('../../../utils/AuthenticateToken');

const route = express.Router();

module.exports = (app) => {
  app.use('/auth', route);

  // register a new user
  route.post('/register', authController.createUsers);
  // login
  route.post('/login', authController.login);
  // me
  route.get('/me', authenticateToken, authController.me);
  //
  route.post('/logout', authController.logout);
}