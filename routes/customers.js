const {Customer, Schema} = require('../models/customers');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
  try{
    const customers = await Customer.find();
    res.status(200).send(customers);
  }catch(error){
    res.status(500).send(error.message);
  }
});
router.get('/:id', async (req,res)=>{
  const {id} = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).send('bad request: invalid id');
  try{
    const customer = await Customer.find({_id: id})
    .select('name phone email isgold');
    res.status(200).send(customer);
  }catch(error){
    res.status(500).send(error.message);
  }
});
router.post('/', async (req,res)=>{
  const {error, value} = Schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try{
    let customer = new Customer(value);
    customer = await customer.save();
    res.status(201).send(customer);
  }catch(error){
    res.status(500).send(error.message);
  }
});
router.delete('/:id', async (req,res)=>{
  const {id} = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).send('bad request: invalid id');
  try{
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) return res.status(404).send(`customer with id ${id} does not exist`);
    res.status(200).send(customer);
  }catch(error){
    res.status(500).send(error.message);
  }
});

module.exports = router;