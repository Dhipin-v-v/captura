const productModel = require('../models/productModel')
const userModel = require('../models/userModel')

// Get wishlist data of specific user
exports.userWishlist = (userId) => {
    return new Promise(async (res, rej) => {
        try {
            const wishlist = await userModel.findById({ _id: userId }).populate('wishlist.product').lean()
            res(wishlist)
        } catch (err) {
            rej(err)
        }
    })
}

// Add a new product to wishlist
exports.addToWishlist = (userId, productId) => {
    return new Promise(async (res, rej) => {
        try {
            const productExist = await userModel.findOne({ _id: userId, "wishlist.product": productId })
            if (productExist) {
                await userModel.findByIdAndUpdate({ _id: userId }, {
                    $pull: {
                        wishlist: {
                            product: productId
                        }
                    }
                })
                res(0);
            } else {
                const product = await productModel.findById({ _id: productId })
                await userModel.findByIdAndUpdate({ _id: userId }, {
                    $push: {
                        wishlist: {
                            product: productId,
                            pricePerItem: product.selling
                        }
                    }
                })
                // console.log("Product added to wishlist");
                res(1);
            }
        } catch (err) {
            rej(err)
        }
    })
}

// Delete a product from wishlist
exports.deleteFromWishlist = (userId, productId) => {
    return new Promise(async(res,rej) => {
        try {
            await userModel.findByIdAndUpdate({ _id: userId },{
                $pull:{
                    wishlist:{
                        product: productId
                    }
                }
            })
            // console.log("Product removed from wishlist");
            res(true);
        } catch (err) {
            rej(err)
        }
    })
}