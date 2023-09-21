const mongoose = require("mongoose");
require("dotenv").config();

const CourseSchema = new mongoose.Schema({
   CourseName:{
    type:String,
   },

   courseDescription:{
    type:String,
    required:true
   },

   instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },

   price:{
    type:Number,
   },

   thumbnail:{
    type:String,
   },
   tag: {
		type: [String],
		required: true,
	},
   category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Category",
   },

   whatYouWillLearn: {
    type:String,
   },

   courseCountant:[{
   type: mongoose.Schema.Types.ObjectId,
   ref:"Section",
   }],

   ratingAndReviews:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReviews",
   }],

   enrolledStudents:[
    {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
    }
   ],
   status: {
		type: String,
		enum: ["Draft", "Published"],
	},
   createdTime:{
      type:Date,
      default:Date.now()
   }
})

module.exports = mongoose.model("Course",CourseSchema)