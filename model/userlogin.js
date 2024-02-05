module.exports = (sequelize, DataTypes) => {
    const userlogins = sequelize.define("userlogin", {
      Email: {
        type: DataTypes.STRING,
      
      },
      
      password:{
        type:DataTypes.STRING,
       
        
        
      },
      cpassword: {
        type: DataTypes.STRING,
        
      }


    

    
    });
    return userlogins;
  };