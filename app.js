const express = require("express")
const saltRounds = 10
const session = require('express-session')
const flash = require('connect-flash')
const AdminSessions = require('./middleware/sessionconfig')
const app = express()
const jwt = require("jsonwebtoken")
const froroutes = require('./routes/frontendroute')
const backendrout = require('./routes/backendroute')

require("./model/index")

// set the view engine ejs
app.set('view engine','ejs')

// to render the html data
app.use(express.urlencoded({ extended: true }))

// to access the data from the sepcific folder(public)
app.use(express.static(__dirname+'/public' ))
app.use(express.static('/public/css'))
app.use(express.static('/images'))


// admin login
app.use(session({
  secret: 'secretkey', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } 
}))

const ADMIN_USERNAME = 'rajan'
const ADMIN_PASSWORD = 'rajan'
app.post('/adminlogin', (req, res) => {
  const { username, password } = req.body

  
  if (username == ADMIN_USERNAME && password == ADMIN_PASSWORD) {
      req.session.AdminSession = true
      res.render("../views/backend/firstpage")
  } else {
      res.status(401).send('invalid data')
  }
});


// logout process

app.get('/admin/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('Could not log out');
      }
      res.redirect('/adminlogin');
  });
});





app.use("",backendrout)
app.use("",froroutes)


port= 3000
 app.listen(port, () => {
  console.log("Node.js project has started at port 3000")
    })
