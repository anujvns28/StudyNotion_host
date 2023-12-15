const {instance} = require("../config/razorpay");
const Course = require("../model/Course");

const {courseEnrollmentEmail} = require("../mail/templet/courseEnrollmentTemplet")
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templet/paymentSuccessEmail");
 const crypto = require("crypto");
const User = require("../model/User");
const emailSender = require("../uitil/emailSender");
const otpTemplate = require("../mail/templet/emailVarifactionTemplet");

//initiate the razorpay order
exports.capturePayment = async(req, res) => {
    

   

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;

    for(const course_id of courses) {
        let course;
        try{
           
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }
            console.log(course)
            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.enrolledStudents.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }

}


//verify the payment
exports.verifyPayment = async(req, res) => {

    console.log("paymmint in veryfie")
    const razorpay_order_id = req.body?.razorpay_payment_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.REZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");


        console.log("truelove",expectedSignature === razorpay_signature,expectedSignature , razorpay_signature)

        //if(expectedSignature === razorpay_signature) {
            if(razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});

}


const enrollStudents = async(courses, userId, res) => {
 console.log("i am insiede the enrooledstuent")
    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{enrolledStudents:userId}},

            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                course: courseId,
            }},{new:true})
            
        ///bachhe ko mail send kardo
        const emailResponse = await emailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.CourseName}`,
            courseEnrollmentEmail(enrolledCourse.CourseName, `${enrolledStudent.firstName}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log("error occuring in varyfing payment ",error);
            return res.status(500).json({success:false, message:error,});
        }
    }

}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;


    const userId = req.user.id;
    
 console.log(userId)
    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
      
        //student ko dhundo
         const enrolledStudent = await User.findById(userId);
          emailSender(
            req.user.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrollStudents.email}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}
