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
        
     
      
      cost:{
        type:DataTypes.INTEGER,
        allowNull:false
        
        
      }


    

    
    });
    return busroute;
  };