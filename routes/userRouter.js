const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController')
const middleware = require('../middlewares/userMiddleware')

//Home page
router
      .route('/')
      .get(middleware.activeCheck,userController.homepage)
      .post(userController.login)

// Login page
router
      .route('/login')
      .get(userController.loginPage)

// Signup page
router
      .route('/signup')
      .get(userController.signupPage)

// signup data to database
router
      .route('/signed_up')
      .post(userController.signedUp)

// My account page
router
      .route('/account')
      .get(middleware.loginCheck,middleware.activeCheck,userController.account)

// Logout user
router
      .route('/logout')
      .get(userController.logout)

// Mobile verification page
router
      .route('/verification')
      .post(userController.otp)

// Mobile verification check
router
      .route('/checkOtp')
      .post(userController.checkOtp)

// Single product page
router
      .route('/product/:id')
      .get(middleware.activeCheck,userController.singleProduct)

// Shop by category page
router
      .route('/shop_by_category/:id')
      .get(middleware.activeCheck,userController.shopByCategory)

// Cart page
router
      .route('/cart')
      .get(middleware.loginCheck,middleware.activeCheck,userController.cart)

// Add a product to cart
router
      .route('/add_to_cart/:id')
      .put(middleware.loginCheck,middleware.activeCheck,userController.addToCart)

// Delete a product from cart
router
      .route('/delete_from_cart/:id')
      .delete(middleware.loginCheck,middleware.activeCheck,userController.deleteFromCart)
   
router
      .route('/cart_count')
      .get(userController.cartCount) // Get cart count
      .put(userController.updateCart) // Update product count in cart

// wishlist page
router
      .route('/wishlist')
      .get(middleware.loginCheck,middleware.activeCheck,userController.wishlist)

// add product to wishlist
router
      .route('/add_to_wishlist/:id')
      .put(middleware.loginCheck,middleware.activeCheck,userController.addToWishlist)

// Delete product from wishlist
router
      .route('/delete_from_wishlist/:id')
      .delete(middleware.loginCheck,middleware.activeCheck,userController.deleteFromWishlist)

// Add a new address
router
      .route('/add_address')
      .post(middleware.loginCheck,middleware.activeCheck,userController.addAddress)

// Delete single address
router
      .route('/delete_address/:id')
      .delete(middleware.loginCheck,middleware.activeCheck,userController.deleteAddress)

// Change user password
router
      .route('/change_password')
      .patch(middleware.loginCheck,middleware.activeCheck,userController.changePassword)

// Edit user profile
router
      .route('/edit_profile')
      .patch(middleware.loginCheck,middleware.activeCheck,userController.editProfile)

// Apply coupon code
router
      .route('/apply_coupon/:id')
      .get(middleware.loginCheck,middleware.activeCheck, userController.applyCoupon)

// Checkout page
router
      .route('/checkout')
      .get(middleware.loginCheck,middleware.activeCheck,userController.checkout)

// Place an order route
router
      .route('/place_order')
      .post(middleware.loginCheck,middleware.activeCheck,userController.placeOrder)

// Verify payment route
router
      .route('/verify_payment')
      .post(middleware.loginCheck,middleware.activeCheck,userController.verifyPayment)

// Payment failed page
router
      .route('/payment_failed')
      .get(middleware.loginCheck,middleware.activeCheck,userController.paymentFail)

// Order success page
router
      .route('/order_success')
      .get(middleware.loginCheck,middleware.activeCheck,userController.orderSuccess)

// Order details page
router
      .route('/order_details/:id')
      .get(middleware.loginCheck,middleware.activeCheck,userController.orderDetails)

// Cancel an order route
router
      .route('/cancel_order/:id')
      .delete(middleware.loginCheck,middleware.activeCheck,userController.cancelOrder)


module.exports = router;