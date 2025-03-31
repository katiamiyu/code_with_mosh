const debugStartup = require('debug')('app:startup');
const debugDb = require('debug')('app:database');
const config = require('config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const server = express();

// database
mongoose.connect(`mongodb+srv://katiamiyu:${config.get('password')}@enlightenmentblog.8tz07.mongodb.net/vidly`)
.then(()=>debugDb('connected to database'))
.catch((error)=>debugStartup(error.message));

// middlewares
server.use(express.json());
server.use(express.urlencoded({extended:true}));
if (process.env.NODE_ENV==='development') {
  server.use(morgan('tiny'));
  console.log('morgan loaded');
}
server.use('/api/genres', genres);
server.use('/api/customers', customers);

const port = process.env.PORT || 3000;
server.listen(port, ()=>{
  debugStartup(`server listening at port ${port}`);
  debugStartup(`name: ${config.get('name')}\nHost' ${config.get('email.host')}`);
});