const {Genre, Schema} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
  try{
    const genres = await Genre.find();
    return res.status(200).send(genres);
  } catch (error) {
    return res.status(500).send('error connecting to database');
  }
});
router.get('/:id', async (req,res)=>{
  const {id} = req.params;
  try {
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send(`genre with id ${id} can not be found`);
    
    res.status(200).send(genre);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post('/', async (req,res)=>{
  const {error,value} = Schema.validate({name: req.body.name});
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let genre = new Genre(value);
    genre = await genre.save();
    res.status(201).send(genre);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.put('/:id', async (req,res)=>{
  const {id} = req.params;
  const {error,value} = Schema.validate({name: req.body.name});
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const genre = await Genre.findByIdAndUpdate({_id:id}, {$set:value}, {new:true});
    if (!genre) return res.status(404).send(`genre with id ${id} can not be found`);
    
    res.status(200).send(genre);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.delete('/:id', async (req,res)=>{
  const {id} = req.params;
  try {
    const genre = await Genre.findByIdAndDelete(id);
    if (!genre) return res.status(404).send(`genre with id ${id} can not be found`);
    
    res.status(200).send(genre);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;