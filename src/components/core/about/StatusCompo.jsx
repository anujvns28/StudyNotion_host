import React from 'react'

const StatusCompo = () => {

    const Stats = [
        {count: "5K", label: "Active Students"},
        {count: "10+", label: "Mentors"},
        {count: "200+", label: "Courses"},
        {count: "50+", label: "Awards"},
    ];

  return (
    <div className='flex flex-row items-center justify-evenly text-white '>
      {
        Stats.map((item,index) => {
           return <div className='flex flex-col items-center justify-center'>
                <h1 className='text-[30px] font-bold text-richblack-5'>{item.count}</h1>
                <h2 className='font-semibold text-[16px] text-richblack-500'>{item.label}</h2>
            </div>
        })
      }
    
    </div>
  )
}

export default StatusCompo
