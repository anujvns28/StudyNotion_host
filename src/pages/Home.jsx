import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom'
import CTAbutton from '../components/core/HomePage/Button'
import HeligthedText from '../components/core/HomePage/HeligthedText'
import Banner from "../assets/Images/banner.mp4"
import CodeBlock from '../components/core/HomePage/CodeBlock'
import TimelineSection  from "../components/core/HomePage/TimelineSection"
import LearnLenguageSection from "../components/core/HomePage/LearnLenguageSection"
import InsturctorSection from '../components/core/HomePage/InsturctorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import FooterSection from '../components/common/FooterSection'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../slices/courseSlice'


const Home = () => {
  const dispatch = useDispatch();
  const {course} = useSelector((state) => state.course);
  return (
    <div className=''>
      {/* section 1 */}

      <div className='w-screen min-h-screen bg-richblack-900'>
      <div className='flex flex-col w-11/12 max-w-maxContent items-center text-white mx-auto 
      justify-between'>
      <Link to={"/signup"}>
        <div className='group w-fit rounded-full bg-richblack-800 mx-auto  mt-16 p-1 
           transition-all duration-200 hover:scale-95 border-b border-richblack-600'>
          <div className='flex flex-row text-richblack-200 items-center gap-2 px-10 py-[5px]
            font-bold  transition-all duration-200 group-hover:bg-richblack-900 rounded-full'>
            <p>Become an insturctor</p>
            <FaArrowRight />
          </div>
        </div>
      </Link>

      <div className='text-center font-semibold mt-7 text-4xl text-white'>
        Empower Your Future with
        <HeligthedText text={"Coding Skills"} />
      </div>

      <div className=' w-[90%] text-center mx-auto mt-4 text-lg font-bold text-richblack-200' >
        With our online coding courses, you can learn at your own pace, from anywhere in the world,
        and get access to a wealth of resources, including hands-on projects, quizzes, and personalized
        feedback from instructors.
      </div>

      <div className='flex flex-row gap-7 mt-8'>
        <CTAbutton linkTo={"signup"} active={true}>
          Learn More
        </CTAbutton>

        <CTAbutton linkTo={"login"} active={false}>
          Book a Demo
        </CTAbutton>

      </div>

      <div className='mx-3 my-12  shadow-[20px_20px_rgba(255,255,255)]'>
        <video
          autoPlay
          loop
          muted
        >
          <source src={Banner} type='video/mp4' />
        </video>
      </div>

      {/* code section 1 */}

      <div>
        <CodeBlock
          position={'sm:flex-col lg:flex-row'}
          heading={
            <div className='text-4xl font-semibold mt-2 '>
              Unlock Your
              <HeligthedText text={"coding potential"} />
              with our online courses
            </div>
          }
          subHeading={
            <div className='font-bold text-richblack-300 w-[85%]'>
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            </div>
          }
          ctaButton1={
            {
              btnText: "try it yourself",
              linkto: "/signup",
              active: true
            }
          }
          ctaButton2={
            {
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }
          }

          codeBlock={`<!DOCTYPE html> \n <html> \n head><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\n h1> \n<ahref="/">Header</a>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
          codeColor={"text-yellow-25"}
        />

      </div>

      {/* code section 2 */}

      <div>
        <CodeBlock
          position={'lg:flex-row-reverse'}
          heading={
            <div className='text-4xl font-semibold mt-2 '>
              Start
              <HeligthedText text={"coding in"} /> <br />
              <HeligthedText text={"seconds"} />

            </div>
          }
          subHeading={
            <div className='font-bold text-richblack-300 w-[85%] '>
              Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
            </div>
          }
          ctaButton1={
            {
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true
            }
          }
          ctaButton2={
            {
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }
          }

          codeBlock={`<!DOCTYPE html> \n <html> \n head><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\n h1> \n<ahref="/">Header</a>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
          codeColor={"text-white"}
        />

{/* Unlock the power of code */}
    
    <ExploreMore/>
      
      </div>
      {/* section 2 */}
      <div className='bg-pure-greys-5  '>
        <div className='bgHome_img h-[300px] flex  justify-center gap-2 pt-[200px] w-screen'>
          <CTAbutton active={true} linkTo={"/signup"}>
            <div className='flex gap-2 items-center'>
              Explore Full Catalog
              <FaArrowRight />
            </div>
          </CTAbutton>

          <CTAbutton active={false} linkTo={"/signup"}>
            Lern More
          </CTAbutton>
        </div>
      </div>
      </div>
      </div>

      <div className='w-screen bg-pure-greys-5 pt-28 '>
        <div className=' w-11/12 max-w-maxContent mx-auto flex ' >
        <div className='w-[60%] text-4xl font-semibold pr-6'> 
      <p className='w-[80%]'>
        Get the skills you need for a 
        <HeligthedText text={"job that is in demand."}/>
      </p>
        </div>
        <div className='w-[40%]  items-start flex flex-col gap-10'>
        <p > The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
          <CTAbutton active={true} linkTo={"/signup"} >
            Lern More
          </CTAbutton>
        </div>
        </div>
     
        <TimelineSection/>
        <LearnLenguageSection/>
        <InsturctorSection/>
        <FooterSection/>
      </div>

    

      {/* section 3 */}


      {/* Footer*/}
    </div>
  )
}

export default Home
