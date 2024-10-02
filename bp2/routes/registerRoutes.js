const express = require("express");
const router = express.Router();
const registerController = require("../controllers/userRegisterController");

const adminRegistrationController = require("../controllers/adminRegistrationController");
const loginController = require("../controllers/userLoginController"); // Import login controller
const adminController = require("../controllers/adminLoginController");
// const Register = require("../models/UserRegister");
 const productsRegistrationController=require('../controllers/adminProductsRegistrationController')
 const fetchProducts=require("../controllers/adminFetchRegisterProducts")



// Route for adding a new registration entry
router.post("/add-user-register", registerController.createUserRegister);
router.post("/user-login", loginController.loginUser);

router.post("/add-adminregistration", adminRegistrationController.createAdminRegistration);
router.post("/admin-login", adminController.loginAdmin);

router.post('/register-product',productsRegistrationController.createProduct)
// Route for handling login requests
router.get('/fetch-allproducts',fetchProducts.fetchProducts)

const productController = require('../controllers/productController');

// DELETE route to delete a product by ID
router.delete('/delete-product/:productId', productController.deleteProduct);


const  fetchProductById  = require('../controllers/fetchProductByIdController');

// Route to fetch a single product by its ID
router.get('/products/:id', fetchProductById.fetchProductById);




  const cartItemController = require('../controllers/cartListController.js');

// Route to create cart items
 router.post('/create-cart-items', cartItemController.createCartItem);

// const fetchCartList=require('../controllers/cartListController.js')

router.get('/cartitemlist/:user',cartItemController.getAllCartItems)

// const { deleteCartList } = require('../controllers/deleteCartList.js');

// Route to delete the entire cart list
router.delete('/deletecartlist/:user', cartItemController.deleteAllCartItems);

const cartController = require('../controllers/deleteCartItemController.js');

// DELETE request to delete a cart item by user and ID
router.delete('/deletecartitem/:user/:id', cartController.deleteCartItem);


module.exports = router;
