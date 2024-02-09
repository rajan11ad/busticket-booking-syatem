const { businfos, busroutes } = require("../../model")

exports.renderfirstpage= (req,res)=>{

    res.render("../views/backend/firstpage")
    
    }



    // add bus 

    exports.addbus = async(req,res)=>{

        const addbusinfo = await businfos.findAll()
        res.render("../views/backend/addbus",{ businfos: addbusinfo})
      }


      // add bus data form

      exports.addbusform =(req,res)=>{



        res.render("../views/backend/busaddform")
      }

      // insert the data from the add bus form to the data base

       exports.datainsert= async (req,res)=>{

        const{busname, contact, busnumber}=req.body
       

        if(!busname || !contact || !busnumber){

           res.send("all fields are required")
        }else if (contact.length != 10){
          res.send("*Phone number should be of 10 digits!");
        }else if (typeof busname !== 'string' || !isNaN(busname)) {
          res.send('Source and destination must be strings and cannot be numbers.')
         }else{
        console.log(req.body)
          await businfos.create({
        
            busname: busname,
            contact: contact,
            busnumber: busnumber
         
        
        
        
          })
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
exports.routeform=(req,res)=>{

    res.render("../views/backend/addbusroute")
  }

  // insert  the data of bus route to the database

  exports.addbusroute =async (req, res)=>{

    const{source, destination, bus_name, depature_date, seat, cost} =req.body
    
  
  
  await busroutes.create({
  source:source,
  destinatin:destination,
   bus_name: bus_name,
  depature_date: depature_date,
  seat: seat,
  cost:cost
  
  
  
  })
  
  res.redirect("/busroute")
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
    
    const { source, destination, bus_name, depature_date,seat, cost   } = req.body
 console.log(busrouteid)
    await busroutes.update({
        source: source,
        destinatin: destination,
        bus_name: bus_name,
        depature_date: depature_date,
        seat:seat,
        cost : cost

  
    },{
        where :{
            id: busrouteid
        }
    })
      
  res.redirect("/busroute")
  }

  // customer

  exports.customer= (req,res)=>{

    res.render("../views/backend/customer")
  
  
  
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

  exports.updatebusbookingdata =(req,res)=>{

    res.render("../views/backend/editbooking")
  }
  // render the admin login
  exports.renderadminlogin = (req,res)=>{

    res.render("../views/login/adminlogin")
    
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
     // edit the data from the bus routes
    