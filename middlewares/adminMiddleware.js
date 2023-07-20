exports.loginCheck = (req, res, next) =>{
    if(req.session.adminLog){
        next()
    } else{
        res.render('admin/admin_login')
    }
}