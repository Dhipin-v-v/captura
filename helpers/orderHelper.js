const userModel = require('../models/userModel')
const productModel = require('../models/productModel')
const orderModel = require('../models/orderModel')
const Razorpay = require('razorpay')

// Razorpay instance
var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.SECRET_KEY,
})

// Insert order data to database
exports.placeOrder = (body, userId, couponData) => {
  const paymentMode = body.payment == 'cod' ? 'Cash On Delivery' : 'Pre-paid'
  const paymentStatus = body.payment == 'cod' ? 'In progress' : 'Pending'
  const addressId = body.addressId
  let date = new Date()
  date = date.toUTCString()
  date = date.slice(5, 16)
  let discount, coupon
  return new Promise(async (res, rej) => {
    const user = await userModel.findOne({ _id: userId }).lean()
    const cartData = user.cart
    for (let i = 0; i < user.address.length; i++) {
      if (user.address[i]._id == addressId) {
        var address = user.address[i]
        break
      }
    }

    let subtotal = 0
    for (let i = 0; i < cartData.length; i++) {
      subtotal = subtotal + cartData[i].pricePerItem * cartData[i].quantity
    }

    if (couponData) {
      discount = (couponData.discountPercent / 100) * subtotal
      discount = Math.floor(discount)
      coupon = couponData.couponCode
    } else {
      discount = 0
      coupon = '-'
    }

    const orderObj = {
      userId: userId,
      products: cartData,
      subtotal: subtotal,
      coupon: coupon,
      discount: discount,
      net: subtotal - discount + 50,
      paymentMethod: paymentMode,
      paymentStatus: paymentStatus,
      address: address,
      orderStatus: 'Placed',
      date: date,
    }

    const order = new orderModel(orderObj)
    order.save().then(async (response) => {
      if (body.payment == 'cod') {
        await userModel.findByIdAndUpdate(
          { _id: userId },
          {
            $pull: {
              cart: {},
              multi: true,
            },
          }
        )
      }
      res(response._id)
    })
  })
}

// Get details of every orders
exports.getAllOrders = (userId) => {
  return new Promise(async (res, rej) => {
    try {
      const orders = await orderModel
        .find({ userId: userId })
        .sort({ createdAt: -1 })
        .lean()
      res(orders)
    } catch (err) {
      rej(err)
    }
  })
}

// Get details of a specific order
exports.orderDetails = (orderId, userId) => {
  return new Promise(async (res, rej) => {
    try {
      const response = {}
      const user = await userModel.findOne({ _id: userId }).lean()
      response.orderData = await orderModel
        .findOne({ _id: orderId })
        .populate('products.product')
        .lean()
      const addressIdFromOrder = response.orderData.address.toString()
      for (let i = 0; i < user.address.length; i++) {
        if (user.address[i]._id == addressIdFromOrder) {
          response.address = user.address[i]
          break
        }
      }
      res(response)
    } catch (err) {
      rej(err)
    }
  })
}

// Generate razorpay for the given amount
exports.generateRazorpay = (orderId, userId) => {
  return new Promise(async (res, rej) => {
    try {
      const order = await orderModel.findOne({ _id: orderId }).lean()
      const amount = order.net
      var options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: 'INR',
        receipt: orderId.toString(),
      }
      instance.orders.create(options, (err, order) => {
        if(order){
            order.key = process.env.KEY_ID
            res(order)
        }
      })
    } catch (err) {
      rej(err)
    }
  })
}

// Razorpay verification
exports.verifyPayment = (paymentDetails) => {
  return new Promise((res, rej) => {
    try {
      const crypto = require('crypto')
      let expectedSignature = crypto.createHmac(
        'sha256',
        process.env.SECRET_KEY
      )
      expectedSignature.update(
        paymentDetails['payment[razorpay_order_id]'] +
          '|' +
          paymentDetails['payment[razorpay_payment_id]']
      )
      expectedSignature = expectedSignature.digest('hex')
      if (expectedSignature == paymentDetails['payment[razorpay_signature]']) {
        res()
      } else {
        rej()
      }
    } catch (err) {
      rej(err)
    }
  })
}

// Change payment status and delete the product from cart
exports.changeOrderStatus = (orderId, userId) => {
  return new Promise(async (res, rej) => {
    try {
      await orderModel.updateOne(
        { _id: orderId },
        {
          $set: {
            paymentStatus: 'Paid',
          },
        }
      )
      //Pull from cart
      await userModel.findByIdAndUpdate(
        { _id: userId },
        {
          $pull: {
            cart: {},
            multi: true,
          },
        }
      )
      res()
    } catch (err) {
      rej(err)
    }
  })
}

// Change payment status of the order
exports.updatePaymentStatus = (orderId, status) => {
  return new Promise(async (res, rej) => {
    try {
      await orderModel.findByIdAndUpdate(
        { _id: orderId },
        {
          $set: {
            paymentStatus: status,
          },
        }
      )
      res(true)
    } catch (err) {
      rej(err)
    }
  })
}

// Change order status
exports.updateOrder = (orderId, status) => {
  return new Promise(async (res, rej) => {
    try {
      await orderModel.findByIdAndUpdate(
        { _id: orderId },
        {
          $set: {
            orderStatus: status,
          },
        }
      )
      res(true)
    } catch (err) {
      rej(err)
    }
  })
}
