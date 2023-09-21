import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdNavigateNext } from "react-icons/md"
import { IoAddCircleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { createSection, updateSection } from '../../../service/operations/courseDetailsApi'
import NestedView from './NestedView'
import { setCourse, setStep } from '../../../slices/courseSlice'

const CourseBuilderForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [editSection, setEditSection] = useState(false);
    const [sectionId,setSectionId] = useState(null)
   

    const handleEdit = () => {
        setEditSection(!editSection)
    }

    const goToNext = () => {
        if (course.courseCountant.length === 0) {
          toast.error("Please add atleast one section")
          return
        }
       
        dispatch(setStep(3))
      }

    const handleChangeEditSectionName = (sectionId,sectionName) =>{
     
      setSectionId(sectionId);
      setValue("sectionName", sectionName);
      handleEdit()
    }

    const onSubmit = async (data) => {
        console.log("course", course)
        let result

       if(editSection === false){
        result = await createSection({
            sectionName: data.sectionName,
            courseId: course._id
        }, token);
        console.log("result........", result);

        dispatch(setCourse(result.data.updatedCourseDetails))
        setValue("sectionName", "")

       }else{
        result = await updateSection({
            sectionName: data.sectionName,
             sectionId: sectionId,
             courseId: course._id
        }, token);
        console.log("updated  result........", result);

        dispatch(setCourse(result))
        setValue("sectionName", "")
        handleEdit()
       }


    
    }

    console.log("course",course)

    return (
        <div className="relative space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)}
                className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">
                        Section Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        id="sectionName"
                        placeholder="Add a section to build your course"
                        {...register("sectionName", { required: true })}
                        className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
                        border-b border-pure-greys-300"
                    />
                    {errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Section name is required
                        </span>
                    )}
                </div>

                <div className='flex flex-row gap-5 '>
                    <button className='flex border border-yellow-50 px-5 py-2 flex-row gap-2 items-center justify-center rounded-md '>
                        {
                            editSection ? `${"Edit Section Name"}` : "Create Section"
                        }
                        <IoAddCircleOutline size={20} className="text-yellow-50" />
                    </button>

                    {
                        editSection ?
                            <button onClick={() => handleEdit()}
                                type="button"
                                className="text-sm text-richblack-300 underline"
                            >
                                Cancel Edit
                            </button> : ""
                    }
                </div>

            </form>

            {course.courseCountant.length > 0 && (
                <NestedView handleChangeEditSectionName ={handleChangeEditSectionName} />
            )}

            {/* Next Prev Button{} */}
            <div className="flex justify-end gap-x-3">
                

                <button onClick={goToNext}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Next  <MdNavigateNext />
                </button>

            </div>
        </div>
    )
}

export default CourseBuilderForm
