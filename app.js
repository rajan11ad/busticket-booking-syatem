const express = require("express")

const app = express()
require('dotenv').config()
const froroutes = require('./routes/frontendroute')
const backendrout = require('./routes/backendroute')
const cookieparser =require("cookie-parser")



require("./model/index")

// set the view engine ejs
app.set('view engine','ejs')

// to render the html data
app.use(express.urlencoded({ extended: true }))

// to access the data from the sepcific folder(public)
app.use(express.static(__dirname+'/public' ))
app.use(express.static('/public/css'))
app.use(express.static('/images'))
app.use(cookieparser())


const ADMIN_USERNAME = process.env.ADMIN_USERNAME; // Use environment variables
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
app.post('/adminlogin', (req, res) => {
  const { username, password } = req.body

  
  if (username == ADMIN_USERNAME && password == ADMIN_PASSWORD) {
  
   
      res.render("../views/backend/firstpage")
    
  } else {
    res.status(401).send('Invalid data')
  }
})




// logout process

app.get('/admin/logout', (req, res) => {

  res.clearCookie('token')
      res.redirect('/adminlogin');
  })






app.use("",backendrout)
app.use("",froroutes)


port= 3000
 app.listen(port, () => {
  console.log("Node.js project has started at port 3000")
    })
