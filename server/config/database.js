const mongoose = require("mongoose");
require("dotenv").config();

exports.dbconnect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) =>{
        console.log("Err occured in database cunnocion" , err)
        console.log(err.message)
    })
}