module.exports = (sequelize, DataTypes) => {
    const feedbacks = sequelize.define("feedback", {
      name: {
        type: DataTypes.STRING,
      
      },
      
      email:{
        type:DataTypes.STRING,
       
        
        
      },
      message: {
        type: DataTypes.STRING,
       
        
      }


    

    
    });
    return feedbacks;
  };