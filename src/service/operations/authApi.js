
import { apiConnector } from "../apiconnecter";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice"
import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";


const {
  SENDOTP_API,
  LOGIN_API,
  SIGNUP_API,

  RESETPASSTOKEN_API,
  RESETPASS_API
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...")

    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserAlereadyPresent:true
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {

      console.log("SENDOTP API ERROR............", error)
      toast.error(error.response.data.message)

    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signup(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("Signup responses", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Signup successfully")
      navigate("/login")

    } catch (err) {
      console.log("SIGNUP API ERROR............", err)
      toast.error(err.response.data.message)
      navigate("/signup")
    }


    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }

}

export function login(email,password,navigate) {
  return async (dispatch) => {
  dispatch(setLoading(true))
  const toastId = toast.loading("Loading.....")

  try{
  const response = await apiConnector("POST",LOGIN_API,{
    email,
    password
  })

  console.log("Login Respose...",response)
  dispatch(setToken(response.data.token));
  dispatch(setUser(response.data.user));
  localStorage.setItem("token",JSON.stringify(response.data.token));
  localStorage.setItem("user",JSON.stringify(response.data.user));

  toast.success("Login successfully")
  navigate("/dashboard/my-profile")

  }catch(error){
  console.log("error occuring in login api call")
  console.log(error)
  toast.error(error.response.data.message)
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId)
  }
}


// sign out

export function lougOut(navigate){
  return async(dispatch) =>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Louged Out Successfully");
    navigate("/")
  }
}


// send resetPassword token

export function sentResetPasswordToken(email,setEmailSent){
  return async(dispatch) =>{
  dispatch(setLoading(true))
  const toastId =  toast.loading("Loading....");

 try{
  const response = await apiConnector("POST",RESETPASSTOKEN_API,{
    email
  });

  console.log("REset password token resposen",response)
  toast.success("Send Reset Email")
  setEmailSent(true);
 }catch(error){
  console.log("error occuring in reset email sending")
  console.log(error)
  toast.error(error.response.data.message)
 }
 toast.dismiss(toastId)
 dispatch(setLoading(false))
  }
}

// rest password

export function resetPassword(password,confirmPassword,token,navigate){

  return async(dispatch) =>{
  dispatch(setLoading(true))
  const toastId =  toast.loading("Loading....");

 try{
  const response = await apiConnector("POST",RESETPASS_API,{
    password,
    confirmPassword,
    token
  });

  console.log("REset password  resposen",response)
  toast.success("Reset Password Successfully")
  navigate("/login")

 }catch(error){
  console.log("error occuring in reseting password")
  console.log(error)
  toast.error(error.response.data.message)
 }
 toast.dismiss(toastId)
 dispatch(setLoading(false))
  }
}
