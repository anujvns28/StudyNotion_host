import React, { useState } from 'react'
import { useEffect } from 'react';
import {VscAdd} from "react-icons/vsc"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../service/operations/courseDetailsApi';
import CoursesTable from './CoursesTable';

const MyCourses = () => {
    const nevigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);
   
    useEffect(() =>{
    const fetchCourse = async() =>{
      const result = await fetchInstructorCourses(token);
       if(result){
        setCourses(result)
       }
       console.log("calling.................................")
    }
    fetchCourse()
    },[])

   console.log("corsess..",courses)
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        
        <button onClick={() => nevigate("/dashboard/add-course")}
        className='flex flex-row items-center justify-center  gap-x-2 rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900'>
          Add Courses
          <VscAdd />  
        </button>
   
      </div>

      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}

    </div>
  )
}

export default MyCourses
