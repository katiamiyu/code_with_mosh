const Joi = require('joi');
const mongoose = require('mongoose');

const movieJoiSchema = Joi.object({
  title: Joi.string().min(5).max(255).required(),
  genreId: Joi.string().required(),
  numberInStock: Joi.number().required(),
  dailyRentalRate: Joi.number().required()
});

const movie = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlenght: 255,
    trim: true,
    lowercase: true,
    required: true
  },
  genre: new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  }),
  numberInStock: {
    type: Number,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  }
});

const Movie = new mongoose.model('Movie', movie);

exports.Movie = Movie;
exports.Schema = movieJoiSchema;