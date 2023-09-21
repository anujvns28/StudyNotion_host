// import the required module
const express = require("express");
const router = express.Router();

// import the controllers

// 1 => Course conrollers import
const { 
    createCourse,
    showAllcourse,
    getCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
    delteCourseByStudent
} = require("../controller/Course");

// 2 => Categories Controllers import
const {
    createCategory,
    showAllCategories,
    showAllCategoriesDetails
} = require("../controller/Category");

// 3 => section Controllers import
const {
    createSection,
    updateSection,
    deleteSection
} = require("../controller/Sectopm");

// 4 => SubSection Controllers import
const {
    createSubsection,
    uptadeSubsection,
    deletSubsection
} = require('../controller/SubSection');

// 5 => Rating Controllers import
const {
    createRatingAndReviews,
    getAverageRating,
    getAllRreviews
} = require("../controller/RatingAndReviews");

// importing middleweare 
const {auth,isAdmin,isInstructor,isStudent} = require("../middleware/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

//course only created by insturcoture
router.post("/createCourse",auth,isInstructor,createCourse);
// updated course
router.post("/updateCourse",auth,isInstructor,editCourse);
//get insturcotr courses
router.post("/deleteCourse",auth,isInstructor,deleteCourse);
//delte course
router.get("/getInstructorCourses",auth,  isInstructor, getInstructorCourses);
//add a section to  course
router.post("/addSection",auth,isInstructor,createSection);
//Edit section
router.post("/updateSection",auth,isInstructor,updateSection);
//delete section
router.post("/deleteSection",deleteSection);
//add sub Section to section
router.post("/addSubSection",auth,isInstructor,createSubsection);
//Edit sub Section
router.post('/updateSubSection',auth,isInstructor,uptadeSubsection);
//delete sub section
router.post("/deleteSubSection",auth,isInstructor,deletSubsection);
// Get all Registered Courses
router.get("/getAllCourse",showAllcourse);
//Get Detils for specific course
router.post("/getCourseDetails",getCourseDetails);
router.post("/deleteCourseByStudent",auth,isStudent,delteCourseByStudent)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

// Category can Only be Created by Admin
router.post("/createCategory",auth,isAdmin,createCategory);
// get all Category
router.get("/showallCategory",showAllCategories);
// get  category wise page Details
router.post("/getCategoryWisePageDetails",showAllCategoriesDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

//create Rating and review
router.post("/createRating",auth,isStudent,createRatingAndReviews);
//get average rating and review
router.get("/getAverageRating",getAverageRating);
//get all rating and review
router.get("/allRating",getAllRreviews);

module.exports = router;