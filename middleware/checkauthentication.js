const jwt = require("jsonwebtoken")
const { promisify } = require('util')
const{userlogins} = require("../model/index")

exports.checkauthentication = async (req,res,next)=>{
    const token = req.cookies.token

    if(!token || token===null || token=== undefined){
        return res.redirect("/login")
    }
  const verifyresult= await promisify(  jwt.verify)(token, 'thisisthesecreatekeydontshare')
  const user = await userlogins.findByPk(verifyresult.id)
  if(!user){
    return res.redirect("/login")
  }
  req.customer = verifyresult.id
  
  next()
}

