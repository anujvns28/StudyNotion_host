import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import cartReducer from "../slices/cartSlice"
import profileReducer from "../slices/profileSlice"
import courseSlice from "../slices/courseSlice";

const rootReducer = combineReducers({
auth: authReducer,
cart: cartReducer,
profile : profileReducer,
course: courseSlice
})

export default rootReducer