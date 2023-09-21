import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { sentResetPasswordToken } from '../service/operations/authApi';

const ForgotPassword = () => {
  const loading = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailSent,setEmailSent] = useState(false)
  const [email,setEmail] = useState("")

  function handleonSumbit(e){
   e.preventDefault();
   dispatch(sentResetPasswordToken(email,setEmailSent))
  }
  
  return (
    <div className='w-screen h-screen bg-richblack-900 flex items-center justify-center '>
      {
        
        loading === true ? <div className='spinner'></div> :
        <div className='w-[28%]'>
        <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>
        {
          emailSent ? "Check email" : "Reset your password"
        }
        </h1>
        <p  className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
        {
           emailSent ? `We have sent the reset email to ${email}` :
           "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
        }
        </p>

        <form className='flex flex-col'
              onSubmit={handleonSumbit}>
          {
           !emailSent && (
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
               >Email Address <sup className='text-pink-200'>*</sup></p>
              <input
               className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
               border-b border-pure-greys-300'
               placeholder='Enter email address'
               name='email'
               value={email}
               type='email'
               onChange={(e) =>  setEmail(e.target.value)}
              />
             
            </label>
            )
          }

            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              {
                emailSent ? "Resend email" : "Sumbit"
              }
            </button>
        </form>
         
           <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2 pt-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
        </div>
      }

      
    </div>
  )
}

export default ForgotPassword
