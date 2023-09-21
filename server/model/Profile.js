const mongoose = require("mongoose");
require("dotenv").config();

const ProfileSchema = new mongoose.Schema({
    gender: {
        type:String,
    },
    dateOfBirth: {
        type:String,
    },
    about: {
        type:String,
        trim:true,
    },
    contactNumber: {
        type:Number,
        trim:true,
    },
    professon:{
        type:Number,
        trim:true,
    },
})

module.exports = mongoose.model("Profile",ProfileSchema)