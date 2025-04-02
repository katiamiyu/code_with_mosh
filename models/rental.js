const Joi = require('joi');
const mongoose = require('mongoose');

const rentalJoiSchema = Joi.object({
  customerId: Joi.string().required(),
  movieId: Joi.string().required(),
  dateReturned: Joi.date(),
  rentalFee: Joi.number()
});

const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: new mongoose.Schema({
    name: {
      type: String,
      minlength: 5,
      maxlength: 50,
      trim: true,
      required: true
    },
    isGold: Boolean,
    phone: {
      type: String,
      maxlength: 15,
      minlength: 10,
      required: true,
      trim: true
    }
  }),
  movie: new mongoose.Schema({
    title: {
      type: String,
      minlength: 5,
      maxlength: 255,
      trim: true,
      required: true
    },
    dailyRentalRate: {
      type: Number,
      min: 0,
      max: 255,
      required: true
    }
  }),
  dateOut: {
    type: Date,
    default: Date.now
  },
  dateReturned: Date,
  rentalFee: {
    type: Number,
    min: 0
  }
}));

exports.Rental = Rental;
exports.Schema = rentalJoiSchema;