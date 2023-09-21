import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, fetchCourseCategories } from '../../../service/operations/courseDetailsApi';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import RequirmentFildes from './RequirmentFildes';
import CheapInput from './CheapInput';
import Upload from './Upload';
import { MdNavigateNext } from "react-icons/md"
import { COURSE_STATUS } from '../../../utilit/constant';
import { setCourse, setStep } from '../../../slices/courseSlice';

const CourseInformationFrorm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();



    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([])

    useEffect(() => {
        const getCategory = async () => {
            setLoading(true)
            const category = await fetchCourseCategories();
            setCategory(category.data.allCategory)
            setLoading(false)
        }

        // if (editCourse) {
        //     setValue("courseTitle", course.courseName);
        //     setValue("courseShortDesc", course.courseDescription);
        //     setValue("coursePrice", course.price);
        //     setValue("courseTags", course.tag);
        //     setValue("courseBenefits", course.whatYouWillLearn);
        //     setValue("courseCategory", course.category);
        //     setValue("courseRequirements", course.instructions);
        //     setValue("courseImage", course.thumbnail);
        // }

        getCategory()
    }, [])

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYoutWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)
        
        setLoading(true)

        console.log("printi................",formData)
        const result = await addCourseDetails(formData, token)
        console.log("printing resutl", result)
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result))

        }


    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
        >
            {/* Course Title */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseTitle">
                    Course Title <sup className="text-pink-200">*</sup>
                </label>
                <input
                    id="courseTitle"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", { required: true })}
                    className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
                />

                {errors.courseTitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course title is required
                    </span>
                )}
            </div>

            {/* Course Short Description */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
                    Course Short Description <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    {...register("courseShortDesc", { required: true })}
                    className='w-full h-[140px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
     border-b border-pure-greys-300'
                />
                {errors.courseShortDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Description is required
                    </span>
                )}
            </div>
            {/* Course Price */}

            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="coursePrice">
                    Course Price <sup className="text-pink-200">*</sup>
                </label>
                <div className="relative flex flex-row gap-2">
                    <input
                        id="coursePrice"
                        placeholder="Enter Course Price"
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber: true,
                        })}
                        className=' w-full pl-12  rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
                        border-b border-pure-greys-300'
                    />
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                    
                </div>
                {errors.coursePrice && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Price is required
                    </span>
                )}
            </div>

            {/* Course Category */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseCategory">
                    Course Category <sup className="text-pink-200">*</sup>
                </label>
                <select
                    {...register("courseCategory", { required: true })}
                    defaultValue=""
                    id="courseCategory"
                    className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
                >
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {!loading &&
                        category.map((category, indx) => (
                            <option key={indx} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                </select>
                {errors.courseCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Category is required
                    </span>
                )}
            </div>


            {/* Course Tags */}
            <CheapInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Course Thumbnail Image */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
            />

            {/* Benefits of the course */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
                    Benefits of the course <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    id="courseBenefits"
                    placeholder="Enter benefits of the course"
                    {...register("courseBenefits", { required: true })}
                    className='w-full h-[140px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
     border-b border-pure-greys-300'
                />
                {errors.courseBenefits && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Benefits of the course is required
                    </span>
                )}
            </div>

            {/* Requirements/Instructions */}

            <RequirmentFildes
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                setValue={setValue}
                errors={errors}
                getValues={getValues}
            />

            {/* Next Button */}

            <button className='flex flex-row items-center justify-center  gap-x-2 rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900'>
                Next
                <MdNavigateNext />
            </button>

        </form>
    )
}

export default CourseInformationFrorm
