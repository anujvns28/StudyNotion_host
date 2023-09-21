import React from 'react'
import Frame from "../../../assets/Images/frame.png"
import LoginFrom from './LoginFrom'
import SignupFrom from './SignupFrom'


const Templet = ({title,desc1,desc2,image,formType}) => {
  return (
    <div className='w-screen  bg-richblack-900 h-screen'>
    <div className='max-w-maxContent mx-auto   h-screen  flex justify-between'>

     <div className='w-[450px]  flex flex-col justify-center items-start text-white '>
      <h2 className='text-3xl font-semibold  '>
      {title}
      </h2>
      <p className='text-richblack-100 font-medium text-xl mt-4'>
    {desc1}
      </p>
      <p className='text-blue-100 font-edu-sa italic font-bold '>
     {desc2}
      </p>

    {formType === "login" ? <LoginFrom/> : <SignupFrom/>}
      
     </div>

     <div className='w-[450px]  flex flex-col justify-center items-center'>
     <div className='relative'>
        <img 
        src={Frame}
        alt="Pattern"
        width={558}
        height={504}
        loading="lazy"
        />

        <img 
        src={image}
        alt="Students"
        width={558}
        height={504}
        loading="lazy"
        className="absolute -top-4 right-4 z-10"
        />
     </div>
     </div>
    </div>
    
    </div>
  )
}

export default Templet
