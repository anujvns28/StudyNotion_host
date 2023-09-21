const Course = require("../model/Course");
const Section = require("../model/Section");
const SubSection = require("../model/SubSection")

exports.createSection = async (req, res) => {
    try {
        // fetch data 
        const { sectionName, courseId } = req.body;
        console.log(sectionName,courseId)
        // vallidation
        if (!sectionName || !courseId) {
            return res.status(500).json({
                success: false,
                messege: "all fild are required",

            })
        }
        // create newSEction
        const newSection = await Section.create({ sectionName:sectionName });
        
       
        // upatade course
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId },
            {
                $push: {
                    courseCountant: newSection._id,
                },
            },
            { new: true }
        )
        .populate({
            path: "courseCountant",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        // return response
        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            updatedCourseDetails,
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            messege: "error occured in createSection handler"
        })
    }
}



exports.updateSection = async (req, res) => {
    try {
        //data fectch
        const { sectionName, sectionId,courseId } = req.body;
        console.log(sectionName, sectionId)
        // validation
        if (!sectionName || !sectionId) {
            return res.status(500).json({
                success: false,
                messege: "all fild are required",

            })
        }
        // uptade 
        const uptadetedSection = await Section.findByIdAndUpdate(sectionId,
            {
                sectionName: sectionName,
            },
            { new: true })

        // update corse
        const course = await Course.findById(courseId)
		.populate({
            path: "courseCountant",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        //return res
        return res.status(200).json({
            success: true,
            message: 'Section Updated Successfully',
            data : course
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            messege: "error occured in uptadeSection handler"
        })
    }
}



exports.deleteSection = async (req, res) => {
    try {
        //fetch data
        const { sectionId, courseId }  = req.body;
        // delete 

        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseCountant: sectionId,
			}
		})


        const section =  await Section.findByIdAndDelete(sectionId);

        const course = await Course.findById(courseId)
			.populate({
                path: "courseCountant",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
        //return response
        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
            data:course
        })
    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "Unable to delete Section, please try again",
            error: err.message,
        });
    }
}