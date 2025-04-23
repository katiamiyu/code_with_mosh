const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/errorhandler');

module.exports = (server)=>{
  server.use('/api/genres', genres);
  server.use('/api/customers', customers);
  server.use('/api/movies', movies);
  server.use('/api/rentals', rentals);
  server.use('/api/users', users);
  server.use('/api/auth', auth);
  server.use(error);
};