const { busroutes, userlogins } = require("../../model");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

  exports.datecheck = (req,res)=>{

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() );
  
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const yyyy = tomorrow.getFullYear();
  
   
  
      res.render("../views/frontend/home",{ minDate: `${yyyy}-${mm}-${dd}` })
  }

  // search source and destination from the user


   exports.searchsd =async (req,res)=>{
    const{ source, destination, date}= req.body
    if (source === "" || destination === "" || date === "") {
      res.send("All fields are required.")
  }else  if (typeof source !== 'string' || !isNaN(source) || typeof destination !== 'string' || !isNaN(destination)) {
  res.send('Source and destination must be strings and cannot be numbers.')
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
       res.send('No matching routes found.')
      }
    
        res.render("../views/frontend/search",{ search: searchData });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred.");
    }
  }
  }

    
// render the seat layout 

exports.seatlayout =(req,res)=>{
 res.render("../views/frontend/seat")
 }

// render the frontend user login page 

exports.userlogin = (req,res)=>{

    res.render("../views/login/login")
  }

  // post the data 

  exports.userlogincheck = async (req,res) => {
 const {email, password } =req.body
 console.log(email, password)
 if(!email || !password){
  return res.send("both input field are required")
 }
     const user = await userlogins.findAll({
      where:{
        Email:email
      }

     })
     if(user.length == 0){
      res.send("no user exits with that email")

     }else{
     const Ismatched = bcrypt.compareSync(password,user[0].password)
     
     if(Ismatched){
      var token = jwt.sign({id:user[0].id}, 'thisisthesecreatekeydontshare',{
        expiresIn: "1d"
      })
      res.cookie('token', token)
      res.redirect("/")

     }else{
      res.send("email or password is invalid ")
     }
    }

     

  }
  // render the register page 

  exports.renderegister =(req,res)=>{

    res.render("../views/login/register")
  }

  // add the data of user from the register page
  exports.adduserdata = async (req,res)=>{

    const{Email, password, cpassword} =req.body

    const checkemail =await userlogins.findAll({

      where:{
        Email:Email
      }
    })
    if(!checkemail.length==0){
       return res.send("this email is already register")
    }else if (!Email || !password || !cpassword) {
      res.send ('All fields are required.')
  }
  else if (password !== cpassword) {
     
    res.send('Passwords do not match') 
}else if (password && password.length < 6) {
  res.send('Password must be at least 6 characters long.')
  }
  else{
  
  
  
  
  
  
  await userlogins.create({
  Email:Email,
  password: bcrypt.hashSync(password,12)
  
  
  
  
  })
  res.render("../views/login/login")
}
}
  
  
