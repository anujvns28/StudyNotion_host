import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnecter";
import { catalogData } from "../apis";

export  const catalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
      console.log("categoryId........",categoryId._id)
          const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API,categoryId);

        console.log("reeeee",response?.data?.success)
        
           result = response?.data;
  
    }
    catch(error) {
      console.log("CATALOG PAGE DATA API ERROR....", error);
      toast.error(error.message);
      result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}