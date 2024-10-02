const mongoose = require('mongoose');

// Define the schema for the product model
const productSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  brand: {
    type: String,
    required: false
  },
  owner: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: false
  },
  category: {
    type: String,
    required: true
  }
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
