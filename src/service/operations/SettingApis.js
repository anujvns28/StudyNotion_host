import { setUser } from "../../slices/profileSlice";
import { settingsEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnecter";

const {
    UPDATE_PROFILE_PICTURE_API,
    UPDATE_PROFILE_DATAS_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
    } = settingsEndpoints


    export function updateDisplayPicture(token, formData) {
        return async (dispatch) => {
          const toastId = toast.loading("Loading...")
          try {
            const response = await apiConnector(
              "PUT",
             UPDATE_PROFILE_PICTURE_API,
              formData,
              {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              }
            )
            console.log(
              "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
              response
            )
      
            if (!response.data.success) {
              throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))
            localStorage.setItem("user",JSON.stringify(response.data.data));
          } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
          }
          toast.dismiss(toastId)
        }
      }


      export function updateProfile(token, formData) {
        return async (dispatch) => {
         
          const toastId = toast.loading("Loading...")
          try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_DATAS_API, formData, {
              Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_PROFILE_API API RESPONSE............", response)
      
            if (!response.data.success) {
              throw new Error(response.data.message)
            }
            
            dispatch(
              setUser(response.data.userDetail)
            )
            localStorage.setItem("user",JSON.stringify(response.data.userDetail
              ));
            toast.success("Profile Updated Successfully")
          } catch (error) {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")
          }
          toast.dismiss(toastId)
        }
      }


      export async function changePassword(token, formData) {
        console.log(formData,token)
        const toastId = toast.loading("Loading...")
        try {
          const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
            Authorization: `Bearer ${token}`,
          })
          console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
      
          if (!response.data.success) {
            throw new Error(response.data.message)
          }
          toast.success("Password Changed Successfully")
        } catch (error) {
          console.log("CHANGE_PASSWORD_API API ERROR............", error)
          toast.error(error.response.data.message)
        }
        toast.dismiss(toastId)
      }