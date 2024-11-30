const { renderfirstpage, addbus, addbusform, datainsert, routeform,  addbusroute, festchdata, customer, addcustomerdata, updatecustomerdata, renderbooking, addbusbookingdata, updatebusbookingdata, renderadminlogin, deletebusinfo, updatebusinfo, dataupdatebusinfo, deletebusroute, busrouteupdate, busroutedatapost, seacrhbusticket, deletecustomerdata, deletefeedback, adminregister, admindata, adminlogincheck, seatsee, ticket, adminticket, bookingdatapost, unpaidbooking } = require('../controller/adminside/backendController')
const { seatlayout } = require('../controller/userside/frontendcontroller')
const { checkauthentication } = require('../middleware/checkauthentication')
const{ checkauthenticationadmin} = require('../middleware/admin')


const rout = require('express').Router()
// backend routes
rout.route("/admin").get(checkauthenticationadmin,renderfirstpage)


// add bus route
rout.route("/addbus").get( checkauthenticationadmin,addbus)

// add bus form route and data insert in to database
rout.route("/bus").get(checkauthenticationadmin,addbusform).post(datainsert)


// add bus route form and insert the data of bus route
rout.route("/addbusrouteform").get(checkauthenticationadmin,routeform).post(addbusroute)


//edit the data of bus infos
//rout.route("/editbusinfo/:id").get(busdataupdate)
rout.route("/editbusinfo/:id").get(updatebusinfo).post(dataupdatebusinfo)



// edit the data of bus route
rout.route("/editbusroutedata/:id").get(checkauthenticationadmin,busrouteupdate).post(busroutedatapost)


// fetch the data from data base to table
rout.route("/busroute").get(checkauthenticationadmin,festchdata)




// customer
rout.route("/customer").get(checkauthenticationadmin,customer)
// add customer data from form

rout.route("/addcustomerdata").get(checkauthenticationadmin,addcustomerdata)


// edit the customer data 
rout.route("/editcustomerdata").get(updatecustomerdata)

// delte the customer data 
rout.route("/deletecustomerdata/:id").get(deletecustomerdata)

// booking

rout.route("/booking").get(checkauthenticationadmin,renderbooking )

// add the booking data from the form
rout.route("/addbookingdata").get(addbusbookingdata )

// edit the booking data 
rout.route("/editcustomerdata/:id").get(updatebusbookingdata).post(bookingdatapost)


// route of render the admin login page 
rout.route("/adminlogin").get(renderadminlogin).post(adminlogincheck);





// seat book layout 

rout.route("/seatbook/:id").get(checkauthentication,seatlayout)

// route of to delete the data of bus info
rout.route("/delete/:id").get(deletebusinfo)
// route to delte the data of bus route table
rout.route("/deletebusroute/:id").get(deletebusroute)


// delte the feedback
rout.route("/deletefeedback/:id").get(deletefeedback)

//route to update the data of the bus info table

// route to register the admin
rout.route("/adminregister").get(checkauthenticationadmin,adminregister).post(admindata)
rout.route("/ticket").get(ticket)
rout.route("/seatsee").get(seatsee)
rout.route("/adminticket").post(adminticket)
// render the unpaid booking in another page
rout.route("/unpaidbooking").get(unpaidbooking)
module.exports = rout