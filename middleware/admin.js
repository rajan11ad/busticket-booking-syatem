const jwt = require("jsonwebtoken")
const { promisify } = require('util')
const{ adminlogins} = require("../model/index")
exports.checkauthenticationadmin = async (req,res,next)=>{
    const token = req.cookies.toke
  
    if(!token || token===null || token=== undefined){
        return res.redirect("/adminlogin")
    }
  const verifyresult= await promisify(  jwt.verify)(token, 'thisisthesecreatekeydontshareadmin')
  const user = await adminlogins.findByPk(verifyresult.id)
  if(!user){
    return res.redirect("/adminlogin")
  }
  req.customer = verifyresult.id
  
  next()
  }