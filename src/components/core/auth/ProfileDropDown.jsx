import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineCaretDown} from "react-icons/ai"
import {VscSignOut} from "react-icons/vsc"
import {VscDashboard} from "react-icons/vsc"
import { Link, useNavigate } from 'react-router-dom'
import { lougOut } from '../../../service/operations/authApi'

const ProfileDropDown = () => {

   const selector = useSelector
   const navigate = useNavigate()
   const dispatch = useDispatch()
    
    const {user} = selector((state) => state.profile)
    const [open,setOpen] = useState(false)
    const openRef = useRef(false)
    const dasRef = useRef(false)
    
    window.addEventListener("click",(e) => {
    if(!openRef.current){
      return
    }
    if(!openRef.current.contains(e.target) || dasRef.current.contains(e.target)){
        setOpen(false)
      }
    }
    )
    
  return (
    <button onClick={() => setOpen(true)} >
      <div ref={openRef}
    className='flex flex-row gap-1 items-center justify-center relative cursor-pointer'>
     
      <img className='rounded-full h-8 ' 
      src={user.image}/>
       <p className=' text-richblack-25' ><AiOutlineCaretDown/></p>
    {
      open && (
         
    <div  
    className='absolute flex flex-col top-9 right-2
      rounded-md border-[1px] border-richblack-700 bg-richblack-800 z-[1000]'>

     <Link to={"dashboard/my-profile"} ref={dasRef}
      className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100
       hover:bg-richblack-700 hover:text-richblack-25 z-[1000] border-b border-richblack-700 bg-richblack-800'>
      <p className='text-lg'><VscDashboard/></p>
      <p>Dashboard</p>
     </Link>
     <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100
       hover:bg-richblack-700 hover:text-richblack-25 bg-richblack-800'
       onClick={() => dispatch(lougOut(navigate))}>

       <p className='text-lg'><VscSignOut/></p>
      <p>Log out</p>
     </div>
   </div>
      )
    }
    {
      console.log(open)
    }
    </div>
    </button>
  )
}

export default ProfileDropDown
