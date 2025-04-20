const {Customer, Schema} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
  const customers = await Customer.find();
  res.status(200).send(customers);
});
router.get('/:id', async (req,res)=>{
  const {id} = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).send('bad request: invalid id');

  const customer = await Customer.find({_id: id})
  .select('name phone email isgold');
  res.status(200).send(customer);
});
router.post('/', async (req,res)=>{
  const {error, value} = Schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer(value);
  customer = await customer.save();
  res.status(201).send(customer);

});
router.delete('/:id', async (req,res)=>{
  const {id} = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).send('bad request: invalid id');

  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) return res.status(404).send(`customer with id ${id} does not exist`);
  res.status(200).send(customer);

});

module.exports = router;