const {Genre, Schema} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
  const genres = await Genre.find();
  return res.status(200).send(genres);
});
router.get('/:id', async (req,res)=>{
  const {id} = req.params;
  const genre = await Genre.findById(id);
  if (!genre) return res.status(404).send(`genre with id ${id} can not be found`);
  res.status(200).send(genre);
});
router.post('/', async (req,res)=>{
  const {error,value} = Schema.validate({name: req.body.name});
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre(value);
  genre = await genre.save();
  res.status(201).send(genre);
});
router.put('/:id', async (req,res)=>{
  const {id} = req.params;
  const {error,value} = Schema.validate({name: req.body.name});
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate({_id:id}, {$set:value}, {new:true});
  if (!genre) return res.status(404).send(`genre with id ${id} can not be found`);
  res.status(200).send(genre);
});
router.delete('/:id', async (req,res)=>{
  const {id} = req.params;
  const genre = await Genre.findByIdAndDelete(id);
  if (!genre) return res.status(404).send(`genre with id ${id} can not be found`);
  res.status(200).send(genre);
});

module.exports = router;