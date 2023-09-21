import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri"
import { buyCourse } from '../../service/operations/paymentApi'

const RenderTotalAmount = () => {
    const {total,cart} = useSelector((state) => state.cart)
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handlePayment = async(token,courses,userDetails,navigate,dispatch) =>{
       await buyCourse(token,courses,userDetails,navigate,dispatch)
    }
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
     <button onClick={() => handlePayment(token,cart,user,navigate,dispatch)}
     className='bg-yellow-50 flex items-center py-1 w-full justify-center font-bold text-black rounded-md'>
        Buy Now
     </button>
    </div>
  )
}

export default RenderTotalAmount
