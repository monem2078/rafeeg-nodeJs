const express = require('express');
const userController = require('../controllers/user');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const app = express();

// app.post('/sign-up', [validateBody(schemas.signUpSchema), userController.signUp]);
app.post('/sign-in', [validateBody(schemas.signInSchema), userController.signIn]);
app.patch('/forgot-pw', [validateBody(schemas.forgotPwSchema), userController.forgotPw]);
app.patch('/reset/:token', [validateBody(schemas.resetPwSchema), userController.saveNewPw]);

module.exports = app;