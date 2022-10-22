const userModel = require('../models/userModel');
const productModel = require('../models/productModel')


// Get user's cart data
exports.userCart = (userId) => {
    try {
        return new Promise(async (res, rej) => {
            // const cartData = await userModel.findOne({ _id: userId }).populate('cart.product').lean()
            const user = await userModel.findOne({ _id: userId }).populate('cart.product').lean()
            let total = 0;
            for (i = 0; i < (user.cart).length; i++) {
                total = total + (user.cart[i].quantity * user.cart[i].pricePerItem)
            }
            const cartData = {
                user: user,
                cartTotal: total
            }
            // console.log(cartData);
            res(cartData)
        })
    } catch (err) {
        rej(err)
    }
}

// Count number of products in the cart
exports.cartCount = (userId) => {
    return new Promise(async (res, rej) => {
        try {
            count = (await userModel.findOne({ _id: userId })).cart.length
            // console.log("cartcount:",count);
            res(count)
        } catch (err) {
            rej(err)
        }
    })
}

// Add a product to cart
exports.addToCart = (userId, productId) => {
    return new Promise(async (res, rej) => {
        try {
            const stock = (await productModel.findOne({ _id: productId })).stock
            const productExist = await userModel.findOne({ _id: userId, "cart.product": productId })
            if (productExist) {
                for (i = 0; i < productExist.cart.length; i++) {
                    if (productExist.cart[i].product == productId) {
                        var count = productExist.cart[i].quantity
                        break;
                    }
                }
                if (stock > count) {
                    await userModel.updateOne({ _id: userId, "cart.product": productId }, {
                        $inc: { "cart.$.quantity": 1 }
                    })
                    // console.log("existing product count incremented");
                } else {
                    await userModel.updateOne({ _id: userId, "cart.product": productId }, {
                        $set: { "cart.$.quantity": stock }
                    })
                }
                count = (await userModel.findOne({ _id: userId })).cart.length
                res(count);
            }
            else {
                const product = await productModel.findOne({ _id: productId })
                await userModel.findByIdAndUpdate({ _id: userId }, {
                    $push: {
                        cart: {
                            product: productId,
                            quantity: 1,
                            pricePerItem: product.selling
                        }
                    }
                })
                count = (await userModel.findOne({ _id: userId })).cart.length
                res(count);
            }
        } catch (err) {
            rej(err)
        }
    })
}

// Delete a product from cart
exports.deleteFromCart = (userId, productID) => {
    return new Promise(async (res, rej) => {
        try {
            await userModel.updateOne({ _id: userId }, {
                $pull: {
                    cart: {
                        product: productID
                    }
                }
            })
            const count = (await userModel.findOne({ _id: userId })).cart.length
            res(count)
        } catch (err) {
            rej(err)
        }
    })
}

// Update quality of a product in cart
exports.updateCart = (userId, update) => {
    return new Promise(async (res, rej) => {
        try {
            const response = {}
            const userDetails = await userModel.findOne({ _id: userId, "cart.product": update.productId })
            const productCount = userDetails.cart.length
            for (i = 0; i < productCount; i++) {
                let Id = userDetails.cart[i].product;
                if (Id == update.productId) {
                    quantity = userDetails.cart[i].quantity
                    break;
                }
            }
            if (!(quantity == 1 && update.change == -1)) {
                try {
                    let stock = (await productModel.findOne({ _id: update.productId }).lean()).stock
                    if ((stock <= quantity) && (update.change == 1)) {
                        response.maxStock = true
                    } else {
                        await userModel.updateOne({ _id: userId, "cart.product": update.productId }, {
                            $inc: { "cart.$.quantity": update.change }
                        })
                        response.success = true
                    }                   
                } catch (err) {
                    rej(err)
                }
            }
            res(response)
        } catch (err) {
            rej(err)
        }
    })
}