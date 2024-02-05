module.exports = (sequelize, DataTypes) => {
    const businfos = sequelize.define("businfo", {
      busname: {
        type: DataTypes.STRING,
      
      },
      
      contact:{
        type:DataTypes.INTEGER,
       
        
        
      },
      busnumber: {
        type: DataTypes.STRING,
        unique: true, 
        
      }


    

    
    });
    return businfos;
  };