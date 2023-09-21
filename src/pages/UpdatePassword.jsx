import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { resetPassword } from '../service/operations/authApi';


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const loading = useSelector((state) => state.auth)
    const [showPassword,setShowPassword] = useState(false)
    const [confrmshowPass,setconfrmshowPass] = useState(false)
    const [formData ,setformData] = useState({
        password:"",
        confirmPassword:""
    })
    
    function handleOnchange(e){
     setformData((prev) => ({
        ...prev,
        [e.target.name] : e.target.value
     }))
    }
 
    const {password,confirmPassword} = formData
   

    function handleOnSubmit(e){
    e.preventDefault();
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password,confirmPassword,token,navigate))
    }

  return (
    <div className='w-screen h-screen bg-richblack-900 flex items-center justify-center text-white overflow-y-hidden'>
      {
      loading === false ? <div className='spinner'></div> :
      <div className='w-[28%]'>
       <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
        Choose new password
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
        Almost done. Enter your new password and youre all set.
        </p>

        <form onSubmit={handleOnSubmit}>
        <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
               >New Password <sup className='text-pink-200'>*</sup></p>
              <input
               className='relative w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
               border-b border-pure-greys-300'
               placeholder='Enter Password'
               name='password'
               type={`${showPassword ? "text" : 'password'}`}
               value={formData.password}
               onChange={handleOnchange}
              />
              <span 
              onClick={() => setShowPassword(!showPassword)}
              className='absolute text-2xl text-richblack-25   -translate-x-10 translate-y-3'>
               {
                showPassword ?  <AiOutlineEyeInvisible/> : <AiOutlineEye/>
               }
              </span>
             
            </label>

            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 pt-3"
               >Confirm Password <sup className='text-pink-200'>*</sup></p>
              <input
               className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
               border-b border-pure-greys-300'
               placeholder='Confirm Password'
               name='confirmPassword'
               value={formData.confirmPassword}
               type={`${confrmshowPass ? "text" : 'password'}`}
               onChange={handleOnchange}
              />
               <span 
                onClick={() => setconfrmshowPass(!confrmshowPass)}
               className='absolute text-2xl text-richblack-25   -translate-x-10 translate-y-3'>
               {
                confrmshowPass ?  <AiOutlineEyeInvisible/> : <AiOutlineEye/>
               }
              </span>
             
            </label>

            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Reset Password
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

export default UpdatePassword
