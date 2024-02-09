const jwt = require("jsonwebtoken")
const { promisify } = require('util')

exports.checkauthenticationadmin = async (req,res,next)=>{
    const token = req.cookies.token

    if(!token || token===null || token=== undefined){
        return res.redirect("/adminlogin")
    }
  const verifyresult= await promisify(  jwt.verify)(token, process.env.JWT_SECRET)
  next()
}