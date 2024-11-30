const { busrouteinpassenger } = require('../controller/adminside/backendController')
const { datecheck, searchsd, userlogincheck,navigatePassenger, searchticket, passenger, addcustomer, esewa, feedback, managefeedback, esewasucess, ticketsearch, ticketprint, ticketprints, pnrnumber, esewafailure, paymentstatus, adminticket } = require('../controller/userside/frontendcontroller')
const { adduserdata, renderegister, userlogin } = require('../controller/userside/frontendcontroller')
const { checkauthentication } = require('../middleware/checkauthentication')
const{ checkauthenticationadmin } = require('../middleware/admin')
const  router = require('express').Router()

// route to render the home page
router.route('/').get(datecheck)

// route of search the bus 
router.route("/search").post(searchsd)

// route of render the user login and match data to login
router.route("/login").get(userlogin).post(userlogincheck)

// route of render and insert the data in to data base 
router.route("/reg").get(renderegister).post(adduserdata)

router.route("/ticketsearch").get(searchticket)

router.route("/passenger").get(passenger).post(addcustomer)
router.route("/navigatePassenger").post( checkauthentication, navigatePassenger)
// display the esewa details
router.route("/esewa").get(esewa)
router.route("/feedback").post(checkauthentication,feedback)
router.route("/managefeedback").get(checkauthenticationadmin, managefeedback)

router.route("/sucess").get(esewasucess)

// ticket print 
router.route("/ticketinfo").post(ticketprints)
router.route("/pnrnumber").get(pnrnumber)
router.route("/paymentfailure").get(esewafailure)


module.exports = router