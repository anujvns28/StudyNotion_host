const User = require("../model/User");
const Course = require("../model/Course");
const Category = require("../model/Category");
const { uploadImageToCloudinary } = require("../uitil/imageUploader");
const Section = require("../model/Section");
const SubSection = require("../model/SubSection");

exports.createCourse = async (req, res) => {
    try {
        // fetch data
        const {
            courseName,
            courseDescription,
            whatYoutWillLearn,
            price,
            tag,
            category,
            instructor,
            status
        } = req.body;


        // file upload
        console.log(req.files)
        const thumbnail = req.files.thumbnailImage
        console.log("printing thumbnail....", thumbnail)
        // vallidation
        if (
            !courseName ||
            !courseDescription ||
            !whatYoutWillLearn ||
            !price ||
            !tag ||
            !category ||
            !thumbnail
        ) {
            return res.status(500).json({
                success: false,
                message: "All filled are required to buliding course"
            })
        }
        if (!status || status === undefined) {
            status = "Draft"
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findOne({ _id: userId });
        console.log("instructorDetails =>", instructorDetails);

        if (!instructorDetails) {
            res.status(200).json({
                success: false,
                message: "instructor detail is not found"
            })
        }

        //check given tag is valid or not
        const categoryDetails = await Category.findOne({ _id: category });
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: 'category Details not found',
            });
        }
        console.log(categoryDetails)
        // upload image to cloudanry
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log(courseName)

        //create an entry for new Course
        const newCourse = await Course.create({
            CourseName: courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYoutWillLearn,
            price: price,
            tag: tag,
            status: status,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

        //add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true },
        );

        //update the TAG ka schema 
        await Category.findByIdAndUpdate({ _id: category },
            {
                $push: {
                    course: newCourse._id,
                }
            },
            { new: true }
        )
        console.log("Printing")
        // return response
        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse,
        });
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: "error in  Course Creation",
            error: err.message
        });
    }
}

// editcourse
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        // If Thumbnail Image is found, update it
        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }

        await course.save()

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additinaolDetail",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseCountant",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}


// getall courses

exports.showAllcourse = async (req, res) => {
    try {
        const allCourses = await Course.find({}).populate("instructor").exec();
        return res.status(200).json({
            success: true,
            message: 'Data for all courses fetched successfully',
            data: allCourses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Cannot Fetch course data',
            error: error.message,
        })
    }
}



//getcorseDetails

exports.getCourseDetails = async (req, res) => {
    try {
        //get courseid
        const { courseId } = req.body;
        //ftech course Details
        const coursedetails = await Course.findById(courseId)
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additinaolDetail"
                    }
                }
            )
            .populate("category")
            .populate("ratingAndReviews")
            .populate(
                {
                    path: "courseCountant",
                    populate: {
                        path: "subSection"
                    }
                }
            ).exec();

        //validations
        if (!coursedetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            });
        }
        //return response
        return res.status(200).json({
            success: true,
            message: "Course Details fetched successfully",
            data: coursedetails,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 }).populate(
            {
                path: "courseCountant",
                populate: {
                    path: "subSection"
                }
            }
        ).exec();

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body

      console.log("courseidddd",courseId)
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
     
  
      // Delete sections and sub-sections
      const courseSections = course.courseCountant
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }



  exports.delteCourseByStudent = async(req,res) =>{
     try{
    const userId = req.user.id
    const {courseId} = req.body;
    const course_Id = new mongoose.Types.ObjectId(courseId);
    const user_id = new mongoose.Types.ObjectId(userId);
    console.log(userId)
    const userDetails = await User.findByIdAndUpdate(userId,{
        $pull:{
            course : course_Id
        } 
    } ,{new:true}
    )

    const courseDetails = await Course.findByIdAndUpdate(courseId,{
        $pull:{
            enrolledStudents : user_id
        }
    },{new:true})
    console.log(userId)
    console.log("this is courseid",courseDetails)

    return res.status(200).json({
        success:true,
        message:"successfull "
    })
     }catch(err){
        return res.status(500).json({
            success:false,
            message:err
        })
     }
  }