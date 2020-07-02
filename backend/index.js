const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./authentication/routes/user');
const roleRouter = require('./router/role');
const adminRouter = require('./router/admin');

// setup express running port
const app = express();
const port = 4000;

// setup body parser
app.use(bodyParser.json());

// setup routes
app.use('/api/auth', userRouter);
app.use('/api/roles', roleRouter);
app.use('/api/admins', adminRouter);
  

// list to the port.
app.listen(port, () => console.log(`Rafeeg run on port ${port}`));