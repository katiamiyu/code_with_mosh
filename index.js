require('express-async-errors');
const winston = require('winston');
const config = require('config');
const express = require('express');
const server = express();

const connectionStr = `mongodb+srv://katiamiyu:${config.get('password')}@enlightenmentblog.8tz07.mongodb.net/vidly`;

require('./startup/errorlogging')(connectionStr);
require('./startup/db')(connectionStr);
server.use(express.json());
require('./startup/routes')(server);

const port = process.env.PORT || 3000;
server.listen(port, ()=>{
  winston.info(`server listening at port ${port}`);
  winston.info(`name: ${config.get('name')}\nHost' ${config.get('email.host')}`);
});