const userModel = require('../models/userModel')
const adminModel = require('../models/adminModel')
const categoryModel = require('../models/categoryModel')
const couponModel = require('../models/couponModel')
const bcrypt = require('bcrypt')
const multer = require('multer')
const productModel = require('../models/productModel')
const orderModel = require('../models/orderModel')
const Order = require('../models/orderModel')

// Get details of a all users
exports.userDetails = () => {
    return new Promise(async (res, rej) => {
        usersData = await userModel.find().lean()
        res(usersData);
    })
}

// Block a specific user
exports.blockUser = (id) => {
    return new Promise(async (res, rej) => {
        await userModel.findByIdAndUpdate({ _id: id }, { isActive: false })
        res();
    })
}

// unblock a specific user
exports.unblockUser = (id) => {
    return new Promise(async (res, rej) => {
        await userModel.findByIdAndUpdate({ _id: id }, { isActive: true })
        res();
    })
}

// Admin login check
exports.login_check = (body => {
    return new Promise(async (res, rej) => {
        const admin = await adminModel.findOne({ email: body.email })
        const response = {};
        if (admin) {
            bcrypt.compare(body.password, admin.password).then((status) => {
                if (status) {
                    // console.log("Admin password matched");
                    response.status = true;
                    response.admin = admin;
                    res(response)
                }
                else {
                    // console.log("Admin password not match");
                    res(response)
                }
            })
        }
        else {
            // console.log('Admin Login failed');
            res(response)
        }
    })
})

// Add a new category to database
exports.addCategory = (body) => {
    return new Promise(async (res, rej) => {
        categoryExists = await categoryModel.findOne({ category: body.category }).lean()
        if (categoryExists) {
            res(0)
        } else {
            const category = new categoryModel(body)
            category.save().then(() => {
                // console.log("Category added to database");
                res(1)
            }).catch((err) => {
                // console.log("Category not saved");
                rej(err)
            })
        }
    })
}

// Get all categories data
exports.getCategories = () => {
    return new Promise(async (res, rej) => {
        const categoryData = await categoryModel.find().lean();
        res(categoryData);
    })
}

// Find a single category
exports.viewSingleCategory = (id) => {
    return new Promise(async (res, rej) => {
        const category = await categoryModel.findOne({ _id: id }).lean()
        res(category)
    })
}

// Update a specific category
exports.updateCategory = (body) => {
    return new Promise(async (res, rej) => {
        const categoryExists = await categoryModel.findOne({ category: body.categoryName }).lean()
        if (categoryExists) {
            res(0)
        } else {
            await categoryModel.findByIdAndUpdate({ _id: body.categoryId }, { $set: { category: body.categoryName } })
            // console.log("1");
            res(1);
        }
    })
}

// Delete a specific category
exports.deleteCategory = (id) => {
    return new Promise(async (res, rej) => {
        try {
            categoryExist = await productModel.findOne({ category: id })
            if (categoryExist) {
                // console.log("There are products in this category");
                res(0);
            } else {
                await categoryModel.findByIdAndDelete({ _id: id })
                res(1);
            }
        } catch (err) {
            rej(err)
        }
    })
}

// Get all coupons
exports.getAllCoupons = () => {
    return new Promise(async (res, rej) => {
        try {
            const coupons = await couponModel.find().lean()
            res(coupons)
        } catch (err) {
            rej(err)
        }
    })
}

// Add a new coupon to database
exports.addCoupon = (body) => {
    return new Promise(async (res, rej) => {
        try {
            const couponExist = await couponModel.findOne({ code: body.code })
            if (couponExist) {
                res(0)
            } else {
                const couponObj = {
                    code: body.code,
                    discount: body.discount
                }
                const coupon = new couponModel(couponObj)
                coupon.save().then(() => {
                    res(1)
                }).catch((err) => {
                    rej(err)
                })
            }

        } catch (err) {
            rej(err)
        }
    })
}

// Delete a single coupon
exports.deleteCoupon = (couponId) => {
    return new Promise(async (res, rej) => {
        try {
            await couponModel.findOneAndDelete({ _id: couponId })
            res(true)
        } catch (err) {
            rej(err)
        }
    })
}

//CONFIGURATION OF MULTER
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/products");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `products-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

//MULTER FILTER
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpg" || "jpeg" || "png" || "webp") {
        cb(null, true);
    } else {
        cb(new Error("File format not supported"), false);
    }
};

