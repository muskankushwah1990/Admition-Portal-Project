const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

const checkUserAuth = async(req, res, next) => {
    // console.log("hello auth")
    //get token
    const{token} = req.cookies
    //console.log(token)
    if(!token) {
        req.flash('error', 'Unauthorised user please login')
        res.redirect('/')
    }else {
        const verifyLogin = jwt.verify(token, 'HF5XJowO_L21gOejLPjOORKI_ts')
        //console.log(verifyLogin) 
        const userData = await UserModel.findOne({_id: verifyLogin.ID})
       // console.log(userData)
       req.Udata = userData
        next(); //next method route per pahucha dega
    }
}

module.exports = checkUserAuth