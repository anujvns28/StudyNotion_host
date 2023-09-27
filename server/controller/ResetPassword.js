const jwt = require("jsonwebtoken");
const User = require("../model/User");
const emailSender = require("../uitil/emailSender");
const crypto = require("crypto")
const bcrypt = require("bcrypt")

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body
        const { email } = req.body;
        console.log(email)
        //check user for this email , email validation
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(500).json({
                success: false,
                message: 'Your Email is not registered with us'
            });
        }
        //generate token 
        const token = crypto.randomUUID();
        //update user by adding token and expiration time
        const upteadDetail = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordToken: Date.now() + 5 * 60000
            },
            { new: true },);
        //create url
        const url = `https://study-notion-host-anuj.vercel.app/update-password/${token}`
        //send mail containing the url
        emailSender(email,
            "Password Reset Link",
            `Password Reset Link: ${url}`)
        //return response
        return res.json({
            success: true,
            message: 'Email sent successfully, please check email and change pwd',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while sending reset pwd mail'
        })
    }
}


//resetPassword\

exports.resetPassword = async (req, res) => {
    try {
          //data fetch
        const {password, confirmPassword, token} = req.body;
        console.log(password,confirmPassword)
        //validation
        if(password !== confirmPassword) {
            return res.status(500).json({
                success:false,
                message:'Password not matching',
            });
        }
        //get userdetails from db using token
        const userDetails = await User.findOne({token: token});
        //if no entry - invalid token
        if(!userDetails) {
            return res.status(500).json({
                success:false,
                message:'Token is invalid',
            });
        }
        //token time check 
        if( userDetails.resetPasswordExpires < Date.now()  ) {
                return res.status(500).json({
                    success:false,
                    message:'Token is expired, please regenerate your token',
                });
        }
        //hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);

        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        //return response
        return res.status(200).json({
            success:true,
            message:'Password reset successful',
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while resecting pwd'
        })
    }
}