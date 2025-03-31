const Joi = require('joi');
const mongoose = require('mongoose');

// joi validation schema
const customerSchema = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  username: Joi.string().min(5).max(15).required(),
  phone: Joi.string().min(10).max(15).required(),
  isGold: Joi.boolean(),
  email: Joi.string().required()
});

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    lowercase: true
  }, 
  username: {
    type: String,
    minlength: 5,
    maxlength: 15,
    required: true,
    lowercase: true
  }, 
  phone: {
    type: String,
    minlength: 10,
    maxlength: 15,
    required: true
  }, 
  isgold: Boolean, 
  email: {
    type: String,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
}));

exports.Customer = Customer;
exports.Schema = customerSchema;