import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../service/operations/courseDetailsApi';
import { useState } from 'react';
import FooterSection from '../components/common/FooterSection';
import {AiOutlineInfoCircle} from "react-icons/ai"
import {TbWorld} from "react-icons/tb"
import { formatDate } from '../service/formDate';
import {RiArrowDropDownLine} from "react-icons/ri"
import {FaShareSquare} from "react-icons/fa"
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-hot-toast';
import { buyCourse } from '../service/operations/paymentApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import ConfirmationModel from '../components/common/ConfirmationModel';

const CourseDetails = () => {
    const {courseId} = useParams();
    const [courseDetails,setCourseDetails] = useState(null)
    const location = useLocation();
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalData,setModalData] = useState(null)
   
    
    useEffect(() => {
    const getCourseDetails = async() =>{
    const result = await fetchCourseDetails(courseId)  
    if(result){
        setCourseDetails(result)
    }

    }
    getCourseDetails()
    },[])

    console.log(courseDetails)

    const handlerPayment = () =>{
      buyCourse(token,[courseId],user,navigate,dispatch);
    }

  return (
    <div className='w-full bg-richblack-900'>
    {
        courseDetails && <div className='pb-10 relative'>
            <div className='w-full py-14 bg-richblack-800'>
        <div className='max-w-maxContent mx-auto py-16 flex flex-col gap-4'>
         <h1 className='text-4xl font-bold text-white pt-4'>{courseDetails.data.CourseName}</h1>
         <p className='text-richblack-400 '>{courseDetails.data.courseDescription}</p>
          
          <p className='text-xl text-white '
          >Created By {courseDetails.data.instructor.firstName} {" "} {courseDetails.data.instructor.lastName}</p>

          <p className='flex items-center text-white text-xl  gap-2 '>
            <AiOutlineInfoCircle/>  Created at {formatDate(courseDetails.data.createdTime)}  <TbWorld/> English
          </p>
        </div>
        
       </div>

     
        <div className='max-w-maxContent mx-auto flex flex-col gap-2'>
        <div className='border border-richblack-400 p-10 w-[65%] my-8 '>
        <p className='text-white text-3xl font-bold '>What you'll learn</p>
        <p className='text-white mt-3'>{courseDetails.data.whatYouWillLearn}</p>
        </div>

         <div className='text-white w-[65%] '>
            <p className='text-3xl font-bold mt-4'>Course Content</p>
            <div className='flex items-center justify-between w-full mb-2 mt-4'>
             <p>Section Names</p>
             <p className='text-yellow-50'>No of Lectures</p>
            </div>
           <div className='mb-10'>
           {
              courseDetails.data.courseCountant.map((item,i) => {
                return <details className={`w-full bg-richblack-700 border border-richblack-600 `}>
                   <summary className='flex cursor-pointer items-center px-7 justify-between  p-5' >
                   <div className='flex flex-row gap-2 items-center justify-center'>
                   <RiArrowDropDownLine className='text-3xl'/>
                   <p> {item.sectionName}</p>
                   </div>
                   </summary>
                   <div className=''>
                   {
                    item.subSection && item.subSection.map((lecture,index) => {
                        return <div className={`bg-richblack-900 transition-all duration-100 flex cursor-pointer items-center px-7 justify-between  p-5 ${item.subSection.length === index + 1 ? "" :"border-b border-richblack-600" }`}>
                        <p>Lecture {i+1}:{index+1}</p>
                        </div>
                    })
                   }
                   </div>
                </details>
              })  
            }
           </div>

           <div className='flex flex-col gap-4'>
            <p className='text-white text-3xl font-bold'>Author</p>

            <div className='flex flex-row gap-5 items-center'>
              <img className='h-[70px] w-[70px] rounded-full'
              src={courseDetails.data.instructor.image}/>
              <p className='text-xl'>{courseDetails.data.instructor.firstName} {" "} {courseDetails.data.instructor.lastName}</p>
             
            </div>
            <p className=''>Developer</p>
           </div>
         </div>
        </div>

        <div className='absolute w-[400px] bg-richblack-700 rounded-md right-28 top-16 px-5 py-6 flex flex-col gap-3'>
         <img className='bg-cover rounded-md'
         src={courseDetails.data.thumbnail}/>
         <p className='text-3xl font-bold text-white'>Rs. {courseDetails.data.price}</p>

         <button 
         onClick={() =>user.accountType === "Instructor" ? toast.error("You are a Insturactor") : token ? courseDetails.data.enrolledStudents.includes(user._id) 
          ? navigate("/dashboard/enrolled-courses") 
          : handlerPayment() 
          : setModalData({
            text1 : "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1:"Login",
            btn2:"Cancel",
            handler1 :() => navigate("/login"),
            handler2: () => setModalData(null)
          })
        }
         className='py-2 w-full bg-yellow-50 text-black items-center font-bold rounded-md'>
         
         {token ? courseDetails.data.enrolledStudents.includes(user._id) ? "Go to Course" : "Buy Now" : "Buy Now"}
          </button>
         {console.log(user.accountType,",,,,")}
         {
          
           token ?  !courseDetails.data.enrolledStudents.includes(user._id) && 
          <button onClick={() =>user.accountType === "Instructor" ? toast.error("You are a Insturactor") : dispatch(addToCart(courseDetails))}
          className='py-2 w-full bg-richblack-900 text-white items-center font-bold rounded-md'>Add to Cart</button>
          : <button onClick={() => 
            setModalData({
              text1 : "You are not logged in!",
              text2: "Please login to add To Cart",
              btn1:"Login",
              btn2:"Cancel",
              handler1 :() => navigate("/login"),
              handler2: () => setModalData(null)
            })
          }
          className='py-2 w-full bg-richblack-900 text-white items-center font-bold rounded-md'>Add to Cart</button>
         } 
        
         <p className='text-center text-white'>30-Day Money-Back Guarantee</p>
         <button onClick={() => {
          clipboardCopy(`localhost:3000${location.pathname}`)
          toast.success("Linked Copy")
         }}
         className='flex flex-row items-center gap-2 justify-center text-yellow-50'><FaShareSquare/> Share</button>
        </div>
        </div>
    }
     <FooterSection/>

     {
      modalData && <ConfirmationModel modelData={modalData}/>
     }
    </div>
  )
}

export default CourseDetails
