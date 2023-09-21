import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserEnrolledCourses } from '../service/operations/enrolledCourseData'
import ProgressBar from '@ramonak/react-progress-bar'
import { RiDeleteBin6Line } from "react-icons/ri"
import ConfirmationModel from '../components/common/ConfirmationModel'
import { deleteCourse, delteCourseByStudent } from '../service/operations/courseDetailsApi'
const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [modalData,setModalData] = useState(null)

    const [enrolledCourses, setEnrolledCourses] = useState(null)
    const getEnrolledCourses = async () => {
        try {
            const res = await getUserEnrolledCourses(token);

            setEnrolledCourses(res);
        } catch (error) {
            console.log("Could not fetch enrolled courses.")
        }
    };
    useEffect(() => {
        getEnrolledCourses();
    }, [])

    const handleDeleteCourse = async(courseId) => {
      await delteCourseByStudent({courseId:courseId},token)
      getEnrolledCourses();
      setModalData(null)
    }

    return (
        <>
            <div className="text-3xl text-richblack-50">Enrolled Courses</div>
            {!enrolledCourses ? (
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                    <div className="spinner"></div>
                </div>
            ) : !enrolledCourses.length ? (
                <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                    You have not enrolled in any course yet.
                    {/* TODO: Modify this Empty State */}
                </p>
            ) : (
                <div className="my-8 text-richblack-5">
                    {/* Headings */}
                    <div className="flex  rounded-t-lg bg-richblack-500 items-center justify-between flex-row ">
                        <p className=" px-5 py-3">Course Name</p>
                        <p className=" px-2 py-3 pr-48">Insturctor Name</p>
                    </div>
                    {/* Course Names */}
                    {enrolledCourses.map((course, i, arr) => (
                        <div
                            className={`flex relative items-center border pr-2 justify-between border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                }`}
                            key={i}
                        >
                            <div onClick={() => navigate(`/view-course/${course._id}/${course.courseCountant[0].subSection[0]}`)}
                                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"

                            >
                           
                                <img
                                    src={course.thumbnail}
                                    alt="course_img"
                                    className="h-14 w-14 rounded-lg object-cover"
                                />
                                <div className="flex max-w-xs flex-col gap-2">
                                    <p className="font-semibold">{course.CourseName}</p>
                                    <p className="text-xs text-richblack-300">
                                        {course.courseDescription.length > 50
                                            ? `${course.courseDescription.slice(0, 50)}...`
                                            : course.courseDescription}
                                    </p>
                                </div>
                            </div>
                            <div className="flex w-1/5 gap-2 px-2 py-3  justify-center translate-x-16">
                                <p className=''>{course.instructor.firstName}</p>  <p>{course.instructor.lastName}</p>
                               
                            </div>
                            <button onClick={() => setModalData({
                                text1: "Do you want to delete this course?",
                                text2: 'All the data related to this course will be deleted',
                                btn1: "Delete",
                                btn2: "Cancle",
                                handler1: () => handleDeleteCourse(course._id),
                                handler2: () => setModalData(null)
                            })}
                                title="Delete"
                                className="px-5 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                            >
                                <RiDeleteBin6Line size={20} />
                            </button>
                        </div>
                    ))}


                </div>
            )}

            {
                modalData ? <ConfirmationModel modelData={modalData} /> : ""
            }
        </>
    )
}

export default EnrolledCourses






