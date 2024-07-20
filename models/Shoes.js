const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  img: {
    type: String,
    default: 'https://raw.githubusercontent.com/yossrimelki/TestingServerVercel/master/uploads/nike-adapt-bb.png', // Default image URL
    required: false // Allow null values by not marking it as required
  },
  price: {
    type: Number,
    required: true
  },
  sizes: {
    type: [Number],
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  shadow: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Shoes = mongoose.model('Shoes', shoesSchema);
module.exports = Shoes;
