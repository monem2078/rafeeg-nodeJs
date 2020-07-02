const express = require('express');
const roleController = require('../controllers/role');
const auth = require('../authentication/middlewares/auth');
const hasRole = require('../middlewares/authorization');
const { validateBody, schemas } = require('../validations/role');
const app = express();

app.get('/index', auth, hasRole, roleController.index);
app.post('/store',validateBody(schemas.create), auth, hasRole, roleController.store);
app.patch('/update/:id', validateBody(schemas.update), hasRole, auth, roleController.update);

module.exports = app;

