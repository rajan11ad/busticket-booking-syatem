module.exports = (sequelize, DataTypes) => {
    const customer = sequelize.define("booking", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull : false,
      },
      mobile_No: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      boarding_point:{
        type:DataTypes.STRING,
        
    },
    seat:{
      type:DataTypes.STRING
      },
      Amount:{
        type:DataTypes.STRING
      },
      route: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      busnumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      bus_name: {
        type: DataTypes.TEXT,
        allowNull:false,
      }, 
      paymentstatus: {
        type: DataTypes.STRING,
      
      },
      depature_date:{
        type:DataTypes.DATEONLY,
        
    }

        
  

    

    
    });
    return customer;
  };