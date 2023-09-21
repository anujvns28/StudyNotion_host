const express = require("express");
const router = express.Router();

const {
    getAllUserDetails,
    uptadeProfile,
    deleteAccount,
    getEnrolledCourse, 
    upDateDisplayPicture,
    insTurctorDashboard} = require("../controller/Profile");
const { auth, isInstructor } = require("../middleware/auth");


//get user details
router.get("/getUserAllDetails", auth, getAllUserDetails);
//update user Profile
router.put("/updateProfile", auth, uptadeProfile);
//delete user profiel
router.delete("/deleteProfile", auth, deleteAccount);
//update Profile Picture
router.put("/updateProfilePicture", auth,upDateDisplayPicture);
// get Enrolled Courses
router.get("/enrolledCourses", auth, getEnrolledCourse);

router.get("/insTurctorDashboard", auth,isInstructor, insTurctorDashboard);

module.exports = router;
