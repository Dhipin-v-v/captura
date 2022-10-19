const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController')
const middleware = require('../middlewares/userMiddleware')

router
      .route('/test')
      .get(userController.testPage)

router
      .route('/')
      .get(middleware.activeCheck,userController.homepage)
      .post(userController.login)

router
      .route('/login')
      .get(userController.loginPage)

router
      .route('/signup')
      .get(userController.signupPage)

router
      .route('/signed_up')
      .post(userController.signedUp)

router
      .route('/account')
      .get(middleware.loginCheck,middleware.activeCheck,userController.account)

router
      .route('/logout')
      .get(userController.logout)

router
      .route('/verification')
      .post(userController.otp)

router
      .route('/checkOtp')
      .post(userController.checkOtp)

router
      .route('/product/:id')
      .get(middleware.activeCheck,userController.singleProduct)

router
      .route('/shop_by_category/:id')
      .get(middleware.activeCheck,userController.shopByCategory)

router
      .route('/cart')
      .get(middleware.loginCheck,middleware.activeCheck,userController.cart)

router
      .route('/add_to_cart/:id')
      .get(middleware.loginCheck,middleware.activeCheck,userController.addToCart)

router
      .route('/delete_from_cart/:id')
      .get(middleware.loginCheck,middleware.activeCheck,userController.deleteFromCart)
      
router
      .route('/cart_count')
      .get(userController.cartCount)
      .post(userController.updateCart)

router
      .route('/wishlist')
      .get(middleware.loginCheck,middleware.activeCheck,userController.wishlist)

router
      .route('/add_to_wishlist/:id')
      .get(middleware.loginCheck,middleware.activeCheck,userController.addToWishlist)

router
      .route('/delete_from_wishlist/:id')
      .get(middleware.loginCheck,middleware.activeCheck,userController.deleteFromWishlist)

router
      .route('/add_address')
      .post(middleware.loginCheck,middleware.activeCheck,userController.addAddress)

router
      .route('/delete_address/:id')
      .get(middleware.loginCheck,middleware.activeCheck,userController.deleteAddress)

router
      .route('/change_password')
      .post(middleware.loginCheck,middleware.activeCheck,userController.changePassword)

router
        .route('/edit_profile')
        .post(middleware.loginCheck,middleware.activeCheck,userController.editProfile)

router
      .route('/apply_coupon/:id')
      .get(middleware.loginCheck,middleware.activeCheck, userController.applyCoupon)

router
      .route('/checkout')
      .get(middleware.loginCheck,middleware.activeCheck,userController.checkout)

router
      .route('/place_order')
      .post(middleware.loginCheck,middleware.activeCheck,userController.placeOrder)

router
      .route('/verify_payment')
      .post(middleware.loginCheck,middleware.activeCheck,userController.verifyPayment)

router
      .route('/payment_failed')
      .get(middleware.loginCheck,middleware.activeCheck,userController.paymentFail)

router
      .route('/order_success')
      .get(middleware.loginCheck,middleware.activeCheck,userController.orderSuccess)

router
      .route('/order_details/:id')
      .get(middleware.loginCheck,middleware.activeCheck,userController.orderDetails)

router
      .route('/cancel_order/:id')
      .get(middleware.loginCheck,middleware.activeCheck,userController.cancelOrder)


module.exports = router;