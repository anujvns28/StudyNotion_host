import React from 'react'
import {RiEditBoxLine} from "react-icons/ri"
import { Link, useNavigate } from 'react-router-dom'

const EditButton = () => {
  const navigate = useNavigate()
  return (
   
      <button className='flex'
      onClick={() => navigate("/dashboard/settings")}
      >
      
     <div className="bg-yellow-50 text-richblack-800 flex items-center flex-row gap-2 py-2 px-6 rounded-md ">
     <span className='text-base font-[550]'>Edit</span> <span><RiEditBoxLine/></span>
     </div>
     
      </button>
    
  )
}

export default EditButton
