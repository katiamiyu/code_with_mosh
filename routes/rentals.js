const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const {Rental,Schema} = require('../models/rental');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
  const session = await mongoose.startSession();
  const {error, value} = Schema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  try{
    await session.startTransaction();
    const movie = await Movie.findById(value.movieId);
    if(!movie) return res.status(404).send(`movie with id: ${value.movieId} can not be found`);
    
    const customer = await Customer.findById(value.customerId);
    if(!customer) return res.status(404).send(`customer with id: ${value.customerId} can not be found`);
    
    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      },
    });
    
    await rental.save({session});
    movie.numberInStock--;
    await movie.save({session});
    await session.commitTransaction();
    session.endSession();
    res.status(201).send(rental);
    
  }catch(error){
    await session.abortTransaction();
    session.endSession();
    res.status(500).send(error.message);
  }
});
router.get('/', async (req,res)=>{
  const rentals = await Rental.find().sort('customer.name');
  res.status(200).send(rentals);
})

module.exports = router;