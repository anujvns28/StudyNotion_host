import React from 'react'
import HeligthedText from '../HomePage/HeligthedText'

const Quoate = () => {
  return (
    <div className='max-w-maxContent w-11/12 mx-auto pb-10'>
      <h1 className='text-4xl pt-20 font-semibold text-white text-center' >
      We are passionate about revolutionizing the way we learn. Our 
      <br/> innovative platform 
      <span>
        <HeligthedText text={"combines technology"}/>
      </span>
      <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>
       {" "} expertise
      </span>
      , and community to <br/>

      create an 
      <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>
       {" "} unparalleled educational experience.
      </span>
      </h1>
    </div>
  )
}

export default Quoate
