const Product = require("../models/ProductsRegistration");

const fetchProducts = async (req, res) => {
  try {
    const { sort_by, category, title_search, rating, owner } = req.query;
    console.log("req.query:", req.query);

    // Constructing the query object
    let query = {};

    // if (sort_by === "-1") {
    //   // Sorting by price in descending order if sort_by parameter is -1
    //   query.sort = { price: -1 };
    // } else if (sort_by === "1") {
    //   // Sorting by price in ascending order if sort_by parameter is 1
    //   query.sort = { price: 1 };
    // }

    if (category !== "") {
      // Filtering by category if category parameter is provided
      query.category = category;
    }
    if (rating !== "") {
      // Parsing rating to integer
      query.rating=rating
      // const parsedRating = parseInt(rating);
      // console.log("parsedRating:", parsedRating);

      // Checking if parsedRating is a valid number
      // if (!isNaN(parsedRating)) {
      //   // Filtering by rating if rating parameter is provided and parsedRating is a valid number
      //   query.rating = { $gte: parsedRating };
      // } else {
      //   console.log("Invalid rating value:", rating);
      // }
    }
    if (owner !== "") {
      query.owner = owner;
    }

    if (title_search !== "") {
      // Searching by title if title_search parameter is provided
      query.brand = { $regex: new RegExp(title_search, "i") }; // Case-insensitive search
    }

    

    // Fetching products based on the constructed query
    const products = await Product.find(query).sort({
      price: parseInt(sort_by) || 1,
    });
    console.log("Fetched products:", products);
    console.log(query);

    // Sending the fetched products as a JSON response
    res.status(200).json(products);
  } catch (error) {
    // Handling errors
    console.error(`Error fetching products: ${error}`);
    res.status(500).json({ message: `${error}` });
  }
};

module.exports = { fetchProducts };
