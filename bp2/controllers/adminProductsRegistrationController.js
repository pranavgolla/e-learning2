const Product = require('../models/ProductsRegistration');

const createProduct = async (req, res) => {
  try {
    // Extract product details from request body
    const { imageUrl, title, brand, owner, rating, price, category } = req.body;

    // Check if either imageUrl or title is present in the request body
    if (!imageUrl && !title) {
      return res.status(400).json({ message: 'Either imageUrl or title is required' });
    }

    // Create a new product document
    const newProduct = new Product({
      imageUrl,
      title,
      brand,
      owner,
      rating,
      price,
      category
    });

    // Save the new product document to the database
    await newProduct.save();

    // Return success response
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    // Return error response if an error occurs
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createProduct };
