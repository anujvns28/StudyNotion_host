const nodemailer = require("nodemailer");
const otpTemplate = require("../mail/templet/emailVarifactionTemplet");
require('dotenv').config()

const emailSender = async(email,title,body) =>{
    console.log("i am inside the email sender",process.env.MAIL_HOST)
    try{
     let transport = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
     })
console.log("body hai bhaiy",email)
     let info = await transport.sendMail({
        from: `${'StudyNotion || CodeHelp '}`,
        to:`${email}`,
        subject: `${title}`,
        html: `${body}`,
    })
console.log("info hai bhaiya",info);
   return info;

    }catch(err){
        console.log("error occured in sending");
    }
}

module.exports = emailSender;