// controllers/productController.js

const Product = require('../models/ProductsRegistration'); // Assuming you have a Product model

// Controller to delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId; // Extract product ID from request parameters
    // Find the product by ID and delete it
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  deleteProduct,
};
