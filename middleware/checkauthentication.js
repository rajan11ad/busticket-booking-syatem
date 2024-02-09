const jwt = require("jsonwebtoken")
const { promisify } = require('util')

exports.checkauthentication = async (req,res,next)=>{
    const token = req.cookies.token

    if(!token || token===null || token=== undefined){
        return res.redirect("/login")
    }
  const verifyresult= await promisify(  jwt.verify)(token, 'thisisthesecreatekeydontshare')
  next()
}