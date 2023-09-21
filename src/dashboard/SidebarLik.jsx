import React, { useState } from 'react'
import * as Icons from "react-icons/vsc"
import { Link, matchPath, useLocation } from 'react-router-dom'

const SidebarLik = ({link, iconName , name}) => {
    const Icon = Icons[iconName]
    const location = useLocation()

    function matchRoute(route){
    return matchPath({path:route},location.pathname)
    }
  return (
    <div 
    className={`${matchRoute(link) ? "bg-yellow-800 text-yellow-50 font-[500] border-l-2 border-yellow-100" :
     "text-richblack-300"}  flex pl-8 font-medium w-full px-4 p-2 items-center`}>
      <Link to={link}
      className='flex items-center justify-center gap-2'>
      
       <span className='   text-xl tracking-wide  '
       >{<Icon/>}</span>
       <p className='   text-sm tracking-wide  '>
        {name}
       </p>
       
      </Link>

      {
        // console.log("printing Sidbarliks")
      }
    </div>
  )
}

export default SidebarLik
