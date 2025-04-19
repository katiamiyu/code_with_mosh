const _ = require('lodash');
const {User,Schema} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
  const {error,value} = Schema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({email: value.email});
  if(user) return res.status(400).send('Email is already registered');
  
  user = new User(_.pick(value, ['name','email','password']));
  await user.save();
  res.status(201).send(_.pick(value, ['name', 'email']));
});
router.get('/', async (req,res)=>{
  const users = await User.find().sort({name: 1});
  res.status(200).send(users);
});

module.exports = router;