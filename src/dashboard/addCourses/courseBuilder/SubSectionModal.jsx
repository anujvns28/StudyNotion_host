import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from "react-icons/rx"
import Upload from '../courseInformation/Upload';
import { createSubSection, updateSubSection } from '../../../service/operations/courseDetailsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../slices/courseSlice';

const SubSectionModal = ({
  shoSubsectionModla,
  subSection=null,
  sectionId,
  add = false,
  view = false,
  edit = false,
}) => {

  const { setValue, register, getValues, handleSubmit, formState: { errors } } = useForm();
    
 useEffect(() =>{
 if(view || edit){
  setValue("lectureTitle",subSection.title);
  setValue("lectureDesc",subSection.description);
 }
 },[])

  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    
    const formData = new FormData();
  
    formData.append("title",data.lectureTitle);
    formData.append("description",data.lectureDesc);
    formData.append("lectureVideo",data.lectureVideo);

    let result
  if(add){
    formData.append("sectionId",sectionId);
     result = await createSubSection(formData,token)
    console.log("subsection resutl......",result)
    
  }else{
    console.log(data)
    formData.append("sectionId",sectionId);
    formData.append("subSectionId",subSection._id);
    result = await updateSubSection(formData,token);
    console.log("updated resutlsubsecion.....",result);

    shoSubsectionModla(false);
  }

  if(result){
    // // update course ........with subsection
    const updatedCourseContent = course.courseCountant.map((section) =>
    section._id === sectionId ? result : section
    // console.log(sectionId,section._id)
      )
     
    const updateCourse = {...course , courseCountant: updatedCourseContent};

    console.log("updatedccccc",updateCourse)

   dispatch(setCourse(updateCourse));
   shoSubsectionModla(false)
   console.log("ccccccccccccc",course)
  }
 
  }

 
  

  

  
  return (
    <div className="pt-64 fixed inset-0 z-[1000] !mt-0 flex items-center justify-center h-screen w-screen  overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className=" my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
          {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => shoSubsectionModla(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}

        <form onSubmit={handleSubmit(onSubmit)}
          className='m-8 flex flex-col gap-7'>
          <div className="flex flex-col space-y-2 ">

            {/* Lecture Video Upload */}
            <Upload
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? subSection.videoUrl : null}
              editData={edit ? subSection.videoUrl : null}
            />
          </div>

          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
            Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
             disabled={view}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
              border-b border-pure-greys-300"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>

          {/* Lecture desc*/}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Description  {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
             disabled={view}
              id="lectureDesc"
              placeholder= "Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="w-full h-[140px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
              border-b border-pure-greys-300"
            />
            {errors.lectureDescs && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
         {
          !view ? ( <button className='flex w-[180px] items-end flex-row  justify-center  gap-x-2 rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900'>
         {
          edit ? "Save Changes" : "save"
         }
        </button>)  : ''
         }

        </form>

      </div>
    </div>
  )
}

export default SubSectionModal
