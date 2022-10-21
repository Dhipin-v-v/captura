const adminHelper = require('../helpers/adminHelper');
const orderHelper = require('../helpers/orderHelper')

// Admin login check
exports.login = (req, res) => {
    adminHelper.login_check(req.body).then((response) => {
        if (response.status) {
            req.session.adminLog = true;
            req.session.admin = response.admin
            // console.log('Admin session created');
            res.render('admin/homepage');
        }
        else {
            req.session.loginErr = true
            res.render('admin/admin_login', { loginErr: req.session.loginErr })
            req.session.loginErr = false
        }
    })
};

// Render admin login page
exports.homepage = (req, res) => {
    res.render('admin/homepage')
};

// Render user management page
exports.users = (req, res) => {
    adminHelper.userDetails().then((userData) => {
        res.render('admin/users', { userData });
    })
};

// Render product management page
exports.products = (req, res) => {
    adminHelper.getAllProducts().then((products) => {
        res.render('admin/products', { product: products });
    })
};

// Render category management page
exports.category = (req, res) => {
    adminHelper.getCategories().then((categories) => {
        res.render('admin/category', { categoryData: categories });
    })
};

// Add a new category to database
exports.addCategory = (req, res, next) => {
    adminHelper.addCategory(req.body).then((response) => {
        res.json(response);
    }).catch((err) => {
        next(err)
    })
}

// Render edit category page
exports.editCategory = (req, res, next) => {
    adminHelper.viewSingleCategory(req.params.id).then((category) => {
        res.render('admin/edit_category', { category: category })
    }).catch((err) => {
        next(err)
    })
}

// Delete a category
exports.deleteCategory = (req, res, next) => {
    adminHelper.deleteCategory(req.params.id).then((response) => {
        res.json(response)
    }).catch((err) => {
        next(err)
    })
}

// Update a category
exports.updateCategory = (req, res, next) => {
    adminHelper.updateCategory(req.body).then((response) => {
        res.json(response)
    }).catch((err) => {
        next(err)
    })
}

// Render coupon management page
exports.coupon = (req, res, next) => {
    adminHelper.getAllCoupons().then((couponData) => {
        res.render('admin/coupon', { coupon: couponData });
    }).catch((err) => {
        next(err)
    })
};

// Add a new coupon
exports.addCoupon = (req, res, next) => {
    adminHelper.addCoupon(req.body).then((response) => {
        res.json(response)
    }).catch((err) => {
        next(err)
    })
}

// Delete an existing coupon
exports.deleteCoupon = (req, res, next) => {
    adminHelper.deleteCoupon(req.params.id).then((response) => {
        res.json(response)
    }).catch((err) => {
        next(err)
    })
}

// Block a user
exports.block = (req, res) => {
    adminHelper.blockUser(req.params.user).then(() => {
        res.json(true)
    }).catch((err) => {
        next(err)
    })
};

// Unblock a user
exports.unblock = (req, res) => {
    adminHelper.unblockUser(req.params.user).then(() => {
        res.json(true)
    }).catch((err) => {
        next(err)
    })
};

// Admin logout
exports.logout = (req, res) => {
    req.session.adminLog = null
    req.session.admin = null
    req.session.loginErr = null
    // console.log('Admin session destroyed');
    res.redirect('/admin');
};

// Render add product page
exports.addProduct = (req, res, next) => {
    adminHelper.getCategories().then((categories) => {
        res.render('admin/add_single_product', { categoryData: categories });
    }).catch((err) => {
        next(err)
    })
}

// Add a new product
exports.addProductConfirm = (req, res, next) => {
    const imgs = req.files;
    let images = imgs.map((value) => value.filename)
    req.body.images = images;
    adminHelper.addProductConfirm(req.body).then(() => {
        res.redirect('/admin/products');
    }).catch((err) => {
        next(err)
    })
}

// Render edit single product page
exports.editProduct = (req, res) => {
    adminHelper.viewSingleProduct(req.params.id).then((response) => {
        const product = response.product
        const categoryData = response.categories
        res.render('admin/edit_single_product', { product, categoryData })
    }).catch((err) => {
        next(err)
    })
}

// Edit existing product
exports.updateProduct = (req, res, next) => {
    adminHelper.updateProduct(req.params.id, req.body).then(() => {
        res.redirect('/admin/products')
    }).catch((err) => {
        next(err)
    })
}

// Delete an existing product
exports.deleteProduct = (req, res, next) => {
    adminHelper.deleteProduct(req.params.id).then(() => {
        res.redirect('/admin/products')
    }).catch((err) => {
        next(err)
    })
}

// Render order management page
exports.orders = (req, res, next) => {
    adminHelper.viewAllOrders().then((orders) => {
        res.render('admin/orders', { orders })
    }).catch((err) => {
        next(err)
    })
}

// Render single order details
exports.orderDetails = (req, res, next) => {
    adminHelper.orderDetails(req.params.id).then((response) => {
        res.render('admin/order_details', { order: response.orderData, address: response.address })
    }).catch((err) => {
        next(err)
    })
}

// Change order status
exports.packOrder = (req, res, next) => {
    orderHelper.updateOrder(req.params.id, "Packed").then((response) => {
        res.json(response)
    }).catch((err) => {
        next(err)
    })
}

// Change order status
exports.shipOrder = (req, res, next) => {
    orderHelper.updateOrder(req.params.id, "Shipped").then((response) => {
        res.json(response)
    }).catch((err) => {
        next(err)
    })
}

// Change order status
exports.deliverOrder = (req, res, next) => {
    orderHelper.updateOrder(req.params.id, "Delivered").then(() => {
        orderHelper.updatePaymentStatus(req.params.id, "Paid").then((response) => {
            res.json(response)
        }).catch((err) => {
            next(err)
        })
    }).catch((err) => {
        next(err)
    })
}

// Get sales report
exports.salesReport = (req, res, next) => {
    adminHelper.salesReport().then((response) => {
        res.json(response)
    }).catch((err) => {
        next(err)
    })
}


