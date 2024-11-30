const dbconfig = require("../config/dbconfig");
const{ Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {

    host: dbconfig.HOST,
    dialect: dbconfig.Dialect,
    operatorsAliases: false,

    pool:{
        max: dbconfig.max,
        min:dbconfig.min,
        acquire: dbconfig.acquire,
        idle:dbconfig.idle,


    },

});
sequelize
.authenticate()
.then(()=>{
    console.log("connection sucessfuly!!");


})
.catch((err)=>{
    console.log("error" + err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import model file 
db.busroutes= require("./busroute.js")(sequelize, DataTypes);
db.businfos= require("./businfo.js")(sequelize, DataTypes);
db.userlogins= require("./userlogin.js")(sequelize, DataTypes);
db.customers= require("./booking.js")(sequelize, DataTypes);
db.feedbacks= require("./feedback.js")(sequelize, DataTypes);
db.adminlogins= require("./adminlogin.js")(sequelize, DataTypes);


// relationship 
db.businfos.hasMany(db.busroutes)
db.busroutes.belongsTo(db.businfos)


db.sequelize.sync({ force:false}).then(() => {
  console.log("yes re-sync done")
})

module.exports = db;