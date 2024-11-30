const { busroutes, userlogins, customers ,feedbacks} = require("../../model");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const {QueryTypes,DataTypes, where} = require("sequelize")
require('dotenv').config();


const db = require("../../model/index");
const booking = require("../../model/booking");
const sequelize = db.sequelize
const uuid= require('uuid')


  exports.datecheck = (req,res)=>{

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() );
  
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const yyyy = tomorrow.getFullYear();
  
   const[error]= req.flash('error')
  console.log(error)
  
      res.render("../views/frontend/home",{error, minDate: `${yyyy}-${mm}-${dd}` })
  }

  // search source and destination from the user


   exports.searchsd =async (req,res)=>{
    const{ source, destination, date}= req.body
    if (source === "" || destination === "" || date === "") {
      req.flash('error','*All fields are required*')
      res.redirect("/")
  }else  if (typeof source !== 'string' || !isNaN(source) || typeof destination !== 'string' || !isNaN(destination)) {
  req.flash('error','*source & destination must be strings*')
  res.redirect("/")
}else{

    
    
    console.log(source, destination, date)
      try {
        const searchData = await busroutes.findAll({
            where: {
                source: source,
                destinatin: destination,
                depature_date: date
            }
        })
        if (!searchData || searchData.length === 0) {
       req.flash('error','*No matching routes found*')
       res.redirect("/")
      }
    
        res.render("../views/frontend/search",{ search: searchData });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred.");
    }
  }
  }

    
// render the seat layout 
exports.seatlayout = async (req, res) => {
  const {id} = req.params
  const seats = await sequelize.query(`SELECT * FROM busSeats_${id}`,{
    type : QueryTypes.SELECT
  })
  const data = await busroutes.findByPk(id)
  console.log(seats)
  const source =req.query.source
  const destination= req.query.destination
  const travel= req.query.travel
  const date= req.query.date
  const time=req.query.time
  const busnumber=req.query.busnumber
  console.log(time)
  console.log(busnumber)
  
    res.render("../views/frontend/seat",{seats,data,source,destination,travel,date,time,busnumber})
}

// render the passenger details form 
exports.passenger = async(req,res)=>{
  const seat= req.query.seats
  const totalamount= req.query.totalAmount
  const ticketamount= req.query.hid
  const route = req.query.route
  const to= req.query.to
  const travel= req.query.travel
  const date= req.query.date
  const time= req.query.time
  const busnumber=req.query.busnumber
  console.log(time)
  console.log(busnumber)
  const busid=req.query.busid


  

  res.render("../views/frontend/passenger",{seatnumber:seat, total:totalamount, perticket:ticketamount,route,to,travel,date,time,busnumber,busid})
}
 
exports.navigatePassenger = async(req,res)=>{
  const customer = req.customer
  

  console.log(customer)
 
  const {selectedSeat,hid,totalAmount,busId,source,destination,travel,date,time,busnumber} = req.body
 

  // Ensure that selectedSeat is treated as an array
  const seatsToUpdate = Array.isArray(selectedSeat) ? selectedSeat : [selectedSeat.split(',')].flat();
// Add more seat values as needed
const seatList = seatsToUpdate.map(seat => `'${seat.trim()}'`).join(',');
  console.log(seatsToUpdate)
  const updateQuery = `UPDATE busseats_${busId} SET status='reserved', customer = ${customer} WHERE seat IN (${seatList})`;
 console.log(busId,customer,seatList)
  await sequelize.query(updateQuery, {
    type: QueryTypes.UPDATE
  });
  
  res.redirect(`/passenger?seats=${selectedSeat}&hid=${hid}&totalAmount=${totalAmount}&route=${source}&to=${destination}&travel=${travel} &date=${date}&time=${time}&busnumber=${busnumber}&busid=${busId}`)
}

// render the frontend user login page 

