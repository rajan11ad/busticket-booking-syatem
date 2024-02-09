const { renderfirstpage, addbus, addbusform, datainsert, routeform,  addbusroute, festchdata, customer, addcustomerdata, updatecustomerdata, renderbooking, addbusbookingdata, updatebusbookingdata, renderadminlogin, deletebusinfo, updatebusinfo, dataupdatebusinfo, deletebusroute, busrouteupdate, busroutedatapost } = require('../controller/adminside/backendController')
const { seatlayout } = require('../controller/userside/frontendcontroller')
const { checkauthentication } = require('../middleware/checkauthentication')
const { checkauthenticationadmin } = require('../middleware/checkauthticationadmin')


const rout = require('express').Router()
// backend routes
rout.route("/admin").get(checkauthenticationadmin,renderfirstpage)


// add bus route
rout.route("/addbus").get(checkauthenticationadmin, addbus)

// add bus form route and data insert in to database
rout.route("/bus").get(checkauthenticationadmin,addbusform).post(checkauthenticationadmin,datainsert)


// add bus route form and insert the data of bus route
rout.route("/addbusrouteform").get(checkauthenticationadmin,routeform).post(checkauthenticationadmin,addbusroute)


//edit the data of bus infos
//rout.route("/editbusinfo/:id").get(busdataupdate)
rout.route("/editbusinfo/:id").get(checkauthenticationadmin,updatebusinfo).post(checkauthenticationadmin,dataupdatebusinfo)



// edit the data of bus route
rout.route("/editbusroutedata/:id").get(checkauthenticationadmin,busrouteupdate).post(checkauthenticationadmin,busroutedatapost)


// fetch the data from data base to table
rout.route("/busroute").get(checkauthenticationadmin,festchdata)




// customer
rout.route("/customer").get(checkauthenticationadmin,customer)
// add customer data from form

rout.route("/addcustomerdata").get(checkauthenticationadmin,addcustomerdata)


// edit the customer data 
rout.route("/editcustomerdata").get(checkauthenticationadmin,updatecustomerdata)

// booking

rout.route("/booking").get(checkauthenticationadmin,renderbooking )

// add the booking data from the form
rout.route("/addbookingdata").get(checkauthenticationadmin,addbusbookingdata )

// edit the booking data 
rout.route("/editbookingdata").get(checkauthenticationadmin,updatebusbookingdata)


// route of render the admin login page 
rout.route("/adminlogin").get(renderadminlogin);





// seat book layout 

rout.route("/seatbook").get(checkauthentication,seatlayout)

// route of to delete the data of bus info
rout.route("/delete/:id").get(checkauthenticationadmin,deletebusinfo)
// route to delte the data of bus route table
rout.route("/deletebusroute/:id").get(checkauthenticationadmin,deletebusroute)



//route to update the data of the bus info table



module.exports = rout