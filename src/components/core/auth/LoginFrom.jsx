import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FaPassport } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../service/operations/authApi'
import { useDispatch } from 'react-redux'


const LoginFrom = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

    const [shoPassword,setShowPassword] = useState(false)
    const [formData ,setformData] = useState({
        email:'',
        password:""
    })
  
  const {email,password} = formData

    const handleChange = (event) =>{
    setformData((prev) =>({
        ...prev,
        [event.target.name] : event.target.value
    }))
    }

    const handOnSubmit = (event) =>{
        event.preventDefault()
       dispatch( login(email,password,navigate))
        console.log("calling login")
    }
   

  return (
  <form
  onSubmit={handOnSubmit}
  className="mt-6 flex w-full flex-col gap-y-4"
  >
    <label className='w-full'>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >Email Address <sup className='text-pink-200'>*</sup></p>
    <input className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
 
     required
     placeholder="Enter email address"
     type='email'
     name = "email"
     onChange={handleChange}
     value={formData.email}
    />
    </label>

    <label className='w-full'>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >Password <sup className='text-pink-200'>*</sup></p>
    <input className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'

     required
     placeholder="Enter password"
     type={shoPassword ? "text" : "password"}
     name='password'
     onChange={handleChange}
     value={formData.password}
    />

     <span  className="absolute text-2xl text-pure-greys-200 -translate-x-9 translate-y-3 cursor-pointer"
     onClick={() => setShowPassword(!shoPassword)}>
    {shoPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
    </span>

    <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
    </label>
   
    <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
  </form>
  )
}

export default LoginFrom
