import React from 'react'
import { Outlet } from 'react-router-dom'
import LectureSidebar from './LectureSidebar'


const LectureView = () => {
  return (
    <div className='overflow-y-hidden  h-[calc(100vh-3.5rem)] bg-richblack-900 text-white overflow-hidden flex'>
    <LectureSidebar/>
      <div className=' overflow-auto w-screen'>
        <div className='h-[80%]'>       
      <Outlet/>
        </div>
      </div>

      {/* confirm mation model */}

     
    </div>
  )
}

export default LectureView
