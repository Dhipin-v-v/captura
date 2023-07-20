const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/adminController')
const multerHelper = require('../helpers/multerHelper')
const middleware = require('../middlewares/adminMiddleware')

// Admin login page
router
      .route('/')
      .get(middleware.loginCheck,adminController.homepage)
      .post(adminController.login)

//  User management page
router
      .route('/users')
      .get(middleware.loginCheck,adminController.users)

// Product management page
router
      .route('/products')
      .get(middleware.loginCheck,adminController.products)

// Category management page
router
      .route('/category')
      .get(adminController.category)
      .post(middleware.loginCheck,adminController.addCategory)

// Edit category page
router
      .route('/edit_category/:id')
      .get(middleware.loginCheck,adminController.editCategory)

// Update category route
router
      .route('/update_category')
      .put(middleware.loginCheck,adminController.updateCategory)

// Delete category route
router
      .route('/delete_category/:id')
      .delete(middleware.loginCheck,adminController.deleteCategory)

// Coupon management page
router
      .route('/coupon')
      .get(middleware.loginCheck,adminController.coupon)

// Add coupon route
router
      .route('/add_coupon')
      .post(middleware.loginCheck,adminController.addCoupon)

// Delete coupon route
router
      .route('/delete_coupon/:id')
      .delete(middleware.loginCheck,adminController.deleteCoupon)

// Block user route
router
      .route('/block_user/:user')
      .put(middleware.loginCheck,adminController.block)

// Unblock user route
router
      .route('/unblock_user/:user')
      .put(middleware.loginCheck,adminController.unblock)

// Admin logout
router
      .route('/logout')
      .get(middleware.loginCheck,adminController.logout)

// Add a product
router
      .route('/add_product')
      .get(adminController.addProduct)
      .post(multerHelper.uploadProductImages,middleware.loginCheck,adminController.addProductConfirm)

// Edit a product
router
      .route('/edit_product/:id')
      .get(adminController.editProduct)
      .post(middleware.loginCheck,adminController.updateProduct)

// Delete a product
router
      .route('/delete_product/:id')
      .patch(middleware.loginCheck,adminController.deleteProduct)

// Order management page
router
      .route('/orders')
      .get(middleware.loginCheck,adminController.orders)

// Change order status to "Packed"
router
      .route('/pack_order/:id')
      .patch(middleware.loginCheck,adminController.packOrder)

// Change order status to "Shipped"
router
      .route('/ship_order/:id')
      .patch(middleware.loginCheck,adminController.shipOrder)

// Change order status to "Delivered"
router
      .route('/deliver_order/:id')
      .patch(middleware.loginCheck,adminController.deliverOrder)

// Get order details
router
      .route('/order_details/:id')
      .get(middleware.loginCheck,adminController.orderDetails)

// Get sales report
router
      .route('/sales-report')
      .get(middleware.loginCheck,adminController.salesReport)


module.exports = router;