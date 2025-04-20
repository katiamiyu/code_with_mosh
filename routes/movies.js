const {Movie,Schema} = require('../models/movie');
const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
  const {error,value} = Schema.validate(req.body);
  
  if(error) return res.status(400).send(error.details[0].message);
  
  const genre = await Genre.findById(req.body.genreId);
  
  if(!genre) return res.status(404).send(`genre with id: ${value.genreId} can not be found`);
  const movie = new Movie({
    title: value.title,
    genre: {
      _id: genre.id,
      name: genre.name
    },
    numberInStock: value.numberInStock,
    dailyRentalRate: value.dailyRentalRate
  });
  await movie.save();
});
router.get('/', async (req, res)=>{
  const movies = await Movie.find();
  res.status(200).send(movies);
});

module.exports = router;