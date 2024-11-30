const { businfos, busroutes, customers, feedbacks } = require("../../model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const {QueryTypes,DataTypes} = require("sequelize")

const db = require("../../model/index")
const sequelize = db.sequelize

const busData = [
  {seatNumber : "A1", side:"A"},
  {seatNumber : "A2", side:"A"},
  {seatNumber : "B1", side:"B"},
  {seatNumber : "B2", side:"B"},
  {seatNumber : "A3", side:"A"},
  {seatNumber : "A4", side:"A"},
  {seatNumber : "B3", side:"B"},
  {seatNumber : "B4", side:"B"},
  {seatNumber : "A5", side:"A"},
  {seatNumber : "A6", side:"A"},
  {seatNumber : "B5", side:"B"},
  {seatNumber : "B6", side:"B"},
  {seatNumber : "A7", side:"A"},
  {seatNumber : "A8", side:"A"},
  {seatNumber : "B7", side:"B"},
  {seatNumber : "B8", side:"B"},
  {seatNumber : "A9", side:"A"},
  {seatNumber : "A10", side:"A"},
  {seatNumber : "B9", side:"B"},
  {seatNumber : "B10", side:"B"},
  {seatNumber : "A11", side:"A"},
  {seatNumber : "A12", side:"A"},
  {seatNumber : "B11", side:"B"},
  {seatNumber : "B12", side:"B"},
  {seatNumber : "A13", side:"A"},
  {seatNumber : "A14", side:"A"},
  {seatNumber : "B13", side:"B"},
  {seatNumber : "B14", side:"B"},
  {seatNumber : "A15", side:"A"},
  {seatNumber : "A16", side:"A"},
  {seatNumber : "B15", side:"B"},
  {seatNumber : "B16", side:"B"},
  {seatNumber : "A17", side:"A"},
  {seatNumber : "A18", side:"A"},
  {seatNumber : "B17", side:"B"},
  {seatNumber : "B18", side:"B"},
  {seatNumber : "A19", side:"A"},
  {seatNumber : "A20", side:"A"},
  {seatNumber : "B19", side:"B"},
  {seatNumber : "B20", side:"B"},
  {seatNumber : "A21", side:"B"},
  {seatNumber : "A22", side:"B"},
  {seatNumber : "B21", side:"B"},
  {seatNumber : "B22", side:"B"},

  


]
exports.renderfirstpage= async (req,res)=>{
  const data = await db.adminlogins.findAll()

    res.render("../views/backend/firstpage",{admininfo:data})
    
    }



    // add bus 

    exports.addbus = async(req,res)=>{

        const addbusinfo = await businfos.findAll()
        res.render("../views/backend/addbus",{ businfos: addbusinfo})
      }


      // add bus data form

      exports.addbusform =(req,res)=>{

const [error] = req.flash('error')
console.log(error)

        res.render("../views/backend/busaddform",{error})
      }

      // insert the data from the add bus form to the data base

       exports.datainsert= async (req,res)=>{

        const{busname, contact, busnumber}=req.body
       

        if(!busname || !contact || !busnumber){

           req.flash('error',"all fields are required")
           res.redirect('/bus')
        }else if (contact.length != 10){
          req.flash('error',"*Phone number should be of 10 digits!")
          res.redirect('/bus')
        }else if (typeof busname !== 'string' || !isNaN(busname)) {
          req.flash('error','busname  must be strings and cannot be numbers.')
          res.redirect('/bus')
         }else{
      
          const busid = await businfos.create({
        
            busname: busname,
            contact: contact,
            busnumber: busnumber
         
        
        
        
        
        
          })
         
const busId = busid.id

console.log(busId)
res.cookie('busId', busId,);
          res.redirect("/addbus")
        
        }
      }

// fetch the data of bus routes form database
        exports. festchdata= async(req,res)=>{
            // fetch the data from busroutes table in bus route page
                const bus= await busroutes.findAll()
              
                res.render("../views/backend/busroute",{busroutes : bus})
              }


// add bus route form 
exports.routeform= async (req,res)=>{
  const [routeerror]= req.flash('routeerror')
  console.log(routeerror)
 

    res.render("../views/backend/addbusroute",{routeerror})
  }

  // insert  the data of bus route to the database

  exports.addbusroute =async (req, res)=>{
    const busId = req.cookies['busId'];
console.log(busId)
    const{source, destination, bus_name, depature_date,time,busnumber, seat, cost} =req.body
    if (!source || !destination || !bus_name || !depature_date || seat === undefined || cost === undefined) {
      req.flash('routeerror',"All fields are required.");
      res.redirect('/addbusrouteform')
  }
  else if  (typeof source !== 'string' || !isNaN(source) || typeof destination !== 'string' || !isNaN(destination || typeof bus_name!=='string' ||!isNaN(bus_name))) {
    req.flash('routeerror',"Source, destination, and bus name must be strings.")
    res.redirect('/addbusrouteform')
  }
 else if (isNaN(Date.parse(depature_date))) {
  req.flash('routeerror',"invalid departure date");
      res.redirect('/addbusrouteform')
  }
  
else if (!Number.isInteger(Number(seat)) || seat < 1) {
    req.flash('routeerror',"price must be a positive integer.")
    res.redirect('/addbusrouteform')
  }
 else if (isNaN(parseFloat(cost)) || parseFloat(cost) < 0) {
  req.flash('routeerror',"cost must be positive number.")
  res.redirect('/addbusrouteform')
  }else{
    
  
  
  const bus = await busroutes.create({
  source:source,
  destinatin:destination,
   bus_name: bus_name,
  depature_date: depature_date,
  seat: seat,
  cost:cost,
  time:time,
  bus_number:busnumber,
  businfoId:busId
 
  })
  
  await sequelize.query(`CREATE TABLE busSeats_${bus.id} (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, seat
    VARCHAR(255), side VARCHAR(255), status VARCHAR(255),paymentstatus VARCHAR(255), busId INT REFERENCES busroutes(id) ON DELETE CASCADE ON UPDATE CASCADE , customer INT REFERENCES customers(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`,{
      type : QueryTypes.CREATE
    })
  

  for(var i = 0 ; i < req.body.seat; i++){
    await sequelize.query(`INSERT INTO busSeats_${bus.id} (seat,side,status,busId) VALUES('${busData[i].seatNumber}','${busData[i].side}','available','${bus.id}')`,{
      type : QueryTypes.INSERT

      
    })
   
  }

  res.redirect("/busroute")
}
  }

  // render the bus data update form



// render the bus route update form
exports.busrouteupdate = async (req,res)=>{
  const busrouteid = req.params.id
  console.log(busrouteid)
  
  const busroutedata=  await busroutes.findByPk(busrouteid)
  console.log(busroutedata)

    res.render("../views/backend/editbusroute",{ busroutepass : busroutedata})
  
  }
  exports.busroutedatapost=  async (req, res) => {
    const busrouteid = req.params.id
    
    const { source, destination, bus_name, depature_date,seat,time,busnumber ,cost   } = req.body
 console.log(busrouteid)
    await busroutes.update({
        source: source,
        destinatin: destination,
        bus_name: bus_name,
        depature_date: depature_date,
        seat:seat,
        time:time,
        bus_number:busnumber,
        cost : cost

  
    },{
        where :{
            id: busrouteid
        }
    })
      
  res.redirect("/busroute")
  }

  // customer

  exports.customer= async (req,res)=>{
  
      // fetch the data from customers table in bus customerpage
          const custom= await customers.findAll({
            where:{
              paymentstatus: "paid"
            }
          })
        
          res.render("../views/backend/customer",{customerdata :custom})
  }
  
  // add customer data 
  exports.addcustomerdata =(req,res)=>{
    res.render("../views/backend/addcustomer")
    
  }

  // edit the customer data
  exports.updatecustomerdata =(req,res)=>{
    res.render("../views/backend/editcustomer")
    
  }

  // rneder the booking 
  exports.renderbooking= (req,res)=>{

    res.render("../views/backend/booking")
  }

  // add the booking data 
  exports.addbusbookingdata = (req,res)=>{

    res.render("../views/backend/addbooking")
  }

  // update the bus booking data 

  exports.updatebusbookingdata = async(req,res)=>{
    const bookingid = req.params.id
    console.log(bookingid)
    
    const bookingdata=  await customers.findByPk(bookingid)

    res.render("../views/backend/editbooking",{booking:bookingdata})


  }

  exports.bookingdatapost=  async (req, res) => {
    const bookingid = req.params.id
    
    const { name, email, mobile_No,boardingpoint,seat,amount,paymentstatus,route,busname, date,time,busnumber   } = req.body
 console.log(bookingid)
    await customers.update({
        name: name,
        email: email,
        mobile_No:mobile_No,
        boarding_point:boardingpoint,
        seat:seat,
        Amount:amount,
        route:route,
        time:time,
        busnumber:busnumber,
        bus_name:busname,
        paymentstatus:paymentstatus,
        depature_date: date
       
   
      
     

  
    },{
        where :{
            id: bookingid
        }
    })
      
  res.redirect("/customer")
  }

// render the unpaid booking status in another page 
exports.unpaidbooking = async (req,res)=>{
  const unpaid = await customers.findAll({
    where:{
      paymentstatus: "unpaid"
    }
  })
  res.render("../views/backend/unpaidbooking",{unpaidbooking:unpaid})
}

  // render the admin login
  exports.renderadminlogin = (req,res)=>{
    const adminloginerror = req.flash('adminloginerror')
    console.log(adminloginerror)

    res.render("../views/login/adminlogin",{adminloginerror})
    
    }

    // delete the bus info data from database2
exports.deletebusinfo = async (req, res)=>{
const ids = req.params.id
console.log(ids)
      await businfos.destroy({

        where:{
          id: ids
        }
       
      })
      res.redirect("/addbus")
   }

 //update the data of the bus info
exports.updatebusinfo = async(req, res)=>{
  const updatedata = req.params.id
  const data= await businfos.findByPk(updatedata)
    
 

 res.render("../views/backend/editbusform", { updateddata: data}) 
      
} 


 exports.dataupdatebusinfo = async (req, res) => {
  const updatedata = req.params.id
  console.log(updatedata)
  const { busname, contactno, busnumber  } = req.body
console.log(contactno)
  await businfos.update({
      busname: busname,
      contact: contactno,
      busnumber: busnumber

  },{
      where :{
          id: updatedata
      }
  })
    
res.redirect("/addbus")
}

// delte the data fronm the bus route 
exports.deletebusroute = async (req, res)=>{
  const routedata = req.params.id
  console.log(routedata)
        await busroutes.destroy({
  
          where:{
            id: routedata
          }
         
        })
        res.redirect("/busroute")
     }
     // delete the data from the customers table
     
     exports.deletecustomerdata = async (req, res)=>{
      const customerid = req.params.id
     
            await customers.destroy({
      
              where:{
                id: customerid
              }
             
            })
            res.redirect("/customer")
         }
// delete  the feedback data from the database
         exports.deletefeedback = async (req, res)=>{
          const ids = req.params.id
          console.log(ids)
                await feedbacks.destroy({
          
                  where:{
                    id: ids
                  }
                 
                })
                res.redirect("/managefeedback")
             }
   
             // admin register 
             exports.adminregister = (req,res)=>{
              const adminregerror = req.flash('adminregerror')
              res.render("../views/login/adminregister",{adminregerror})

             }

         // insert the data in to database
         exports.admindata= async(req,res)=>{
          const{uname,email,password,cpassword}=req.body
          const atposition= email.indexOf("@")
          const dotposition=email.lastIndexOf('.')
          const checkemail =await db.adminlogins.findAll({

            where:{
              email:email
            }
          })
          if(!checkemail.length==0){
            req.flash('adminregerror',"this email is already register")
            res.redirect('/adminregister')
          }else if (!email || !password || !cpassword) {
            req.flash('adminregerror','All fields are required.')
            res.redirect('/adminregister')
        }
        else if (password !== cpassword) {
           
          req.flash('adminregerror','Passwords do not match')
          res.redirect('/adminregister') 
        
      }else if (password && password.length < 6) {
      req.flash('adminregerror','Password must be at least 6 characters long.')
       res.redirect('/adminregister')
        }else if(atposition <1 || dotposition<atposition +2 ||dotposition+2>=email.length)
      {
      req.flash('adminregerror',"invalid email address")
      res.redirect('/adminregister')

    
      }else{
        
        
        
        
        
        
        await db.adminlogins.create({
          username:uname,
        email:email,
        password: bcrypt.hashSync(password,12)
        
        
        
        
        })
        res.render("../views/backend/firstpage")
      }


         }    

   
   
        
   
         exports.adminlogincheck = async (req, res) => {
          const { username, password } = req.body;
          console.log(username, password);
      
          // Check if username and password were provided
          if (!username || !password) {
              req.flash("adminloginerror", "Both input fields are required");
              return res.redirect('/adminlogin');
          }
      
          try {
              // Attempt to find the user
              const user = await db.adminlogins.findOne({
                  where: { username: username }
              });
      
              // Check if user was found
              if (!user) {
                  req.flash('adminloginerror', "No user exists with that username");
                  return res.redirect('/adminlogin');
              }
      
              // Check if the password matches
              const isMatched = bcrypt.compareSync(password, user.password);
              if (isMatched) {
                  var token = jwt.sign({ id: user.id }, 'thisisthesecreatekeydontshareadmin', {
                      expiresIn: "1d"
                  });
                  res.cookie('toke', token); // Corrected the cookie name from 'toke' to 'token'
                  return res.redirect("/admin");
              } else {
                  req.flash('adminloginerror', "Username or password is invalid");
                  return res.redirect('/adminlogin');
              }
          } catch (error) {
              console.error("Error during admin login:", error);
              req.flash('adminloginerror', "An error occurred during login");
              return res.redirect('/adminlogin');
          }
      };

      exports.seatsee= async(req,res)=>{

        const {id} = req.params
        const seats = await sequelize.query(`SELECT * FROM busSeats_${id}`,{
          type : QueryTypes.SELECT
        })
        res.render("../views/backend/seatsee",{seats})
      } 
      
      exports.ticket = async(req,res)=>{
        const[adminticketerror]= req.flash('adminticketerror')
        res.render("../views/backend/printticket",{adminticketerror})
      }

      exports.adminticket = async (req,res)=>{
        const {ticketPin} = req.body
      
    
      ticket = await customers.findAll({
        where: {
            id: ticketPin,
            paymentstatus:"paid"
        
           
        }
    })
    if (!ticket || ticket.length === 0) {
     req.flash('adminticketerror','*No ticket found*')
     return res.redirect("/ticket")
   
    
    }
    
    
    res.render("../views/backend/adminticketprint",{ ticketinfo: ticket[0] })
    
    }