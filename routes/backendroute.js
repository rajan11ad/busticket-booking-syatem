const { renderfirstpage, addbus, addbusform, datainsert, routeform,  addbusroute, festchdata, customer, addcustomerdata, updatecustomerdata, renderbooking, addbusbookingdata, updatebusbookingdata, renderadminlogin, deletebusinfo, updatebusinfo, dataupdatebusinfo, deletebusroute, busrouteupdate, busroutedatapost } = require('../controller/adminside/backendController')
const { seatlayout } = require('../controller/userside/frontendcontroller')
const { checkauthentication } = require('../middleware/checkauthentication')



const rout = require('express').Router()
// backend routes
rout.route("/admin").get(renderfirstpage)


// add bus route
rout.route("/addbus").get( addbus)

// add bus form route and data insert in to database
rout.route("/bus").get(addbusform).post(datainsert)


// add bus route form and insert the data of bus route
rout.route("/addbusrouteform").get(routeform).post(addbusroute)


//edit the data of bus infos
//rout.route("/editbusinfo/:id").get(busdataupdate)
rout.route("/editbusinfo/:id").get(updatebusinfo).post(dataupdatebusinfo)



// edit the data of bus route
rout.route("/editbusroutedata/:id").get(busrouteupdate).post(busroutedatapost)


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
rout.route("/adminlogin").get(renderadminlogin);





// seat book layout 

rout.route("/seatbook").get(checkauthentication,seatlayout)

// route of to delete the data of bus info
rout.route("/delete/:id").get(deletebusinfo)
// route to delte the data of bus route table
rout.route("/deletebusroute/:id").get(deletebusroute)



//route to update the data of the bus info table



module.exports = rout