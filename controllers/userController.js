const userHelper = require('../helpers/userHelper')
const adminHelper = require('../helpers/adminHelper')
const cartHelper = require('../helpers/cartHelper')
const wishlistHelper = require('../helpers/wishlistHelper')
const orderHelper = require('../helpers/orderHelper')

//Goto homepage
exports.homepage = (req, res, next) => {
    adminHelper.getAllProducts().then((products) => {
        if (req.session.loggedIn) {
            res.render('users/homepage', { user: true, login: true, products: products });
        }
        else {
            res.render('users/homepage', { user: true, products: products });
        }
    }).catch((err) => {
        next(err)
    })
};


//Login check
exports.login = (req, res, next) => {
    userHelper.login_check(req.body).then((response) => {
        if (response.status) {
            req.session.loggedIn = true;
            req.session.user = response.user
            // console.log('Session created');
            res.redirect('/')
        }
        else if (response.re_verify) {
            req.session.mobile = response.mobile
            res.render('users/mobile_verification', { user: true });
        }
        else {
            req.session.wrongPassword = true
            res.render('users/login', { user: true, wrongPassword: req.session.wrongPassword })
            req.session.wrongPassword = false
        }
    }).catch((err) => {
        next(err)
    })
};


//Login page
exports.loginPage = (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
    }
    else
        res.render('users/login', { user: true });
};

//Signup page
exports.signupPage = (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
    }
    else
        res.render('users/signup', { user: true });
};

//Signup check
exports.signedUp = (req, res, next) => {
    if (req.body.password === req.body.rePassword) {
        userHelper.signup_user(req.body).then((response) => {
            req.session.mobile = response.mobile
            if (response.status) {
                req.session.status = response.status
                res.render('users/signup', { user: true, duplicateUser: req.session.status })
            }
            else {
                res.render('users/mobile_verification', { user: true });
            }
        }).catch((err) => {
            next(err)
        })
    } else {
        req.session.reEnteredIncorrect = true
        res.render('users/signup', { user: true, reEnteredIncorrect: req.session.reEnteredIncorrect })
        req.session.reEnteredIncorrect = false
    }
};

// Accounts page
exports.account = (req, res, next) => {
    userHelper.getAllAddresses(req.session.user._id).then((addresses) => {
        userHelper.fetchUserDetails(req.session.user._id).then((user) => {
            orderHelper.getAllOrders(req.session.user._id).then((orders) => {
                res.render('users/account', { user: true, login: true, address: addresses, user: user, orders: orders })
            })
        })
    }).catch((err) => {
        next(err)
    })
};

//Logout
exports.logout = (req, res) => {
    req.session.loggedIn = null
    req.session.user = null
    req.session.mobile = null
    req.session.wrongPassword = null
    req.session.status = null
    req.session.wrongOtp = null
    req.session.coupon = null
    req.session.orderId = null
    res.redirect('/');
};


// OTP verification page
exports.otp = (req, res) => {
    res.render('users/mobile_verification', { user: true });
};

// OTP check
exports.checkOtp = (req, res, next) => {
    const mobile = req.session.mobile
    const otp = req.body.otp
    userHelper.otpCheck(mobile, otp).then((response) => {
        if (response.status) {
            req.session.loggedIn = true;
            req.session.user = response.user
            res.redirect('/');
        }
        else {
            req.session.wrongOtp = true
            res.render('users/mobile_verification', { user: true, wrongOtp: req.session.wrongOtp })
            req.session.wrongOtp = false
        }
    }).catch((err) => {
        next(err)
    })
};

//Single product page
exports.singleProduct = (req, res, next) => {
    userHelper.findSingleProduct(req.params.id).then((productDetails) => {
        if (req.session.loggedIn) {
            res.render('users/single_product', { user: true, login: true, product: productDetails })
        } else {
            res.render('users/single_product', { user: true, product: productDetails })
        }
    }).catch((err) => {
        next(err)
    })
}

//Products list by category
exports.shopByCategory = (req, res, next) => {
    if (req.params.id == 1) {
        adminHelper.getCategories().then((categoryData) => {
            userHelper.findProductsByCategory(categoryData[0]._id).then((products) => {
                if (req.session.loggedIn) {
                    res.render('users/shop_by_category', { user: true, login: true, categories: categoryData, products: products })
                } else {
                    res.render('users/shop_by_category', { user: true, categories: categoryData, products: products })
                }
            })
        }).catch((err) => {
            next(err)
        })
    }

    else {
        userHelper.findProductsByCategory(req.params.id).then((products) => {
            adminHelper.getCategories().then((categoryData) => {
                if (req.session.loggedIn) {
                    res.render('users/shop_by_category', { user: true, login: true, categories: categoryData, products: products })
                } else {
                    res.render('users/shop_by_category', { user: true, categories: categoryData, products: products })
                }
            }).catch((err) => {
                next(err)
            })
        })
    }
}

// Cart page
exports.cart = (req, res, next) => {
    cartHelper.userCart(req.session.user._id).then((cartData) => {
        res.render('users/cart', { user: true, login: true, cart: cartData.user.cart, total: cartData.cartTotal })
    })
        .catch((err) => {
            next(err)
        })
}

// Add product to cart
exports.addToCart = (req, res, next) => {
    cartHelper.addToCart(req.session.user._id, req.params.id).then((count) => {
        res.json(count)
    }).catch((err) => {
        next(err)
    })
}

// Delete product from cart
exports.deleteFromCart = (req, res, next) => {
    cartHelper.deleteFromCart(req.session.user._id, req.params.id).then((response) => {
        // console.log("product deleted from cart");
        res.json(response)
    }).catch((err) => {
        next(err)
    })
}

