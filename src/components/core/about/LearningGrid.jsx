import React from 'react'
import HeligthedText from '../HomePage/HeligthedText';
import { Link } from 'react-router-dom';
import CTAbutton from "../HomePage/Button"

const LearningGrid = () => {

    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
      ];
     
  return (
    <div className='grid grid-cols-4 grid-rows-2 w-11/12 max-w-maxContent mx-auto'>
      {
       LearningGridArray.map((item,index) => {
            return <div className={`${index === 0 && "col-span-2 row bg-transparent"} 
                                  ${item.order % 2 === 1 ? "bg-richblack-700 lg:h-[280px]" : "bg-richblack-800 lg:h-[280px] "}
                                  ${index === 3 && "col-start-2"}`}> 

                {
                    index === 0 ? <div className='flex flex-col gap-4 w-[90%] '> 
                        <h1 className='text-4xl font-semibold text-white'>{item.heading}
                        <br/> <HeligthedText  text={item.highlightText}/>
                        </h1>
                        
                        <p className='text-base  text-richblack-300 tracking-wide font-[300]'>
                            {item.description}
                        </p>
                        <Link to={"/"} className='items-start flex'>
                            <CTAbutton active={true} linkTo={"/"}>
                                Learn More
                            </CTAbutton>
                        </Link>
                    </div> :
                    <div className='p-8'>
                     <h1 className='text-xl text-white font-[200] pb-10'>{item.heading}</h1>
                     <p className='text-base  text-richblack-300 tracking-wide font-[300]'>{item.description}</p>
                    </div>
                }                  
               
            </div>
        })
      }
    </div>
  )
}

export default LearningGrid
