import React from 'react'
import { useSelector } from 'react-redux'
import OtpInput from 'react-otp-input'
import { useState } from 'react'
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendOtp, signup } from '../service/operations/authApi';

const VeryfiEmail = () => {
    const {loading,signupData} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [otp, setOtp] = useState('');

    const {
      accountType,
      confrmPassword,
      createPassword,
      email,
      firstName,
      lastName
    } = signupData

    const handleOnSubmit = (e) => {
      e.preventDefault()
      dispatch(signup(
        accountType,
        firstName,
        lastName,
        email,
        createPassword,
        confrmPassword,
        otp,
        navigate
      ))
    }

  return (
    <div className='w-screen bg-richblack-900 h-screen flex items-center justify-center '>
      {
        loading ? 
        <div className='spinner '></div> : 

        <div className='w-[28%]' > 
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
        </p>
        <form onSubmit={handleOnSubmit}>
        <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                  
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-xl text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>

            <button onClick={() => dispatch(sendOtp(email,navigate))}
              className="flex items-center text-blue-100 gap-x-2">
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
      </div>
      }
    </div>
  )
}

export default VeryfiEmail
