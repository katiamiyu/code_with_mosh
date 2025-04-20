const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const router = require('express').Router();

const Schema = Joi.object({
  email: Joi.string().min(5).max(255).email(),
  password: Joi.string().min(8).max(255).required()
});

router.post('/', async (req,res)=>{
  const {error,value} = Schema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({email: value.email});

  if(!user) return res.status(400).send('invalid email or password');
  
  try{
    const dcrypt = await bcrypt.compare(value.password, user.password);
  }catch(ex){
    res.status(400).send(ex.message);
  }
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(token);
});

module.exports = router;