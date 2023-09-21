

const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS

export  const endpoints = {
   SENDOTP_API : BASE_URL + "/user/sendOtp",
   SIGNUP_API : BASE_URL + "/user/signup",
   LOGIN_API : BASE_URL + "/user/login",
   
   RESETPASSTOKEN_API : BASE_URL + "/user/reset-password-token",
   RESETPASS_API : BASE_URL + "/user/reset-password",
}

export const settingsEndpoints = {
   UPDATE_PROFILE_PICTURE_API : BASE_URL + "/profile/updateProfilePicture",
   UPDATE_PROFILE_DATAS_API : BASE_URL + "/profile/updateProfile",
   CHANGE_PASSWORD_API :  BASE_URL + "/user/chengePassword",
   DELETE_PROFILE_API : BASE_URL +"/user/deleteProfile"
}

export const courseEndpoints = {
   GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
   COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
   EDIT_COURSE_API: BASE_URL + "/course/updateCourse",
   COURSE_CATEGORIES_API: BASE_URL + "/course/showallCategory",
   CREATE_COURSE_API: BASE_URL + "/course/createCourse",
   CREATE_SECTION_API: BASE_URL + "/course/addSection",
   CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
   UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
   UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
   GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
   DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
   DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
   DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
   GET_FULL_COURSE_DETAILS_AUTHENTICATED:
     BASE_URL + "/course/getCourseDetails",
   LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
   CREATE_RATING_API: BASE_URL + "/course/createRating",
   DELTE_COURSE_BY_STUDENT : BASE_URL + "/course/deleteCourseByStudent"
 }


 // CATALOG PAGE DATA
export const catalogData = {
   CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryWisePageDetails",
 }

 export const categories = {
   CATEGORIES_API: BASE_URL + "/course/showallCategory",
 }

 export const paymentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

export const userEndpoint = {
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/enrolledCourses",
  GET_INSTURCTOR_DASHBOARD_API : BASE_URL + "/profile/insTurctorDashboard"
}