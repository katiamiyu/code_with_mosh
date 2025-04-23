const winston = require('winston');
const mongoose = require('mongoose');

module.exports = (connectionStr)=>{
  mongoose.connect(connectionStr)
  .then(()=>winston.info('connected to database'));
};