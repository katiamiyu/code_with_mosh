const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = Joi.object({
  name: Joi.string().min(5).max(50).required()
});

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
    lowercase: true
  }
}));

exports.Genre = Genre;
exports.Schema = genreSchema;