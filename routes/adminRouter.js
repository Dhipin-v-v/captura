const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/adminController')
const multerHelper = require('../helpers/multerHelper')
const middleware = require('../middlewares/adminMiddleware')

router
      .route('/')
      .get(middleware.loginCheck,adminController.homepage)
      .post(adminController.login)

router
      .route('/users')
      .get(middleware.loginCheck,adminController.users)

router
      .route('/products')
      .get(middleware.loginCheck,adminController.products)

router
      .route('/category')
      .get(adminController.category)
      .post(middleware.loginCheck,adminController.addCategory)

router
      .route('/edit_category/:id')
      .get(middleware.loginCheck,adminController.editCategory)

router
      .route('/update_category')
      .post(middleware.loginCheck,adminController.updateCategory)

router
      .route('/delete_category/:id')
      .get(middleware.loginCheck,adminController.deleteCategory)

router
      .route('/coupon')
      .get(middleware.loginCheck,adminController.coupon)

router
      .route('/add_coupon')
      .post(middleware.loginCheck,adminController.addCoupon)

router
      .route('/delete_coupon/:id')
      .get(middleware.loginCheck,adminController.deleteCoupon)

router
      .route('/block_user/:user')
      .get(middleware.loginCheck,adminController.block)

router
      .route('/unblock_user/:user')
      .get(middleware.loginCheck,adminController.unblock)

router
      .route('/logout')
      .get(middleware.loginCheck,adminController.logout)

router
      .route('/add_product')
      .get(adminController.addProduct)
      .post(multerHelper.uploadProductImages,middleware.loginCheck,adminController.addProductConfirm)

router
      .route('/edit_product/:id')
      .get(adminController.editProduct)
      .post(middleware.loginCheck,adminController.updateProduct)

router
      .route('/delete_product/:id')
      .get(middleware.loginCheck,adminController.deleteProduct)

router
      .route('/orders')
      .get(middleware.loginCheck,adminController.orders)


      
module.exports = router;