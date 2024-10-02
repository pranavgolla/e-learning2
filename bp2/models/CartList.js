const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  __v: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
