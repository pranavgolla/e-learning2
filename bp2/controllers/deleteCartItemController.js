const CartItem = require('../models/CartList');

// Controller function to delete a cart item by user and ID
const deleteCartItem = async (req, res) => {
  const { user, id } = req.params;
  try {
    // Find the cart item by user and ID and delete it
    const deletedCartItem = await CartItem.findOneAndDelete({ user: user, _id: id });
    if (!deletedCartItem) {
      // If the item is not found, return a 404 error
      return res.status(404).json({ error: 'Cart item not found' });
    }
    // If successfully deleted, return a success message
    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    // If an error occurs, return a 500 error
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { deleteCartItem };