//  Get cart count
exports.cartCount = (req, res, next) => {
    cartHelper.cartCount(req.session.user._id).then((count) => {
        res.json(count)
    }).catch((err) => {
        next(err)
    })
}

// Cart count increment or decrement
exports.updateCart = (req, res, next) => {
    cartHelper.updateCart(req.session.user._id, req.body).then((quantity) => {
        res.json(quantity)
    }).catch((err) => {
        next(err)
    })
}

// Wishlist page
exports.wishlist = (req, res, next) => {
    wishlistHelper.userWishlist(req.session.user._id).then((wishlistData) => {
        res.render('users/wishlist', { user: true, login: true, data: wishlistData.wishlist })
    }).catch((err) => {
        next(err)
    })
}

// Add product to wishlist
exports.addToWishlist = (req, res, next) => {
    wishlistHelper.addToWishlist(req.session.user._id, req.params.id).then((data) => {
        res.json(data);
    }).catch((err) => {
        next(err)
    })
}

// Delete product from wishlist
exports.deleteFromWishlist = (req, res, next) => {
    wishlistHelper.deleteFromWishlist(req.session.user._id, req.params.id).then((data) => {
        res.json(data);
    }).catch((err) => {
        next(err)
    })
}

// Add new address
exports.addAddress = (req, res, next) => {
    userHelper.addAddress(req.session.user._id, req.body).then((data) => {
        res.json(data);
    }).catch((err) => {
        next(err)
    })
}

// Delete existing address
exports.deleteAddress = (req, res, next) => {
    userHelper.deleteAddress(req.session.user._id, req.params.id).then((data) => {
        res.json(data)
    }).catch((err) => {
        next(err)
    })
}

// Change password
exports.changePassword = (req, res, next) => {
    userHelper.changePassword(req.session.user._id, req.body).then((response) => {
        res.json(response)
    }).catch((err) => {
        next(err)
    })
}

// Edit user profile
exports.editProfile = (req, res, next) => {
    userHelper.editProfile(req.session.user._id, req.body).then((response) => {
        res.json(response)
    }).catch((err) => {
        next(err)
    })
}

//  Apply coupon code
exports.applyCoupon = (req, res, next) => {
    const response = {}
    userHelper.applyCoupon(req.params.id).then((couponResponse) => {
        if (couponResponse.discount) {
            cartHelper.userCart(req.session.user._id).then((cartResponse) => {
                response.cartTotal = (cartResponse.cartTotal)
                response.discount = couponResponse.discount
                const coupon = {
                    discountPercent: response.discount,
                    couponCode: req.params.id
                }
                req.session.coupon = coupon
                res.json(response)
            }).catch((err) => {
                next(err)
            })
        } else {
            req.session.coupon = false
            res.json(response)
        }
    })
}

// Checkout page
exports.checkout = (req, res, next) => {
    userHelper.getAllAddresses(req.session.user._id).then((addresses) => {
        cartHelper.userCart(req.session.user._id).then((cartData) => {
            if (cartData.cartTotal == 0) {
                res.redirect('/cart')
            } else {
                res.render('users/checkout', { user: true, login: true, cart: cartData.user.cart, total: cartData.cartTotal, address: addresses })
            }
        }).catch((err) => {
            next(err)
        })
    }).catch((err) => {
        next(err)
    })
}

// Order success page
exports.orderSuccess = (req, res) => {
    if (req.session.orderId) {
        res.render('users/order_success', { user: true, login: true, order: req.session.orderId })
        req.session.orderId = false
        req.session.coupon = null
    }
}

// Payment failed page
exports.paymentFail = (req, res, next) => {
    orderHelper.updatePaymentStatus(req.session.orderId, "Failed").then(() => {
        orderHelper.updateOrder(req.session.orderId, "Failed").then(() => {
            req.session.coupon = null
            res.render('users/payment_failed', { user: true, login: true })
        }).catch((err) => {
            next(err)
        })
    }).catch((err) => {
        next(err)
    })
}

// Place an order
exports.placeOrder = (req, res, next) => {
    if (req.body.payment === 'cod') {
        orderHelper.placeOrder(req.body, req.session.user._id, req.session.coupon).then((response) => {
            req.session.orderId = response
            res.json({ cod: true });
        }).catch((err) => {
            next(err)
        })
    } else if (req.body.payment == 'prepaid') {
        orderHelper.placeOrder(req.body, req.session.user._id, req.session.coupon).then((response) => {
            orderHelper.generateRazorpay(response, req.session.user._id).then((order) => {
                req.session.orderId = response
                res.json(order)
            })
        }).catch((err) => {
            next(err)
        })
    }
}

// verify payment
exports.verifyPayment = (req, res, next) => {
    // console.log(req.body);
    orderHelper.verifyPayment(req.body).then(() => {
        orderHelper.changeOrderStatus(req.session.orderId, req.session.user._id).then(() => {
            res.json(true)
        }).catch((err) => {
            next(err)
        })
    }).catch((err) => {
        res.render('users/payment_failed', { user: true, login: true })
    })
}

// Single order details page
exports.orderDetails = (req, res, next) => {
    orderHelper.orderDetails(req.params.id, req.session.user._id).then((response) => {
        res.render('users/order_details', { user: true, login: true, order: response.orderData, address: response.address })
    }).catch((err) => {
        next(err)
    })
}

// Cancel an order
exports.cancelOrder = (req, res, next) => {
    orderHelper.updateOrder(req.params.id, "cancelled").then((response) => {
        res.json(response)
    }).catch((err) => {
        next(err)
    })
}








