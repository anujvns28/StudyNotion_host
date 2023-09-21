const SubSection = require("../model/SubSection");
const Section = require("../model/Section");
const Course = require("../model/Course");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../uitil/imageUploader");


exports.createSubsection = async (req, res) => {
    try {
        // data fetching
        const { sectionId, title, description } = req.body;
        // file fetching
         const vidio = req.files.lectureVideo;
        console.log("req.body......................",req.body)
        // validation
        if (!sectionId || !title  || !description || 
            !vidio) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        // uploade vidio to clodunary
        const uploadDetails = await uploadImageToCloudinary(vidio, process.env.FOLDER_NAME);
        // create
        const newSubsection = await SubSection.create({
            title: title,
            description: description,
            timeDuration: `${uploadDetails.duration}`,
            videoUrl: uploadDetails.secure_url
        })
        // puss in sectionson 
        const upatadeDetails = await Section.findByIdAndUpdate(sectionId,
            {
                $push: {
                    subSection: newSubsection._id
                }
            },
            { new: true }
        ).populate("subSection").exec();
        console.log(upatadeDetails);

        // return response
        return res.status(200).json({
            succcess: true,
            message: 'Sub Section Created Successfully',
            data: upatadeDetails,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message,
        })
    }
}



exports.uptadeSubsection = async (req, res) => {
    try {
        const { sectionId,subSectionId, title, description } = req.body;

        console.log(sectionId,subSectionId, title, description)
        console.log("req.body......................",req.files)
        const subSection = await SubSection.findById(subSectionId)
    
        if (!subSection) {
          return res.status(404).json({
            success: false,
            message: "SubSection not found",
          })
        }
    
        if (title !== undefined) {
          subSection.title = title
        }
    
        if (description !== undefined) {
          subSection.description = description
        }
        if (req.files && req.files.lectureVideo !== undefined) {
          const video = req.files.lectureVideo
          const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
          )
          subSection.videoUrl = uploadDetails.secure_url
          subSection.timeDuration = `${uploadDetails.duration}`
        }
    
        await subSection.save()
    
        const updatedSection = await Section.findById(sectionId).populate("subSection");

        console.log("updatedsection..........",updatedSection)
  
  
        return res.json({
          success: true,
          data:updatedSection,
          message: "Section updated successfully",
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while updating the section",
        })
      }
}



exports.deletSubsection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate(
          { _id: sectionId },
          {
            $pull: {
              subSection: subSectionId,
            },
          }
        )
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
    
        if (!subSection) {
          return res
            .status(404)
            .json({ success: false, message: "SubSection not found" })
        }
  
        const updatedSection = await Section.findById(sectionId).populate("subSection")
    
        return res.json({
          success: true,
          data:updatedSection,
          message: "SubSection deleted successfully",
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while deleting the SubSection",
        })
      }
}