//CALLING THE MULTER FUNCTION
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});
exports.uploadProductsImgs = upload.array("images", 3);

exports.addProductConfirm = ((body) => {
    return new Promise((res, rej) => {
        try {
            const productData = {
                name: body.name,
                details: body.details,
                brand: body.brand,
                category: body.category,
                actual: body.actual,
                selling: body.selling,
                stock: body.stock,
                images: body.images
            }
            const product = new productModel(productData)
            product.save().then(() => {
                // console.log("Product added to database");
                res();
            }).catch((err) => {
                rej(err)
            })
        }
        catch (err) {
            // console.log("Product not saved to database");
            rej(err)
        }
    })
})

// Get details of every product
exports.getAllProducts = () => {
    return new Promise(async (res, rej) => {
        try {
            const products = await productModel.find({ active: true }).populate('category').lean()
            res(products)
        } catch (err) {
            // console.log("Could not get products from database");
            rej(err)
        }
    })
}

// Update a single product
exports.updateProduct = (id, body) => {
    return new Promise(async (res, rej) => {
        try {
            await productModel.findByIdAndUpdate({ _id: id },
                {
                    $set: {
                        name: body.name,
                        details: body.details,
                        brand: body.brand,
                        category: body.category,
                        actual: body.actual,
                        selling: body.selling,
                        stock: body.stock
                    }
                })
            res();
            // console.log("product updated sucessfully");
        } catch (err) {
            // console.log("Could not update the product");
            rej(err)
        }
    })
}

// get single product's details from database
exports.viewSingleProduct = (id) => {
    return new Promise(async (res, rej) => {
        try {
            const response = {}
            const allCategories = await categoryModel.find().lean();
            const product = await productModel.findOne({ _id: id }).populate('category').lean()
            response.categories = allCategories;
            response.product = product;
            res(response)
        } catch (err) {
            rej(err)
        }
    })
}

// delete a specific product
exports.deleteProduct = (id) => {
    return new Promise(async (res, rej) => {
        try {
            await productModel.findOneAndUpdate({ _id: id }, {
                $set: {
                    active: false
                }
            })
            // console.log("Product deleted succesfully");
            res();
        } catch (err) {
            rej(err)
        }
    })
}

// Get details of every orders in database
exports.viewAllOrders = () => {
    return new Promise(async (res, rej) => {
        try {
            const orders = await orderModel.find().populate('userId').lean()
            res(orders)
        } catch (err) {
            rej(err)
        }
    })
}

// Get details of a specific order
exports.orderDetails = (orderId) => {
    return new Promise(async (res, rej) => {
        try {
            const response = {}
            const userId = (await orderModel.findOne({ _id: orderId })).userId
            const user = await userModel.findOne({ _id: userId }).lean()
            response.orderData = await orderModel.findOne({ _id: orderId }).populate("products.product").lean()
            const addressIdFromOrder = response.orderData.address.toString()
            for (let i = 0; i < user.address.length; i++) {
                if (user.address[i]._id == addressIdFromOrder) {
                    response.address = user.address[i];
                    break;
                }
            }
            res(response)
        } catch (err) {
            rej(err)
        }
    })
}

// Get sales report
exports.salesReport = () => {
    return new Promise(async (res, rej) => {
        try {
            const noOfUsers = await userModel.countDocuments();
            const noOfProducts = await productModel.countDocuments();
            const noOfOrders = await orderModel.find({ orderStatus: "Delivered" }).countDocuments()
            let totalProfit = 0;
            const ordersData = await orderModel.find({ paymentStatus: "Paid" });
            for (let i = 0; i < noOfOrders; i++) {
                ordersData.map((val) => {
                    totalProfit = val.net + totalProfit;
                });
            }
            totalProfit = totalProfit.toString().slice(0, 11)
            let dateList = [];
            for (let i = 0; i < 10; i++) {
                let d = new Date();
                d.setDate(d.getDate() - i);
                let newDate = d.toUTCString();
                newDate = newDate.slice(5, 16);
                dateList[i] = newDate;
            }
            let dateSales = [];
            for (let i = 0; i < 10; i++) {
                dateSales[i] = await orderModel.find({ date: dateList[i] }).lean().count();
            }
            const response = {
                dateSales: dateSales,
                dateList: dateList,
                noOfUsers: noOfUsers,
                noOfProducts: noOfProducts,
                noOfOrders: noOfOrders,
                totalProfit: totalProfit,
            }
            res(response)
        } catch (err) {
            rej(err)
        }
    })
}

