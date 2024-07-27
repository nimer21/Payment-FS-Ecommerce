const express = require('express');

const router = express.Router();

const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controller/user/userDetails');
const userLogoutController = require('../controller/user/userLogout');
const allUsersController = require('../controller/user/allUsers');
const updateUserController = require('../controller/user/updateUser');
const uploadProductController = require('../controller/product/uploadProduct');
const getProductsController = require('../controller/product/getProducts');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProductController = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProductController = require('../controller/product/getCategoryWiseProduct');
const getProductDetailsController = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCart');
const countAddToCartProductController = require('../controller/user/countAddToCartProduct');
const addToCartViewProductController = require('./../controller/user/addToCartViewProduct');
const updateAddToCartProductController = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProductController = require('../controller/user/deleteAddToCartProduct');
const searchProductController = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const paymentController = require('../controller/order/payment');
const webhooks = require('../controller/order/webhook');
const orderController = require('../controller/order/order');
const allOrdersController = require('../controller/order/allOrders');

router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.get('/userLogout', userLogoutController);

// admin panel
router.get('/all-users',authToken, allUsersController);
router.put('/update-user', authToken, updateUserController);

//product
router.post('/upload-product',authToken, uploadProductController);
router.get('/get-products', getProductsController);
router.put('/update-product',authToken, updateProductController);
router.get('/get-categoryProduct', getCategoryProductController);
router.post('/category-product', getCategoryWiseProductController);
router.post('/product-details', getProductDetailsController);
router.get('/search', searchProductController);
router.post('/filter-product', filterProductController);

//user add to cart
router.post('/addtocart', authToken, addToCartController);
router.get('/countAddToCartProduct', authToken, countAddToCartProductController);
router.get('/view-cart-product', authToken, addToCartViewProductController);
router.post('/update-cart-product', authToken, updateAddToCartProductController);
router.post('/delete-cart-product', authToken, deleteAddToCartProductController);

//payment and order
router.post('/checkout', authToken, paymentController);
router.post('/webhook', webhooks); // /api/webhook
router.get('/order-list', authToken, orderController);
router.get('/all-orders', authToken, allOrdersController); 

module.exports = router;