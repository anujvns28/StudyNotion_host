const mongoose = require("mongoose");
const emailSender = require("../uitil/emailSender");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 15 * 60,
    }
});

async function sendVarifaction(email, otp) {
    try {

        const mailResopnse = emailSender(email, "Verification Email from StudyNotion", otp)
        console.log(mailResopnse)

    } catch (err) {
        console.log("err occured in sendig email",
         err.message);
    }

    OTPSchema.pre("save", async function (next) {
        sendVarifaction(this.email, this.otp)
        next();
    })
}



module.exports = mongoose.model("OTP", OTPSchema)