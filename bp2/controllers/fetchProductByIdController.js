const Product = require('../models/ProductsRegistration');

const fetchProductById = async (req, res) => {
  try {
    // Extracting the product ID from the request parameters
    const productId = req.params.id;
    console.log('Product ID:', productId);

    // Fetching the product by its ID
    const product = await Product.findById(productId);
    console.log('Fetched product:', product);

    // Checking if the product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Sending the fetched product as a JSON response
    res.status(200).json(product);
  } catch (error) {
    // Handling errors
    console.error(`Error fetching product by ID: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { fetchProductById };
