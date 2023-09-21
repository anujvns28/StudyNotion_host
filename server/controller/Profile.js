const Course = require("../model/Course");
const Profile = require("../model/Profile");
const User = require("../model/User");
const { uploadImageToCloudinary } = require("../uitil/imageUploader");

exports.uptadeProfile = async (req, res) => {
    try {
        //data fetching
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        // get userId
        const id = req.user.id;
        console.log("updd",req.body)
    
        //validation
        if (!id || !contactNumber || !gender) {
            return res.status(500).json({
                success: false,
                messege: "all filled are required"
            })
        }
        // upadate profile
        const userDetail = await User.findOne({ _id:id }).populate("additinaolDetail").exec()
        console.log(userDetail)
        const profileId = req.user.additinaolDetail;
        
        const profileDetail = await Profile.findById({ _id:profileId });
        console.log("profileId =>", profileDetail)

        profileDetail.dateOfBirth = dateOfBirth;
        profileDetail.about = about;
        profileDetail.gender = gender;
        profileDetail.contactNumber = contactNumber;
        await profileDetail.save();
        
        userDetail.additinaolDetail = profileDetail;
        //return response
        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
           userDetail,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}


//----------------_______________________________________-------------------------------

exports.deleteAccount = async (req, res) => {
    try {
        // get id

        const id = req.user.id;
        const userDetail = await User.findById({_id:id  });

        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        await Profile.findByIdAndDelete({ _id: userDetail.additinaolDetail._id });
        await User.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            message: 'User Deleted Successfully',
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User cannot be deleted successfully',
        });
    }
}



//-----------------_____________________________________________----------------------------------


exports.getAllUserDetails = async (req, res) => {

    try {
        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additinaolDetail").exec();
       
        //return response
        return res.status(200).json({
            success: true,
            message: 'User Data Fetched Successfully',
            data: userDetails
        });
        

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//update Profile Picture
exports.upDateDisplayPicture = async (req, res) => {
    try {
        // get picture
        console.log(req.files,"files")
        const image = req.files.displayPicture;
        // get userId
        const  userId  = req.user.id;
        console.log("this is user id",req.user.id,image)
        //upload to cloudnery
        const uploadImage = await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        //update profile

        const updateProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: uploadImage.secure_url },
            { new: true }
        )
        //return responser
        return res.status(200).json({
            success: true,
            message: "Profile Imgae Updated Successfully",
            data: updateProfile
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}



// get enrolled course by user
exports.getEnrolledCourse = async (req, res) => {
    try {
        const userId = req.user.id
        const userDetails = await User.findOne({
          _id: userId,
        })
        .populate(
            {
                path: "course",
                populate: {
                    path: "courseCountant"
                },
            } 
        )
        .populate(
            {
                path: "course",
                populate: {
                    path: "instructor"
                },
            } 
        )
        .exec();
        if (!userDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
          })
        }
        console.log(userDetails)
        return res.status(200).json({
          success: true,
          data: userDetails.course,
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
}

exports.insTurctorDashboard = async(req,res) => {
    try{
       
    const courses = await Course.find({instructor:req.user.id,status :"Published"},);

    const courseData = courses.map((course)=>{
        const totalStudentsEnrolled = course.enrolledStudents.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price

        const courseDataWithStats = {
            _id: course._id,
            courseName: course.CourseName            ,
            courseDescription: course.courseDescription,
            // Include other course properties as needed
            totalStudentsEnrolled,
            totalAmountGenerated
          }
    
          return courseDataWithStats
    })

    console.log(courseData)
    

   
    return res.status(200).json({
        success:true,
        message:"InsturcorDetals fetch successfully ",
        data:courseData
    })
    }catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"errro occerd in fatchign insturctor Dasbord Details"
    })
    }
}