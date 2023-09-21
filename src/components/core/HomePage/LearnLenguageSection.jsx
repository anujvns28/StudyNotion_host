import React from 'react'
import HeligthedText from './HeligthedText'
import KnowYorPage  from "../../../assets/Images/Know_your_progress.png"
import ComperWithOuthers  from "../../../assets/Images/Compare_with_others.png"
import KnowYourLesson  from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton  from "./Button"

const LearnLenguageSection = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto mt-40  text-center mb-16'>
      <div className='flex flex-col items-center justify-center'>
        <h2  className=' text-4xl font-semibold my-3 '>
        Your swiss knife for 
        <HeligthedText text={"learning any language "}/>
        </h2>

        <p  className=' w-[66%] text-center '>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>

      <div className='flex items-center justify-center -gap-10'>
        <img src={KnowYorPage}
        className='translate-x-36  -translate-y-4'/>
        <img src={ComperWithOuthers} 
        className=' z-10'
        />
        <img src={KnowYourLesson}
        className='-translate-x-36  -translate-y-6 z-40'
        />
      </div>

     <div className='flex justify-center items-center -translate-y-5'>
     <CTAButton active={true} linkTo={"signup"} >
           Learn More
      </CTAButton>
     </div>
    </div>
  )
}

export default LearnLenguageSection
