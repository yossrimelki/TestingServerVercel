const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchSchema = new Schema({
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
    default: 'https://raw.githubusercontent.com/yossrimelki/TestingServerVercel/master/uploads/product4.png', // Default image URL
    required: false // Allow null values by not marking it as required
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number, // Changed to String to accommodate "5+"
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

const Watch = mongoose.model('Watch', watchSchema);
module.exports = Watch;
