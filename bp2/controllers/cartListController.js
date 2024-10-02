const CartItem = require("../models/CartList");

// Controller function to create a new cart item
const createCartItem = async (req, res) => {
  try {
    const {
      imageUrl,
      title,
      brand,
      owner,
      rating,
      price,
      category,
      user,
      __v,
      _id,
      quantity,
    } = req.body;
    const newCartItem = new CartItem({
      imageUrl,
      title,
      brand,
      owner,
      rating,
      price,
      category,
      user,
      __v,
      _id,
      quantity,
    });
    await newCartItem.save();
    res.status(201).json({
      message: "Cart item created successfully",
      cartItem: newCartItem,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCartItems = async (req, res) => {
  const { user } = req.params;
  console.log(user);

  try {
    const cartItems = await CartItem.find({ user: user });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


// Controller function to delete all cart items 9866
const deleteAllCartItems = async (req, res) => {
  const { user } = req.params;
  console.log(user);
  try {
    await CartItem.deleteMany();
    res.status(200).json({ message: "All cart items deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createCartItem, getAllCartItems, deleteAllCartItems };
