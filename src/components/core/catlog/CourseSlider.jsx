import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import CourseCard from './CourseCard';

const CourseSlider = ({courses}) => {

  console.log(courses)
  return (
    <div className='text-white'>
      {
        courses.length === 0 ? <div></div> : 
        <>
        <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
      {
        courses.map((course,i) => {
        return <SwiperSlide>
            <CourseCard course={course}  Height={"h-[250px]"}/>
        </SwiperSlide>
        })
      }
      </Swiper></>
      }
    </div>
  )
}

export default CourseSlider
