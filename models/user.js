const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userJoiSchema = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  email: Joi.string().min(5).max(255).email(),
  password: Joi.string().min(8).max(255).required()
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    trim: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1048,
    required: true
  }
});
userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id}, 'jwtprivatekey');
  return token;
};

const User = mongoose.model('User', userSchema);

exports.Schema = userJoiSchema;
exports.User = User;