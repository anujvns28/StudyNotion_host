import React, { useState } from 'react'
import HeligthedText from './HeligthedText'
import { HomePageExplore } from '../../../data/homepage-explore';


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currenTab,setCurrenTab] = useState(tabsName[0]);
    

    const setMyCard = (value) =>{
        setCurrenTab(value)
        
    }

  return (
    <div className='relative pb-52'>
      <div className='flex flex-col items-center pt-16 ' >
          <h2 className='font-semibold text-4xl '
          >Unlock the <HeligthedText text={"Power of Code"}/></h2>
          <p className='font-medium text-pure-greys-300 text-xl pt-1 pb-3'
          >Learn to Build Anything You Can Imagine</p>
        </div>
        <div className='flex w-[66%] mx-auto  justify-between py-1 px-1 rounded-full bg-richblack-800 '>
          {
            tabsName.map((item,index) =>{
                return <div className={` ${item === currenTab ? "bg-richblack-900 text-richblack-5" : 
            "" }
                text-richblack-200 font-semibold px-7 py-[7px] rounded-full
                hover:bg-richblack-900 hover:text-richblack-5 cursor-pointer`}
                onClick={() => setMyCard(item)}
                >{item}</div>
            })
          }
        </div>
        <div className='flex flex-row justify-between  pt-16 absolute '>
        {console.log(currenTab)}  
            {
                 HomePageExplore.filter((item,index) => item.tag === currenTab)
                 .map(item => item.courses.map((item , index) => {
                    return <div 
                     className={ `
                    relative h-[300px] w-[30%]  flex flex-col px-8 pt-8 bg-richblack-800  text-richblack-25 `}>
                        <h1 className='text-xl mb-4 font-semibold'>{item.heading}</h1>
                        <p className='text-pure-greys-200'>{item.description}</p>

                        <div className='flex absolute border-pure-greys-200 border-t-2 border-dashed bottom-0 w-full -translate-x-8  justify-between
                        px-8 py-4 text-pure-greys-200'>
                         <div>
                            {item.level}
                         </div>
                         <div className=''>
                            {item.lessionNumber}  Lession
                         </div>
                        </div>
                    </div>
                 }))
            }
        </div>
    </div>
  )
}

export default ExploreMore
