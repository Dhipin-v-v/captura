const userModel = require('../models/userModel')
const productModel = require('../models/productModel')
const bcrypt = require('bcrypt');
const couponModel = require('../models/couponModel')

const client = require("twilio")(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)


// Signup a new user
exports.signup_user = (body) => {
    return new Promise(async (res, rej) => {
        const response = {};
        const userEmail = await userModel.findOne({ email: body.email })
        const userMobile = await userModel.findOne({ mobile: body.mobile })
        if (userEmail || userMobile) {
            response.status = true;
            // console.log("Data already present");
            res(response)
        }
        else {

            //Send OTP
            client.verify.v2
                .services(process.env.SERVICE_ID)
                .verifications.create({
                    to: `+91${body.mobile}`,
                    channel: "sms",
                }).then((verification) => console.log(verification.status))
            response.mobile = body.mobile
            body.password = await bcrypt.hash(body.password, 10)
            const user = new userModel(body)
            user.save()
                .then((response) => {
                    // console.log("User data saved sucessfully to database");
                    res(response)
                })
                .catch((err) => {
                    // console.log("User data not saved to database");
                    rej(err)
                })
        }
    })
}

// Checking whether the user exists in database or not
exports.login_check = (body) => {
    return new Promise(async (res, rej) => {
        const user = await userModel.findOne({ email: body.email })
        const response = {};
        if (user) {
            bcrypt.compare(body.password, user.password).then((status) => {
                if (status) {
                    if (user.verified) {
                        // console.log("Password matched");
                        response.status = true;
                        response.user = user;
                        res(response)
                    }
                    else {
                        client.verify.v2
                            .services(process.env.SERVICE_ID)
                            .verifications.create({
                                to: `+91${user.mobile}`,
                                channel: "sms",
                            }).then((verification) => console.log(verification.status))
                        response.re_verify = true
                        response.mobile = user.mobile
                        res(response)
                    }
                }
                else {
                    // console.log("Password not match");
                    res(response)
                }
            })
        }
        else {
            // console.log('Login failed');
            res(response)
        }
    })
}

//Verify entered otp
exports.otpCheck = (mobile, otp) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = {};
            const userData = await userModel.findOne({ mobile: mobile });

            client.verify.v2
                .services(process.env.SERVICE_ID)
                .verificationChecks.create({ to: "+91" + mobile, code: otp })
                .then(async (verification_check) => {
                    await userModel.updateOne({ mobile: mobile }, { verified: true });
                    // console.log(verification_check);
                    response.status = verification_check.valid;
                    response.user = userData;
                    resolve(response);
                })
                .catch((err) => {
                    // console.log(err);
                    response.failed = true;
                    resolve(response);
                });

        } catch (error) {
            reject(error)
        }
    });
}

//Get a specific user's details from database
exports.fetchUserDetails = (id) => {
    try {
        return new Promise(async (res, rej) => {
            const userDetails = await userModel.findById(id).lean()
            res(userDetails)
        })
    } catch (err) {
        rej(err)
    }
}

// Get all details of a specific product from database
exports.findSingleProduct = (id) => {
    return new Promise(async (res, rej) => {
        try {
            const productDetails = await productModel.findOne({ _id: id, active:true }).lean()
            res(productDetails);
        } catch (err) {
            rej(err)
        }
    })
}

// Find products under a specific category
exports.findProductsByCategory = (id) => {
    return new Promise(async (res, rej) => {
        try {
            const products = await productModel.find({ category: id, active:true }).populate('category').lean()
            res(products)
        } catch (err) {
            rej(err)
        }
    })
}

// Add new address to a user's data
exports.addAddress = (userId, address) => {
    return new Promise(async (res, rej) => {
        try {
            await userModel.findByIdAndUpdate({ _id: userId }, {
                $push: {
                    address: {
                        name: address.name,
                        house: address.house,
                        locality: address.locality,
                        area: address.area,
                        landmark: address.landmark,
                        pincode: address.pincode
                    }
                }
            })
            res(true)
        } catch (err) {
            rej(err)
        }
    })
}

// Get all addresses of a specific user
exports.getAllAddresses = (userId) => {
    return new Promise(async (res, rej) => {
        try {
            const address = (await userModel.findOne({ _id: userId }).lean()).address
            res(address)
        } catch (err) {
            rej(err)
        }
    })
}

// Delete specific address from a specific user
exports.deleteAddress = (userId, addressId) => {
    return new Promise(async (res, rej) => {
        try {
            await userModel.updateOne({ _id: userId }, {
                $pull: {
                    address: {
                        _id: addressId
                    }
                }
            })
            res(true)
        } catch (err) {
            rej(err)
        }
    })
}

// Change password of an existing user
exports.changePassword = (userId, body) => {
    const response = {}
    return new Promise(async (res, rej) => {
        try {
            const user = await userModel.findOne({ _id: userId })
            bcrypt.compare(body.current, user.password).then(async (status) => {
                if (status) {
                    const newPassword = await bcrypt.hash(body.new, 10)
                    await userModel.findOneAndUpdate({ _id: user._id }, { password: newPassword })
                    response.success = true
                    res(response)
                } else {
                    res(response)
                }
            }).catch(() => {
                response.err = true
                res(response)
            })
        } catch (err) {
            rej(err)
        }
    })
}

//Edit details of a specific user
exports.editProfile = (userId, body) => {
    try {
        return new Promise(async (res, rej) => {
            await userModel.findByIdAndUpdate({ _id: userId }, {
                $set: {
                    name: body.name,
                    email: body.email
                }
            })
            res(true)
        })
    } catch (err) {
        rej(err)
    }
}

// Check whether the coupon exists in database or not
exports.applyCoupon = (coupon) => {
    const response = {}
    return new Promise(async (res, rej) => {
        try {
            const couponExist = await couponModel.findOne({ code: coupon })
            if (couponExist){
                response.discount = couponExist.discount
            }
            res(response)           
        } catch (err) {
            rej(err)
        }
    })
}
