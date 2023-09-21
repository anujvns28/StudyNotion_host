import React from 'react'
import { useSelector } from 'react-redux'
import EditButton from './EditButton';

const MyProfile = () => {

  const {user,loading:userLoading} = useSelector((state) => state.profile);
  const {loading:authLoading} = useSelector((state) => state.auth);

  if(userLoading || authLoading){
    return(
      <div>
        Loading....
      </div>
    )
  }

  return (
    <div className='text-white  overflow-hidden w-[1000px] flex flex-col gap-10'>
       <h1 className=' text-white text-3xl font-normal pb-10 '>
            My Profile
        </h1>

        <div className='w-full bg-richblack-800 border border-richblack-700 py-7 px-12 flex gap-5
         justify-between items-center'>
         <div className='flex flex-row gap-5 '>
         <div className='w-[80px] '>
          <img  className='rounded-full'
          src={user.image}/>
          </div>
          <div className='flex flex-col gap-1 justify-center'>
           <p className='text-white text-xl font-bold'> <span>{user.firstName}</span>   <span>{user.lastName}</span></p>
            <p className=' text-base tracking-wide text-richblack-300 font-medium'>{user.email}</p>
          </div>
         </div>

          <EditButton/>
        </div>

        <div className='w-full bg-richblack-800 border border-richblack-700 py-7 px-12 flex gap-5
         justify-between '>
         <div className='flex flex-row gap-5 '>
        
          <div className='flex flex-col gap-12 justify-center'>
           <p className='text-white text-xl font-bold'>About</p>
            <p className=' text-base tracking-wide text-richblack-300 font-medium'>
              {
                user.additinaolDetail.about === null  ? "Write Something About Yourself" : user.additinaolDetail.about
              }
            </p>
          </div>
         </div>
       
          <EditButton/>
        </div>

        <div className='w-full bg-richblack-800 border border-richblack-700 py-7 px-12 flex flex-col  gap-5
         justify-between '>
          

           <div className='flex justify-between'>
           <p className='text-white text-xl font-bold'>Personal Details</p>
           <EditButton/>
           </div>
           {/* /llllllllllllllllllll */}

         
          <div className='flex'>
          <div className='flex flex-col gap-5 w-[40%] '>
          <div className='flex flex-col gap-2 justify-center'>
           <p className='text-base tracking-wide text-richblack-300 font-medium'>First Name</p>
            <p className=' text-base tracking-wide text-white font-medium'>{user.firstName}</p>
          </div>
  
          <div className='flex flex-col gap-2 justify-center'>
           <p className='text-base tracking-wide text-richblack-300 font-medium'>Email</p>
            <p className=' text-base tracking-wide text-white font-medium'>{user.email}</p>
          </div>
          
          <div className='flex flex-col gap-2 justify-center'>
           <p className='text-base tracking-wide text-richblack-300 font-medium'>Gender</p>
            <p className=' text-base tracking-wide text-white font-medium'>{
              user.additinaolDetail.gender === null ? "Add Gender" : user.additinaolDetail.gender
            }</p>
          </div>
         </div>

         <div className='flex flex-col gap-5  w-[50%] '>
         <div className='flex flex-col gap-2 justify-center'>
           <p className='text-base tracking-wide text-richblack-300 font-medium'>Last Name</p>
            <p className=' text-base tracking-wide text-white font-medium'>{user.lastName}</p>
          </div>

          <div className='flex flex-col gap-2 justify-center '>
           <p className='text-base items-start tracking-wide text-richblack-300 font-medium'>Phone Number</p>
            <p className=' text-base tracking-wide text-white font-medium'>{
              user.additinaolDetail.contactNumber === null ? "Add Contact Number" : user.additinaolDetail.contactNumber
            }</p>
          </div>


          <div className='flex flex-col gap-2 justify-center'>
           <p className='text-base tracking-wide text-richblack-300 font-medium'>Date Of Birth</p>
            <p className=' text-base tracking-wide text-white font-medium'>
              {
                 user.additinaolDetail.dateOfBirth === null ? "Add Date of Birth" : user.additinaolDetail.dateOfBirth
              }
            </p>
          </div>
         </div>
          </div>
        
         </div>
        </div>
    
  )
}

export default MyProfile
