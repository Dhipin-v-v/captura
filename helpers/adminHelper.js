const userModel = require('../models/userModel')
const adminModel = require('../models/adminModel')
const categoryModel = require('../models/categoryModel')
const couponModel = require('../models/couponModel')
const bcrypt = require('bcrypt')
const multer = require('multer')
const productModel = require('../models/productModel')
const orderModel = require('../models/orderModel')

exports.userDetails = () => {
    return new Promise(async (res, rej) => {
        usersData = await userModel.find().lean()
        res(usersData);
    })
}

exports.blockUser = (id) => {
    return new Promise(async (res, rej) => {
        await userModel.findByIdAndUpdate({ _id: id }, { isActive: false })
        res();
    })
}

exports.unblockUser = (id) => {
    return new Promise(async (res, rej) => {
        await userModel.findByIdAndUpdate({ _id: id }, { isActive: true })
        res();
    })
}

// exports.addAdmin = (body) => {
//     return new Promise(async (res, rej) => {
//         body.password = await bcrypt.hash(body.password, 10)
//         const user = new adminModel(body)
//         user.save()
//             .then((response) => {
//                 console.log("User data saved sucessfully to admin database");
//                 res(response)
//             })
//             .catch((err) => {
//                 console.log("User data not saved to admin database");
//                 rej(err)
//             })
//     })
// }

exports.login_check = (body => {
    return new Promise(async (res, rej) => {
        const admin = await adminModel.findOne({ email: body.email })
        const response = {};
        if (admin) {
            bcrypt.compare(body.password, admin.password).then((status) => {
                if (status) {
                    console.log("Admin password matched");
                    response.status = true;
                    response.admin = admin;
                    res(response)
                }
                else {
                    console.log("Admin password not match");
                    res(response)
                }
            })
        }
        else {
            console.log('Admin Login failed');
            res(response)
        }
    })
})

exports.addCategory = (body) => {
    return new Promise(async(res, rej) => {
        categoryExists = await categoryModel.findOne({category: body.category}).lean()
        if(categoryExists){
            res(0)
        } else{
            const category = new categoryModel(body)
            category.save().then(() => {
                console.log("Category added to database");
                res(1)
            }).catch((err) => {
                console.log("Category not saved");
                rej(err)
            })
        }        
    })
}

exports.getCategories = () => {
    return new Promise(async (res, rej) => {
        const categoryData = await categoryModel.find().lean();
        res(categoryData);
    })
}

exports.viewSingleCategory = (id) => {
    return new Promise(async (res, rej) => {
        const category = await categoryModel.findOne({ _id: id }).lean()
        res(category)
    })
}

exports.updateCategory = (body) => {
    return new Promise(async (res, rej) => {
        const categoryExists = await categoryModel.findOne({category: body.categoryName}).lean()
        if(categoryExists){
            res(0)
        }else{
            await categoryModel.findByIdAndUpdate({ _id: body.categoryId }, { $set: { category: body.categoryName } })
            console.log("1");
            res(1);
        }
    })
}

exports.deleteCategory = (id) => {
    return new Promise(async (res, rej) => {
        try {
            categoryExist = await productModel.findOne({ category: id })
            if (categoryExist) {
                console.log("There are products in this category");
                res(0);
            } else {
                await categoryModel.findByIdAndDelete({ _id: id })
                res(1);
            }
        }catch (err) {
            rej(err)
        }
    })
}

exports.getAllCoupons = () => {
    return new Promise(async(res, rej) => {
        try {
           const coupons = await couponModel.find().lean()
           res(coupons)
        }catch(err) {
            rej(err)
        }
    })
}

exports.addCoupon = (body) => {
    return new Promise(async(res, rej) => {
        try {
            const couponExist = await couponModel.findOne({code: body.code})
            if(couponExist){
                res(0)
            } else{
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
            
        } catch(err) {
           rej(err) 
        }
    })
}

exports.deleteCoupon = (couponId) => {
    return new Promise(async(res, rej) => {
        try {
            await couponModel.findOneAndDelete({_id:couponId})
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
                console.log("Product added to database");
                res();
            }).catch((err) => {
                rej(err)
            })
        }
        catch (err) {
            console.log("Product not saved to database");
            rej(err)
        }
    })
})

exports.getAllProducts = () => {
    return new Promise(async (res, rej) => {
        try {
            const products = await productModel.find({active: true}).populate('category').lean()
            res(products)
        } catch (err) {
            console.log("Could not get products from database");
            rej(err)
        }
    })
}

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
            console.log("product updated sucessfully");
        } catch (err) {
            console.log("Could not update the product");
            rej(err)
        }
    })
}

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

exports.deleteProduct = (id) => {
    return new Promise(async (res, rej) => {
        try {
            await productModel.findOneAndUpdate({ _id: id },{
                $set:{
                    active: false
                }
            })
            console.log("Product deleted succesfully");
            res();
        } catch (err) {
            rej(err)
        }
    })
}

exports.viewAllOrders = () => {
    return new Promise(async(res, rej) => {
        try {
            const orders = await orderModel.find().populate('userId').lean()
            console.log(orders);
            res(orders)
        } catch (err) {
            rej(err)
        }
    })
}

