import React from 'react'
import insturctorImage from "../../../assets/Images/Instructor.png"
import HeligthedText from './HeligthedText'
import CTAButton  from "./Button"
import { FaArrowRight } from "react-icons/fa"

const InsturctorSection = () => {
    return (
        <div className='w-screen bg-richblack-900 text-white py-36'>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-row gap-16 items-center '>
                <div className='w-[60%]  translate-x-14 object-fill '>
                    <img src={insturctorImage} 
                    className='scale-125 shadow-white shadow-[-20px_-20px_0_0] '
                     />
                </div>
                <div className='ml-32'>
                    <h2 className='text-4xl font-semibold mb-10 '>Become an  <pre /> <HeligthedText text={"instructor"} /></h2>
                    <p className=' w-[80%] text-pure-greys-300 font-medium tracking-wider mb-10'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                    <div className='flex flex-row text-start'>
                    <CTAButton active={true} linkTo={"/signup"}>
                  <div className='flex items-center gap-2'>
                  Start Teaching Today  
                  <FaArrowRight/>
                  </div>
                   
                    </CTAButton>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InsturctorSection
