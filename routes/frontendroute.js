const { datecheck, searchsd, userlogincheck } = require('../controller/userside/frontendcontroller')
const { adduserdata, renderegister, userlogin } = require('../controller/userside/frontendcontroller')
const  router = require('express').Router()

// route to render the home page
router.route('/').get(datecheck)

// route of search the bus 
router.route("/search").post(searchsd)

// route of render the user login and match data to login
router.route("/login").get(userlogin).post(userlogincheck)

// route of render and insert the data in to data base 
router.route("/reg").get(renderegister).post(adduserdata)

module.exports = router