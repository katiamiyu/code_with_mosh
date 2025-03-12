const debugAppStartup = require('debug')('app:startup');
const morgan = require('morgan');
const config = require('config');
const users = require('./routes/users');
const express = require('express');
const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));

if (server.get('env')==='development'){
  server.use(morgan('tiny'));
  debugAppStartup('loading middleware');
  console.log('morgan loaded');
}
console.log(server.get('env'));
console.log(`node env: ${process.env.NODE_ENV}`);

console.log(`name: ${config.get('name')}`);
console.log(`Email: ${config.get('email.host')}`);
console.log(`password: ${config.get('email.password')}`);

debugAppStartup('users routes');
server.use('/api/users', users);

server.use(function(req, res, next){
  console.log("hit middleware");
  next();
});


const port = process.env.PORT || 3000;
server.listen(port,()=>console.log(`app listening at port ${port}`));