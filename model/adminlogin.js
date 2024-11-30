module.exports = (sequelize, DataTypes) => {
    const adminlogins = sequelize.define("adminlogin", {
        username: {
            type: DataTypes.STRING,
          
          },
      email: {
        type: DataTypes.STRING,
      
      },
      
      password:{
        type:DataTypes.STRING,
       
        
        
      },
      cpassword: {
        type: DataTypes.STRING,
        
      }


    

    
    });
    return adminlogins;
  };