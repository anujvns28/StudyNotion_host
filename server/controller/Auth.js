const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenrator = require("otp-generator");
const OTP = require("../model/OTP");
const emailSender = require("../uitil/emailSender");
const Profile = require("../model/Profile");
const otpTemplate = require("../mail/templet/emailVarifactionTemplet");
require("dotenv").config()


// send opt
exports.sendOtp = async (req, res) => {
    try {
        // fetching emai form req body 
        const { email } = req.body;
        // console.log("periting req---------->",req.body)
        // check if user is already exist
        const checkUserAlereadyPresent = await User.findOne({ email })
        if (checkUserAlereadyPresent) {
            return res.status(401).json({
                success: false,
                message: "User alerady exist"
            })
        }
        console.log("printing", email)
        // generate otp
        var otp = otpGenrator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        // check otp is already jenerat

        const result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenrator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
        }

        // create entry in db
        const otpPayload = { email, otp }

        const otpBody = await OTP.create(otpPayload);

        emailSender(email, "Verification Email", otpTemplate(otp))

        // return response
        res.status(200).json({
            success: true,
            message: "otp Sent successfully",
            otp
        })


    } catch (err) {
        console.log("err in generatin oto", err)
        return res.status(500).json({
            success: false,
            message: err.message,
        })

    }
}

//------------------------------________________------------------------------------------
// signup

exports.signup = async (req, res) => {
    try {
        // fetching data form req  body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;


        // vallidation 
        if (!email.includes("@gmail.com")) {
            return res.status(500).json({
                success: false,
                message: "This is not vallied email ",
            })
        }
        else if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(500).json({
                success: false,
                message: "Alll filled are required ,try again",
            })
        }
        // password match karo
        if (password !== confirmPassword) {
            return res.status(500).json({
                success: false,
                message: "Password are not matched",
            })
        }
        // find most resent otp

        const resentOtp = await OTP.findOne({ email: email }).sort({ createdAt: -1 }).limit(1);
        console.log("otp,,,,,,,,,,,", resentOtp.otp);

        //otp vallidation
        if (resentOtp.length === 0) {
            return res.status(500).json({
                success: false,
                message: "otp not find",
            })
        }
        else if (otp !== resentOtp.otp) {
            return res.status(500).json({
                success: false,
                message: "invallied otp",
            })
        }


        // check user already exist
        const user = await User.findOne({ email });
        if (user) {
            return res.status(500).json({
                success: false,
                message: "this user name is already rejustered, Sign in",
            })
        }
        // hasssing password
        const haspass = await bcrypt.hash(password, 10);
        // entry created in db

        const profileDetail = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        console.log(profileDetail)
        const response = await User.create({
            firstName,
            lastName,
            email,
            password: haspass,
            accountType: accountType,
            additinaolDetail: profileDetail,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`
        })
        console.log(response);

        // send res
        return res.status(200).json({
            success: true,
            message: "Entry creatd successfully ",
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be registrered. Please try again",
        })
    }
}

//------------------------------________________------------------------------------------

// login

exports.login = async (req, res) => {
    // fetch data
    try {
        const { email, password } = req.body;

        // vallidation
        if (!email.includes("@gmail.com")) {
            return res.status(500).json({
                success: false,
                message: "Invallied email",
            })
        } else if (!email || !password) {
            return res.status(500).json({
                success: false,
                message: "All filled required",
            })
        }
        // check user alreday exisst or not
        const user = await User.findOne({ email }).populate("additinaolDetail").exec()



        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User is not Rejustered",
            })
        }
        // jenrate jwt after match password
        console.log(user)
        console.log("printing")
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
            additinaolDetail: user.additinaolDetail._id
        }
        
      
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(payload, process.env.JWT_SERCET, {
                expiresIn: "2h"
            })
            user.token = token;
            user.password = undefined;
            console.log('this is jwt',process.env.JWT_SERCET)
            // send cookie in res
            console.log(token,"login token")
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                messege: "Loged in successfully"

            })
        }
        else {
            return res.status(500).json({
                success: false,
                message: "passowrd is not matched",
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Login Failure, please try again',
        });
    }
}

// _______________________------------------------____________________________

// chenge passowrd

exports.chengePassword = async (req, res) => {
    try {

        // fetchig daata
        const { email, oldPassword, newPassword } = req.body;


        // vallidition
        if (!oldPassword || !newPassword) {

            return res.status(500).json({
                success: false,
                message: 'all filled are required'
            });

        }
        // password matched with db passowrd
        // updatd password in db
        const user = await User.findOne({ email: email });

        console.log("user.......", user)
        const haspassword = await bcrypt.hash(newPassword, 10)
        console.log(haspassword)

        if (await bcrypt.compare(oldPassword, user.password)) {

            await User.findByIdAndUpdate(
                { _id: user._id },
                { password: haspassword },
                { new: true }
            )


        } else {
            return res.status(500).json({
                success: false,
                message: "old Password is not matching"
            })
        }

        // send upted password email
        emailSender(email, "StudyNotion - Anuj Yadav", "Your password  uptead successfully")

        // send response  
        return res.status(200).json({
            success: true,
            message: "Password uptedad successfully",
            user
        })
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'err in ching password',
        });
    }
}

