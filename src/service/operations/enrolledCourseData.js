import { toast } from "react-hot-toast";
import { userEndpoint } from "../apis";
import { apiConnector } from "../apiconnecter";

const {GET_USER_ENROLLED_COURSES_API,GET_INSTURCTOR_DASHBOARD_API} = userEndpoint;
export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
      const response = await apiConnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data

    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
  }


  export async function getInsturctorDasbordDetails(token){
  let result
  const toastId = toast.loading("Loading...");
  try{
  
   const response = await apiConnector("GET",GET_INSTURCTOR_DASHBOARD_API,null,
   {
    Authorization: `Bearer ${token}`,
   })
   console.log(response)
   if (!response.data.success) {
    throw new Error(response.data.message)
  }
  result =  response.data

  }catch(err){
    console.log("GET_Insturctror_dashbord_API API ERROR............", err)
    toast.error("Could Not Get Dashboard")
  }
   toast.dismiss(toastId)
    return result
  }