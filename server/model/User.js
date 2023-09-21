const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
      
    },
    password:{
        type:String,
        required:true    
    },
    token :{
        type:String,
    },
    resetPasswordExpires: {
        type:Date,
    },
    accountType:{
        type:String,
        enum:["Admin", "Student", "Instructor"],
        required:true
    },
    additinaolDetail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    course:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    courseProgress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    },
    image:{
        type:String,
    }
})

module.exports = mongoose.model("User",userSchema)