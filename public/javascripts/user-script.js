document.addEventListener('DOMContentLoaded', cartCount)
function cartCount() {
    $.ajax({
        url: '/cart_count',
        method: 'get',
        success: (res) => {
            document.getElementById('cart-count').innerHTML = res
        },
        error: (err) => {
        }
    })
}

function addToCart(id) {
    $.ajax({
        url: '/add_to_cart/' + id,
        method: 'put',
        success: (res) => {
            swal({
                title: 'Added to cart',
                button: false,
                icon: "success",
                timer: 1000
            });
            document.getElementById('cart-count').innerHTML = res
        }, error: (err) => {

        }
    })
}


function deleteCartItem(id) {

    swal({
        title: "Are you sure?",
        text: "The product will be removed from your cart",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: '/delete_from_cart/' + id,
                    method: 'delete',
                    success: (res) => {
                        document.getElementById('cart-count').innerHTML = res
                        $("#refreshh").load(location.href + " #refreshh")
                    }, error: (err) => {

                    }
                })
            }
        });
}

function changeQuantity(id, change) {
    $.ajax({
        data: {
            productId: id,
            change: change,
        },
        url: '/cart_count',
        method: 'put',
        success: (res) => {
            if (res.success)
                $("#refreshh").load(location.href + " #refreshh")
            if (res.maxStock) {
                swal({
                    title: 'Maximum stock reached',
                    icon: "info",
                    button: false,
                    timer: 1000
                })
                $("#refreshh").load(location.href + " #refreshh")
            }
        }, error: (err) => {

        }
    })
}

function addToWishlist(id) {
    $.ajax({
        url: '/add_to_wishlist/' + id,
        method: 'put',
        success: (res) => {
            if (res == 1) {
                swal({
                    title: 'Added to wishlist',
                    icon: "success",
                    button: false,
                    timer: 1000
                });
            }
            else {
                swal({
                    title: 'Removed from wishlist',
                    icon: "success",
                    button: false,
                    timer: 1000
                });
            }
        }
    })
}

function deleteFromWishlist(id) {
    $.ajax({
        url: '/delete_from_wishlist/' + id,
        method: 'delete',
        success: (res) => {
            $("#wish-refresh").load(location.href + " #wish-refresh")
        }
    })
}

function addAddress() {
    const name = document.getElementById('form-name').value
    const house = document.getElementById('form-house').value
    const locality = document.getElementById('form-locality').value
    const area = document.getElementById('form-area').value
    const landmark = document.getElementById('form-landmark').value
    const pincode = document.getElementById('form-pincode').value

    if (name && house && locality && area && landmark && pincode) {
        $.ajax({
            data: {
                name: name,
                house: house,
                locality: locality,
                area: area,
                landmark: landmark,
                pincode: pincode
            },
            url: '/add_address',
            method: 'post',
            success: (res) => {
                // $('#closemodal').click(function () {
                //     $('#addAddressModal').modal('hide');
                // });
                document.getElementById("addressForm").reset();
                swal({
                    title: 'New address added',
                    button: false,
                    timer: 1000,
                    icon: "success",
                })
                $("#address-refresh").load(location.href + " #address-refresh")
            }
        })
    }
}


function deleteAddress(addressId) {
    swal({
        title: "Delete address?",
        text: "This saved address will be removed from your account permanently",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: '/delete_address/' + addressId,
                method: 'delete',
                success: (res) => {
                    $("#address-refresh").load(location.href + " #address-refresh")
                }
            })
        }
    });
}

function selectAddress(addressId) {
    document.getElementById('hiddenAddress').value = addressId
}

function applyCoupon() {
    const enteredCoupon = document.getElementById('entered-coupon').value
    if (enteredCoupon) {
        $.ajax({
            url: '/apply_coupon/' + enteredCoupon,
            method: 'get',
            success: (res) => {
                // console.log(res);
                if (res.discount) {
                    let discount = res.cartTotal * (res.discount / 100)
                    let cartTotal = (res.cartTotal - discount) + 50
                    document.getElementById('display-coupon').innerHTML = `${enteredCoupon} <span id="applied" style="font-weight: normal">applied ✅</span>`
                    document.getElementById('discount-change').innerHTML = `₹${discount}.00`
                    document.getElementById('total-change').innerHTML = `₹${cartTotal}.00`
                } else {
                    // console.log(res);
                    document.getElementById('display-coupon').innerHTML = ` invalid coupon ❌`
                    $("#order-area-refresh").load(location.href + " #order-area-refresh")
                }
            }
        })
    }
}



