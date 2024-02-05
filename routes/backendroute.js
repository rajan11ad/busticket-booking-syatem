const { renderfirstpage, addbus, addbusform, datainsert, routeform, busdataupdate, addbusroute, busrouteupdate, festchdata, customer, addcustomerdata, updatecustomerdata, renderbooking, addbusbookingdata, updatebusbookingdata, renderadminlogin, deletebusinfo, updatebusinfo, dataupdatebusinfo, deletebusroute, adminlogin } = require('../controller/adminside/backendController')
const { seatlayout } = require('../controller/userside/frontendcontroller')


const rout = require('express').Router()
// backend routes
rout.route("/admin").get(renderfirstpage)


// add bus route
rout.route("/addbus").get(addbus)

// add bus form route and data insert in to database
rout.route("/bus").get(addbusform).post(datainsert)


// add bus route form and insert the data of bus route
rout.route("/addbusrouteform").get(routeform).post(addbusroute)


//edit the data of bus infos
rout.route("/editbusinfo/:id").get(busdataupdate)



// edit the data of bus route
rout.route("/editbusroutedata").get(busrouteupdate )

// fetch the data from data base to table
rout.route("/busroute").get(festchdata)




// customer
rout.route("/customer").get(customer)
// add customer data from form

rout.route("/addcustomerdata").get(addcustomerdata)


// edit the customer data 
rout.route("/editcustomerdata").get(updatecustomerdata)

// booking

rout.route("/booking").get(renderbooking )

// add the booking data from the form
rout.route("/addbookingdata").get(addbusbookingdata )

// edit the booking data 
rout.route("/editbookingdata").get(updatebusbookingdata)


// route of render the admin login page 
rout.route("/adminlogin").get(renderadminlogin)





// seat book layout 

rout.route("/seatbook").get(seatlayout)

// route of to delete the data of bus info
rout.route("/delete/:id").get(deletebusinfo)
// route to delte the data of bus route table
rout.route("/deletebusroute/:id").get(deletebusroute)



//route to update the data of the bus info table
rout.route("/editbusinfo/:id").get(updatebusinfo).post(dataupdatebusinfo)


module.exports = rout