import React from 'react'
import SignupImage from "../assets/Images/signup.webp"
import Templet from '../components/core/auth/Templet'

const Signup = () => {
  return (
    <div>
      <Templet
  title={"Join the millions learning to code with StudyNotion for free"}
  desc1={"Build skills for today, tomorrow, and beyond."}
  desc2={"Education to future-proof your career."}
  image={SignupImage}
  />
    </div>
  )
}

export default Signup
