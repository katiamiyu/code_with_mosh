require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const debugStartup = require('debug')('app:startup');
const debugDb = require('debug')('app:database');
const config = require('config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/errorhandler');
const express = require('express');
const server = express();
const connectionStr = `mongodb+srv://katiamiyu:${config.get('password')}@enlightenmentblog.8tz07.mongodb.net/vidly`;

process.on('unhandledRejection', (ex)=>{
  throw ex;
});

winston.add(
  new winston.transports.File({
      filename: 'logfile.log',
      level: 'error'
    })
  );
winston.add(
  new winston.transports.MongoDB(
    {
      db: connectionStr,
      level: 'info'
    })
  );
winston.exceptions.handle(new winston.transports.File({filename: 'exceptionlogs.log'}));

// database
mongoose.connect(connectionStr)
.then(()=>winston.info('connected to database'))
.catch((error)=>debugStartup(error.message));

// middlewares
server.use(express.json());
server.use(express.urlencoded({extended:true}));
if (server.get('env')==='development') {
  server.use(morgan('tiny'));
  console.log('morgan loaded');
}
server.use('/api/genres', genres);
server.use('/api/customers', customers);
server.use('/api/movies', movies);
server.use('/api/rentals', rentals);
server.use('/api/users', users);
server.use('/api/auth', auth);
server.use(error);

const port = process.env.PORT || 3000;
server.listen(port, ()=>{
  debugStartup(`server listening at port ${port}`);
  debugStartup(`name: ${config.get('name')}\nHost' ${config.get('email.host')}`);
});