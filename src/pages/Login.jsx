import React from 'react'
import LoginImage from "../assets/Images/login.webp"
import Templet from '../components/core/auth/Templet'

const Login = () => {
  return (
    <div>
  <Templet
  title={"Welcome Back"}
  desc1={"Build skills for today, tomorrow, and beyond."}
  desc2={"Education to future-proof your career."}
  image={LoginImage}
  formType = "login" 

  />

  
    </div>

  )
}

export default Login
