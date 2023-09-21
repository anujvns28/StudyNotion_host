import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimlinImage from "../../../assets/Images/TimelineImage.png"

const TimelineSection = () => {

    const timeline = [
        {
            Logo: Logo1,
            heading: "Leadership",
            Description: "Fully committed to the success company",
            number:1
        },
        {
            Logo: Logo2,
            heading: "Responsibility",
            Description: "Students will always be our top priority",
            number:2
        },
        {
            Logo: Logo3,
            heading: "Flexibility",
            Description: "The ability to switch is an important skills",
            number:3
        },
        {
            Logo: Logo4,
            heading: "Solve the problem",
            Description: "Code your way to a solution",
            number:4
        },
    ];

    return (
        <div className='w-11/12 max-w-maxContent mx-auto  flex gap-10 mt-28 px-9 '>
            <div className='w-[50%] flex flex-col  mt-1'>
                {
                    timeline.map((itme, index) => {

                        return <div className='flex flex-row gap-6  pl-4 mb-16 relative'>
                            <div className='w-[55px] h-[55px] bg-white rounded-full flex flex-col justify-center items-center 
                            '>
                                <img src={itme.Logo}></img>
                            </div>
                          
                            <div>
                                <h2 className='font-semibold text-[18px]'>{itme.heading}</h2>
                                <p className='text-base'>{itme.Description}</p>
                            </div>
                            <div className={`${ 4 > itme.number ? "absolute border-richblack-100 -bottom-[57px] left-[37px]  h-[52px] border-r border-dotted w-1" : ""}`}></div>
                        </div>

                      
                       
                    })
                }
            </div>
            <div className='relative'>
                <img src={TimlinImage}
                    className='shadow-[20px_20px_rgba(255,255,255)] object-cover h-fit'
                />
                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 px-9 
                   left-16 -bottom-12'>
                    <div className='flex flex-row gap-11 items-center border-r border-caribbeangreen-300 px-8'>
                        <div className='text-3xl font-bold'>10</div>
                        <div className='text-caribbeangreen-300 text-sm'>YEARS <pre/> EXPERIENCES </div>
                    </div>
                    <div className='flex gap-11 items-center px-8'>
                        <div className='text-3xl font-bold'>250</div>
                        <div className='text-caribbeangreen-300 text-sm'>TYPES OF <pre/> COURSES</div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default TimelineSection