exports.userlogin = (req,res)=>{
  const[userloginerror]=req.flash("userloginerror") 

    res.render("../views/login/login",{userloginerror})
  }

  // post the data 

  exports.userlogincheck = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)

    // Validate input fields
    if (!email || !password) {
        req.flash("userloginerror", "Both input fields are required")
        return res.redirect("/login")
    }

    try {
        // Using findOne instead of findAll for efficiency
        const user = await userlogins.findOne({
            where: { Email: email }
        });

        // Check if user exists
        if (!user) {
            req.flash('userloginerror', "No user exists with that email");
            return res.redirect("/login");
        }

        // Password verification
        const isMatched = bcrypt.compareSync(password, user.password);
        if (isMatched) {
            // Sign and send the JWT token
            var token = jwt.sign({ id: user.id }, 'thisisthesecreatekeydontshare', {
                expiresIn: "1d"
            });
            res.cookie('token', token)
            return res.redirect("/")
        } else {
            req.flash("userloginerror", "Email or password is invalid");
            return res.redirect("/login")
        }
    } catch (error) {
        // Log and handle errors
        console.error("Error during user login:", error);
        req.flash('userloginerror', "An error occurred during login")
        return res.redirect("/login")
    }
}

  // render the register page 

  exports.renderegister =(req,res)=>{
    const userregerror = req.flash('userregerror')
    console.log(userregerror)
    const userloginerror= req.flash('userloginerror')

    res.render("../views/login/register",{userregerror, userloginerror})
  }

  // add the data of user from the register page
  exports.adduserdata = async (req,res)=>{

    const{Email, password, cpassword} =req.body
    const atposition= Email.indexOf("@")
          const dotposition=Email.lastIndexOf('.')

    const checkemail =await userlogins.findAll({

      where:{
        Email:Email
      }
    })
    if(!checkemail.length==0){
       req.flash("userregerror","this email is already register")
       res.redirect("/reg")
    }else if (!Email || !password || !cpassword) {
      req.flash ("userregerror",'All fields are required.')
      res.redirect("/reg")
  }else if(atposition <1 || dotposition<atposition +2 ||dotposition+2>=Email.length)
  {
  req.flash('userregerror',"invalid email address")
  res.redirect('/reg')

  }else if (password !== cpassword) {
     
    req.flash('userregerror','Passwords do not match') 
    res.redirect("/reg")
}else if (password && password.length < 6) {
 req.flash('userregerror','Password must be at least 6 characters long.')
 res.redirect("/reg")
  }
  else{
  
  
  
  
  
  
  await userlogins.create({
  Email:Email,
  password: bcrypt.hashSync(password,12)
  
  
  
  
  })
  res.redirect("/login")
}
}
  
  // saerch the ticket 
  exports.searchticket = async(req, res)=>{
res.render("../views/frontend/ticketsearch")
  }

  // insert the data of customer 
  exports.addcustomer =async (req, res)=>{

    const{name, email, mobile_no, boarding_Point,seat,amount,date,travel,route,time,busnumber,busid} =req.body
    
  
  
  const newCustomer= await customers.create({
  name:name,
  email:email,
   mobile_No: mobile_no,
  boarding_point: boarding_Point,
  seat:seat,
  Amount:amount,
  route:route,
  time:time,
  busnumber:busnumber,
 
  bus_name:travel,
  depature_date:date
  
  
  
  
  })
  const bookingId = newCustomer.id; 
  console.log(bookingId)
  
  res.redirect(`/esewa?amount=${amount}&bookingId=${encodeURIComponent(bookingId)} &busid=${encodeURIComponent(busid)}&seat=${encodeURIComponent(seat)}`)

  }

  // esewa ingegration
  exports.esewa= async (req,res)=>{
    const amount = req.query.amount
    const bookingId= req.query.bookingId
    const busid= req.query.busid
    const seat = req.query.seat
    console.log(seat)

    res.cookie('busid',busid)
    res.cookie('seat',seat)
    res.cookie('bookingId',bookingId)
     // or req.body if POST
     const uniqueId = uuid.v4();
console.log(uniqueId)

  
   
    res.render("../views/frontend/esewa",{ productid: uniqueId, totalamount:amount,bookingid: bookingId, busid:busid,seat:seat, callbackUrl: `http://localhost:3000/sucess?busid=${busid}&seat=${encodeURIComponent(seat)}` })
  }

  //insert the feedback data in to database 
  exports.feedback= async(req,res)=>{
const{name,email,message}=req.body
await feedbacks.create({
  name,
  email,
  message
})
res.redirect("/")
  }


  exports.managefeedback= async (req,res)=>{
    const managefeedback= await feedbacks.findAll()

    res.render("../views/backend/managefeedback",{feedback:managefeedback})
  }

  exports.esewasucess = async (req, res) => {
    const busid = req.cookies.busid;
    const seats = req.cookies.seat.split(',').map(seat => seat.trim());
    const bookingId = req.cookies.bookingId;

    try {
        // Start transaction
        await sequelize.transaction(async (transaction) => {
            // Update all seats in one query
            const seatsPlaceholder = seats.map(() => '?').join(', ');
            const updateQuery = `UPDATE busseats_${busid} SET paymentstatus='paid' WHERE seat IN (${seatsPlaceholder})`;
            await sequelize.query(updateQuery, { replacements: seats, type: sequelize.QueryTypes.UPDATE, transaction });

            // Update booking payment status
            const updateBookingQuery = `UPDATE bookings SET paymentstatus='paid' WHERE id = '${bookingId}'`;
            await sequelize.query(updateBookingQuery, { type: sequelize.QueryTypes.UPDATE, transaction });
        });

        res.redirect("/pnrnumber");
    } catch (error) {
        console.error("Failed to update payment status:", error);
        res.status(500).send("Failed to update payment status");
    }
};


  // ticket search
  exports.ticketprints = async (req,res)=>{
    const {ticketPin} = req.body
  

  searchticket = await customers.findAll({
    where: {
        id: ticketPin,
        paymentstatus:"paid"
    
       
    }
})
if (!searchticket || searchticket.length === 0) {
req.flash('pnrerror','*No ticket found*')
res.redirect("/pnrnumber")

}


res.render("../views/frontend/ticketprint",{ ticketinfo: searchticket[0] })

}

exports.pnrnumber= (req,res)=>{
  const[pnrerror]=req.flash("pnrerror") 
  res.render("../views/frontend/pnrnumber",{pnrerror})
}

exports.esewafailure= async(req,res)=>{
  const busid= req.cookies.busid
  const seats = req.cookies.seat.split(',').map(seat => seat.trim());
  const bookingId=req.cookies.bookingId
     
    try {
      // Start transaction
      await sequelize.transaction(async (transaction) => {
          // Update all seats in one query
          const seatsPlaceholder = seats.map(() => '?').join(', ');
          const updateQuery = `UPDATE busseats_${busid} SET paymentstatus='unpaid' WHERE seat IN (${seatsPlaceholder})`;
          await sequelize.query(updateQuery, { replacements: seats, type: sequelize.QueryTypes.UPDATE, transaction });

          // Update booking payment status
          const updateBookingQuery = `UPDATE bookings SET paymentstatus='unpaid' WHERE id = '${bookingId}'`;
          await sequelize.query(updateBookingQuery, { type: sequelize.QueryTypes.UPDATE, transaction });
      });

      res.render("../views/frontend/esewafailure")
  } catch (error) {
      console.error("Failed to update payment status:", error);
      res.status(500).send("Failed to update payment status");
  }
};
 

      
  






  
  