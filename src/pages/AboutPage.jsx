import React from 'react'
import HeligthedText from '../components/core/HomePage/HeligthedText'
import aboutImg1 from "../assets/Images/aboutus1.webp"
import aboutImg2 from "../assets/Images/aboutus2.webp"
import aboutImg3 from "../assets/Images/aboutus3.webp"
import Quoate from '../components/core/about/Quoate'
import aboutImg4  from "../assets/Images/FoundingStory.png"
import StatusCompo from '../components/core/about/StatusCompo'
import LearningGrid from '../components/core/about/LearningGrid'
import ContectForm from '../components/core/contect/ContectForm'
import FooterSection from '../components/common/FooterSection'



const AboutPage = () => {
 
  return (
    <div className='flex flex-col'>
       <section className=' bg-richblack-700 h-[70vh] w-screen relative'>
       <div className='max-w-maxContent w-11/12 mx-auto text-white'>
         <div className='flex flex-col justify-center items-center w-[70%] mx-auto leading-relaxed'>
            <h1 className='text-4xl pt-20 font-semibold text-center'
            >Driving Innovation in Online Education for a</h1>
            <h1 className='text-4xl font-semibold'> 
            <HeligthedText
            text={"Brighter Future"}/>
            </h1>
            <p className=' mt-3 text-center text-base tracking-wide text-richblack-300 font-medium'>
            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
            </p>
         </div>
          <div className='flex  gap-10 px-3 mt-14 lg:absolute items-center justify-center'>
            <img src={aboutImg1} />
            <img src={aboutImg2}/>
            <img src={aboutImg3}/>
          </div>
        </div>
       </section>

       <section className='w-screen bg-richblack-900 pt-20 border-b border-richblack-700 pb-10'>
       <Quoate/>
       </section>

       <section className='w-screen bg-richblack-900 py-20 text-white '>
        <div className='max-w-maxContent w-11/12 mx-auto flex lg:flex-col '>
            <div className='flex flex-row justify-between mb-20'>
             <div className='w-[47%] flex flex-col gap-10'>
                <h1 className=' bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] '
                >Our Founding Story</h1>
                <p className='text-base font-medium text-richblack-300 lg:w-[93%]'
                >
                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                </p>
                <p className='text-base font-medium text-richblack-300 lg:w-[90%]'
                >
                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                </p>
             </div>
             <div  className='w-[40%] flex justify-end'>
               <div className='flex items-center justify-center '>
               <img className='shadow-[0_0_20px_0] shadow-[#FC6767]'
                src={aboutImg4} />
               </div>
             </div>
            </div>
          <div className='flex flex-row items-center justify-between mt-28 '>
            <div className='w-[40%] flex flex-col gap-10 '>
             <h1 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent'
             >Our Vision</h1>

             <p className='text-base  text-richblack-300 tracking-wide font-[300]'>
             With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
             </p>
            </div>
            <div className='w-[40%] flex flex-col gap-10'>
             <h1 className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold'>
             Our Mission
             </h1>
             <p className='text-base  text-richblack-300 tracking-wide font-[300]'>
             Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
             </p>
            </div>
          </div>
        </div>
       </section>

       <section className=' bg-richblack-700  w-screen py-10'>
        <StatusCompo/>
       </section>

       <section className=' w-screen bg-richblack-900 text-white pt-20 pb-20'>
        <LearningGrid/>
       </section>

       <section className=' w-screen bg-richblack-900 text-white pt-20 pb-20'>
       <div className='w-[37%] mx-auto  flex flex-col items-center'>
       <h1 className='text-4xl text-white font-[550] '>Get in Touch </h1>
       <p className='text-base  text-richblack-300 tracking-wide font-[300] pt-2'>We'd love to here for you, Please fill out this form.</p>
       <ContectForm/>
       </div>
       </section>

       <FooterSection/>
     
    </div>
  )
}

export default AboutPage
