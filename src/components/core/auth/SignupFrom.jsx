import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useState } from 'react'
import { ACCOUNT_TYPE } from '../../../utilit/constant'
import Tab from '../../common/Tab'
import { toast } from 'react-hot-toast'
import { useDispatch ,} from 'react-redux'
import { setsignupData } from '../../../slices/authSlice'
import { sendOtp } from '../../../service/operations/authApi'
import { useNavigate } from 'react-router-dom'


const SignupFrom = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [shoPassword,setShowPassword] = useState(false)
    const [showConfrmPassword,setShowConfrmPassword] = useState(false)

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
    const [formData,setformData] = useState({
        firstName : "",
        lastName  : "",
        email : "",
        createPassword : "",
        confrmPassword : ''
    })

    const {firstName,lastName,email,createPassword,confrmPassword} = formData

    const handForm = (event) =>{
        setformData((prev) => ({
            ...prev,
            [event.target.name] : event.target.value
        }))
    }

    const handFormOnSubmit = (event) =>{
        event.preventDefault()
        

       if(createPassword !== confrmPassword){
        toast.error("Password Do Not Matched")
        return
       }

       const signupData = {
        ...formData,
        accountType
       }
 
       dispatch(setsignupData(signupData));

       dispatch(sendOtp(email,navigate ))

       //reset
       setformData({
        firstName : "",
        lastName  : "",
        email : "",
        createPassword : "",
        confrmPassword : ''
       })
       setAccountType(ACCOUNT_TYPE.STUDENT)
    }

     // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
      {/* tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form className='w-full flex flex-col gap-4 mt-4'
   onSubmit={handFormOnSubmit}
   >
    <div className='flex flex-row justify-between'>
    <label className='w-[48%]'>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >First Name<sup className='text-pink-200'>*</sup></p>
    <input className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
 
     required
     placeholder="Enter first name"
     type='text'
     name = "firstName"
     onChange={handForm}
     value={firstName}
    />
    </label>

    <label className='w-[48%]'>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >Last Name <sup className='text-pink-200'>*</sup></p>
    <input className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
 
     required
     placeholder="Enter last name"
     type='text'
     name = "lastName"
     onChange={handForm}
     value={lastName}
    />
    </label>
    </div>

    <label className='w-full'>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >Email Address <sup className='text-pink-200'>*</sup></p>
    <input className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
 
     required
     placeholder="Enter email address"
     type='email'
     name = "email"
     onChange={handForm}
     value={email}
    />
    </label>

    <div className='flex flex-row justify-between'>
    <label className='w-[48%]'>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >Create Password<sup className='text-pink-200'>*</sup></p>

    <input className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
 
     required
     placeholder="Enter Password"
     type={shoPassword ? "text":'password'}
     name = "createPassword"
     onChange={handForm}
     value={formData.createPassword}
    />
    
    <span  className="absolute text-2xl text-pure-greys-200 -translate-x-9 translate-y-3 cursor-pointer"
     onClick={() => setShowPassword(!shoPassword)}>
    {shoPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
    </span>

    </label>

    <label className='w-[48%]'>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >Confirm Password <sup className='text-pink-200'>*</sup></p>
    <input className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
 
     required
     placeholder="Confirm Password"
     type={showConfrmPassword ? "text" : 'password'}
     name = "confrmPassword"
     onChange={handForm}
     value={formData.confrmPassword}
    />

     
<span  className="absolute text-2xl text-pure-greys-200 -translate-x-9 translate-y-3 cursor-pointer"
     onClick={() => setShowConfrmPassword(!showConfrmPassword)}>
    {showConfrmPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
    </span>
    </label>
    </div>

    <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>

   </form>
    </div>
  )
}

export default SignupFrom



