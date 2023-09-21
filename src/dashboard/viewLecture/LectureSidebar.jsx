import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../../service/operations/courseDetailsApi'
import { useDispatch, useSelector } from 'react-redux'
import {setlecutreUrl} from '../../slices/courseSlice'
import {RiArrowDropDownLine} from "react-icons/ri"
import {MdOutlineOndemandVideo} from "react-icons/md"
import {BiLeftArrowAlt} from "react-icons/bi"


const LectureSidebar = () => {
const {courseId,subsectionId} = useParams()
const {token} = useSelector((state) =>state.auth)
const [course_Detail,setCourseDetails] = useState(null)
const navigate = useNavigate()
const dispatch = useDispatch();


  useEffect(() =>{
   const getCourseDetails = async() =>{
    const courseDetails = await fetchCourseDetails(courseId,token)
    if(courseDetails){
       setCourseDetails(courseDetails);
       console.log(courseDetails,",...")
       navigate(`view-course/${courseId}/${courseDetails.data.courseCountant[0].subSection[0]._id}`)
       dispatch(setlecutreUrl(courseDetails.data.courseCountant[0].subSection[0].videoUrl
        ))
    }
   }
   getCourseDetails()
  },[])

  
 
   function handleLectureUrl(lectureUrl,subSectionId){
    console.log("calling")
    dispatch(setlecutreUrl(lectureUrl))
    navigate(`view-course/${courseId}/${subSectionId}`)
  }
  // if(course_Detail){
  //   dispatch(setlecutreUrl(course_Detail.data.courseCountant[0].subSection[0].videoUrl)) 
  // }
  return (
    <div className=' w-[320px]   border-richblack-700 border border-t-0  h-[calc(100vh-3.5rem)] text-white bg-richblack-800
        py-9'>
          <p onClick={() => navigate("dashboard/enrolled-courses")}
          className='text-blue-300 flex items-center justify-start pb-3 cursor-pointer '> 
          <p className='text-2xl'><BiLeftArrowAlt/></p>
           Back to Courses</p>
          <h1 className='text-xl font-white font-bold px-5 text-start'>{course_Detail ? course_Detail.data.CourseName : "Loading..."}</h1>
          <div className='border-richblack-700 border border-t-1 w-[90%] mx-auto mt-7 mb-5 h-[1px]'></div>
      {
        course_Detail ? 
        
        <div>
          {
           course_Detail.data.courseCountant.map((section) => {
            return <details 
             className='w-full bg-richblack-700 border border-richblack-500'>
              <summary className='flex cursor-pointer items-center px-5 justify-between  py-2'>
              <div className='flex flex-row w-full items-center justify-between'>
              <p className={`text-[15px] `}>{section.sectionName}</p>
                   <RiArrowDropDownLine 
                   className={`text-3xl `} />
                   </div>
              </summary>
              {
                section.subSection.map((subSection) =>{
                  return (
                    <p className={` py-1 px-6 cursor-pointer ${subsectionId === subSection._id 
                      ? "bg-yellow-200 text-richblack-900 "
                      : "bg-richblack-900 text-richblack-300 "} `}
                    onClick={() => handleLectureUrl(subSection.videoUrl,subSection._id)}>
                     <div className='flex items-center gap-3'>
                      <MdOutlineOndemandVideo/>
                      <p className='text-sm'> {subSection.title}</p>
                     </div>
                    </p>
                  )
                })
              }
             
            </details>
           })
          }
        </div> 
        
        : <div>Loading....</div>
      }
      
        </div>
  )
}

export default LectureSidebar
