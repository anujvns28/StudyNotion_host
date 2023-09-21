const RatingAndReviews = require("../model/RatingAndReviews");
const Course = require("../model/Course");
const User = require("../model/User");
const { default: mongoose } = require("mongoose");

//crete ratingand review
exports.createRatingAndReviews = async (req, res) => {
    try {
        //get data
        const { courseId, rating, review } = req.body;
        const userId = req.user.id;
        //vallidation
        // 1 => check user enroolled or not
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                enrolledStudents: { $elemMatch: { $eq: userId } }
            });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'Student is not enrolled in the course',
            });
        }
        // 2 => check  student is arlready reviewed
        const alreadyReviewd = await RatingAndReviews.findOne({
            user: userId,
            course: courseId
        });
        if (alreadyReviewd) {
            return res.status(403).json({
                success: false,
                message: 'Course is already reviewed by the user',
            });
        }
        //create rating and reviews
        const ratingReview = await RatingAndReviews.create({
            rating, review,
            course: courseId,
            user: userId
        })

        //update course with this rating/review
        const upatadeCourse = await Course.findByIdAndUpdate({ courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id
                }
            },
            { new: true })
        // return response\
        return res.status(200).json({
            success: true,
            message: "Rating and Review created Successfully",
            ratingReview,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}




//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
        //get course id
        const { courseId } = req.body;
        //cacaulate average rating
        const result = await RatingAndReviews.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ])
        //return response
        if (result.length > 0) {

            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })

        }

        //if no rating/Review exist
        return res.status(200).json({
            success: true,
            message: 'Average Rating is 0, no ratings given till now',
            averageRating: 0,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}



//getAllRatingAndReviews
exports.getAllRreviews = async (req, res) => {
    try {
        const allReviews = await RatingAndReviews.find({},)
            .populate({
                path: "User",
                slect: "firstName lastName email image"
            })
            .populate({
                path: "Course",
                slect: "courseName"
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}