const mongoose = require("mongoose");
require("dotenv").config();

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description: {
        type:String,
    },
    course:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    link:{
        type:String
    }
})

module.exports = mongoose.model("Category",categorySchema)