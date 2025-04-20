const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {User,Schema} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
  const {error,value} = Schema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({email: value.email});
  if(user) return res.status(400).send('Email is already registered');
  
  const salt = await bcrypt.genSalt(10);
  value.password = await bcrypt.hash(value.password, salt);
  
  user = new User(_.pick(value, ['name','email','password']));
  await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).status(201).send(_.pick(value, ['name', 'email']));
});
router.get('/', async (req,res)=>{
  const users = await User.find().sort({name: 1});
  res.status(200).send(users);
});

module.exports = router;