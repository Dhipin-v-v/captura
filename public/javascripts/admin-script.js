function deleteProduct(productId) {
    swal({
        title: "Delete this product ?",
        text: "Once deleted, you cannot undo the cancel",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: '/admin/delete_product/' + productId,
                    method: 'patch',
                    success: (res) => {
                        swal({
                            title: 'Product deleted',
                            button: false,
                            timer: 1000,
                            icon: "success",
                        })
                        $("#product-table-refresh").load(location.href + " #product-table-refresh")
                    }
                })
            }
        });
}


function deleteCategory(categoryId) {
    $.ajax({
        url: '/admin/delete_category/' + categoryId,
        method: 'delete',
        success: (response) => {
            if (response == 1) {
                swal({
                    title: 'Category deleted successfully',
                    button: false,
                    icon: "success",
                    timer: 1000
                });
                $("#refreshh").load(location.href + " #refreshh")
            } else {
                swal({
                    title: 'Product exists in this category',
                    button: false,
                    icon: "error",
                    timer: 1000
                });
            }
        }
    })
}

function editCategory(categoryId) {
    const categoryName = document.getElementById('editCategoryInput').value
    $.ajax({
        data: {
            categoryId: categoryId,
            categoryName: categoryName
        },
        url: '/admin/update_category',
        method: 'put',
        success: (response) => {
            if (response == 1) {
                location.href = '/admin/category'
            } else {
                swal({
                    title: 'Category already exists',
                    button: false,
                    icon: "error",
                    timer: 1000
                });
            }
        }
    })
}

function addCategory() {
    const category = document.getElementById('addCategoryInput').value
    if (category) {
        $.ajax({
            data: {
                category: category
            },
            url: '/admin/category',
            method: 'post',
            success: (response) => {
                if (response == 1) {
                    swal({
                        title: 'Category added successfully',
                        button: false,
                        icon: "success",
                        timer: 1000
                    });
                    $("#refreshh").load(location.href + " #refreshh")
                } else {
                    swal({
                        title: 'Category already exists',
                        button: false,
                        icon: "error",
                        timer: 1000
                    });
                }
            }
        })
    }
}


function blockUser(id) {
    swal({
        title: "Block this user ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((block) => {
            if (block) {
                $.ajax({
                    url: '/admin/block_user/' + id,
                    method: 'put',
                    success: (response) => {
                        swal({
                            title: 'User unblocked',
                            button: false,
                            timer: 700,
                            icon: "error",
                        })
                        $("#userTable").load(location.href + " #userTable")
                    }
                })
            }
        })
}

function unblockUser(id) {
    $.ajax({
        url: '/admin/unblock_user/' + id,
        method: 'put',
        success: (response) => {
            swal({
                title: 'User unblocked',
                button: false,
                timer: 700,
                icon: "success"
            })
            $("#userTable").load(location.href + " #userTable")
        }
    })
}

function addCoupon() {
    const couponCode = document.getElementById('coupon-code').value
    const percentage = document.getElementById('percentage-discount').value

    if (couponCode && percentage) {
        $.ajax({
            data: {
                code: couponCode,
                discount: percentage
            },
            url: '/admin/add_coupon',
            method: 'post',
            success: (response) => {
                if (response == 1) {
                    swal({
                        title: 'Coupon added',
                        button: false,
                        timer: 700,
                        icon: "success"
                    })
                } else if (response == 0) {
                    swal({
                        title: 'Coupon already exists',
                        button: false,
                        timer: 700,
                        icon: "error"
                    })
                }
                $("#couponDiv").load(location.href + " #couponDiv")
                document.getElementById('couponForm').reset();
            }
        })
    } else {
        swal({
            title: 'Enter coupon code and percentage',
            button: false,
            timer: 700,
            icon: "info"
        })
    }
}

function deleteCoupon(couponId) {
    swal({
        title: "Delete this coupon ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((deleted) => {
            if (deleted) {
                $.ajax({
                    url: '/admin/delete_coupon/' + couponId,
                    method: 'delete',
                    success: (response) => {
                        swal({
                            title: 'Coupon deleted',
                            button: false,
                            timer: 700,
                            icon: "success"
                        })
                        $("#couponDiv").load(location.href + " #couponDiv")
                    }
                })
            }
        })
}

function packOrder(orderId) {
    swal({
        title: "Pack this order ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: '/admin/pack_order/' + orderId,
                method: 'patch',
                success: (response) => {
                    swal("Order packed & is waiting for shipping", {
                        icon: "success",
                      });
                    $("#userTable").load(location.href + " #userTable")
                }
            })
        }
      });
}

function shipOrder(orderId) {
    swal({
        title: "Ship this order ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: '/admin/ship_order/' + orderId,
                method: 'patch',
                success: (response) => {
                    swal("Order shipped successfully", {
                        icon: "success",
                      });
                    $("#userTable").load(location.href + " #userTable")
                }
            })
        }
      });
}

function deliverOrder(orderId) {
    swal({
        title: "Deliver this order ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: '/admin/deliver_order/' + orderId,
                method: 'patch',
                success: (response) => {
                    swal("Order delivered & payment collected", {
                        icon: "success",
                      });
                    $("#userTable").load(location.href + " #userTable")
                }
            })
        }
      });
}