module.exports = (sequelize, DataTypes) => {
    const busroute = sequelize.define("busroute", {
      source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destinatin: {
        type: DataTypes.STRING,
        allowNull : false,
      },
      bus_name: {
        type: DataTypes.TEXT,
        allowNull:false,
      },
      depature_date:{
        type:DataTypes.DATEONLY,
        
    },
        
    seat: {
      type: DataTypes.STRING,
      allowNull : false,
    },
    time: {
      type: DataTypes.STRING,
      
    },
    bus_number: {
      type: DataTypes.STRING,
     
    },
      
      cost:{
        type:DataTypes.STRING,
        allowNull:false
        
        
      }


    

    
    });
    return busroute;
  };