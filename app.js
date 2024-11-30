const express = require("express")

const app = express()
require('dotenv').config()
const froroutes = require('./routes/frontendroute')
const backendrout = require('./routes/backendroute')
const cookieparser =require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")



app.use(session({

  secret:"hellothisissecret",
  resave:false,
  saveUninitialized:false,

}))

app.use(flash())


require("./model/index")

// set the view engine ejs
app.set('view engine','ejs')

// to render the html data
app.use(express.urlencoded({ extended: true }))

// to access the data from the sepcific folder(public)
app.use(express.static(__dirname+'/public' ))
app.use(express.static('/public/css'))
app.use(express.static('/image'))
app.use(cookieparser())







// logout process

app.get('/admin/logout', (req, res) => {

  res.clearCookie('toke')
      res.redirect('/adminlogin');
  })
  app.get('/user/logout', (req, res) => {

    res.clearCookie('token')
        res.redirect('/');
    })



    app.use((req,res,next)=>{
      res.locals.islogin= req.cookies.token
      next()
    
    })


app.use("",backendrout)
app.use("",froroutes)


port= 3000
 app.listen(port, () => {
  console.log("Node.js project has started at port 3000")
    })
