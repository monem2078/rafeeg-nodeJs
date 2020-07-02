const express = require('express');
const userController = require('../controllers/admin');
const auth = require('../authentication/middlewares/auth');
const hasRole = require('../middlewares/authorization');
const app = express();

app.get('/index', auth, userController.index);
app.post('/create', auth, userController.create);

module.exports = app;