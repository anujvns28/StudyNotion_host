import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useEffect ,useState} from 'react'
import { fetchCourseDetails } from '../../service/operations/courseDetailsApi'
import { useParams } from 'react-router-dom'

const LectureSection = () => {
  const {lectureUrl} = useSelector((state) => state.course);
  
  return (
    <div className='text-white p-5 overflow-y-hidden scroll-my-0'>
     <ReactPlayer 
    url={lectureUrl}
     playing={true}
     width='100%'
     height='640px'
     controls={true}
     className="bg-cover"
     />
    </div>
  )
}

export default LectureSection
