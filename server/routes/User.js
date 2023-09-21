const express = require("express");
const router = express.Router();

const { login, signup, sendOtp, chengePassword } = require("../controller/Auth");
const { auth } = require("../middleware/auth");
const { resetPasswordToken, resetPassword } = require("../controller/ResetPassword");


// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

//routes for user login
router.post("/login",login);
//routes for singup
router.post("/signup",signup);
// sending opt
router.post("/sendOtp",sendOtp);
//routes for chenge Password
router.post("/chengePassword",auth,chengePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token",resetPasswordToken );

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Export the router for use in the main application
module.exports = router;