function placeOrder() {

    const buttons = document.getElementsByClassName('input-radio')
    const addressButtons = document.getElementsByClassName('form-check-input')

    let addressTicked;
    for (const addressButton of addressButtons) {
        if (addressButton.checked) {
            addressTicked = addressButton.value;
        }
    }

    let methodTicked;
    for (const button of buttons) {
        if (button.checked) {
            methodTicked = button.value;
            break;
        }
    }
    const selectedAddress = document.getElementById('hiddenAddress').value

    if (methodTicked && addressTicked) {
        $.ajax({
            data: {
                payment: methodTicked,
                addressId: selectedAddress
            },
            url: '/place_order',
            method: 'post',
            success: (res) => {
                if (res.cod) {
                    location.href = '/order_success'
                } else {
                    razorpayPayment(res);
                }
            }
        })
    } else {
        if (!methodTicked && !addressTicked) {
            swal({
                title: "Choose address and payment mode",
                icon: "warning",
            });
        }
        else if (!methodTicked && addressTicked) {
            swal({
                title: "Choose payment mode",
                icon: "warning",
            })
        }
        else if (!addressTicked && methodTicked) {
            swal({
                title: "Choose an address",
                icon: "warning",
            })
        }
    }
}

function razorpayPayment(order) {
    var options = {
        "key": order.key, // Enter the Key ID generated from the Dashboard
        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Captura",
        "description": "Test Transaction",
        "image": "/images/captura_logo.png",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            verifyPayment(response, order)
        },
        "prefill": {
            "name": "Test name",
            "email": "testemail@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Test address"
        },
        "theme": {
            "color": "#E73C17"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        location.href = '/payment_failed'
    });
    rzp1.open();
}

function verifyPayment(payment, order) {
    $.ajax({
        url: '/verify_payment',
        data: {
            payment,
            order
        },
        method: 'post',
        success: (res) => {
            location.href = '/order_success'
        }
    })
}

function cancelOrder(orderId) {
    swal({
        title: "Cancel this order ?",
        text: "Once cancelled, you cannot undo the cancel",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willCancel) => {
        if (willCancel) {
            $.ajax({ 
                url: '/cancel_order/' + orderId,
                method: 'delete',
                success: (res) => {
                    swal({
                        title: 'Order cancelled',
                        button: false,
                        timer: 1000,
                        icon: "success",
                    })
                    $("#cancel-refresh").load(location.href + " #cancel-refresh")
                }
            })
        }
      });
}

function changePassword() {
    const oldPassword = document.getElementById('current-pwd').value
    const newPassword = document.getElementById('new-pwd').value
    const confirmPassword = document.getElementById('confirm-pwd').value

    $.ajax({
        data: {
            current: oldPassword,
            new: newPassword,
            reEntered: confirmPassword
        },
        url: '/change_password',
        method: 'patch',
        success: (res) => {
            if (res.success) {
                swal({
                    title: 'Password changed successfully',
                    icon: "success",
                    button: false,
                    timer: 1000
                })
            } else {
                document.getElementById('message1').innerHTML = 'Wrong password entered'
                setTimeout(() => {
                    $("#current-pwd").load(location.href + " #current-pwd")
                }, 1000)
            }
            if (res.err) {
                swal({
                    title: 'Error occured',
                    icon: "info",
                    button: false,
                    timer: 1000
                })
            }
        }
    })
}

function editProfile() {
    const name = document.getElementById('profile-name').value
    const email = document.getElementById('profile-email').value
    $.ajax({
        data: {
            name: name,
            email: email
        },
        url: '/edit_profile',
        method: 'patch',
        success: (res) => {
            swal({
                title: 'Profile updated successfully',
                icon: "success",
                button: false,
                timer: 1000
            })
            $("#dashboad").load(location.href + " #dashboad")
        }
    })
}