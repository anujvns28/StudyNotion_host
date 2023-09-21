import React from 'react'
import countaryCoade from "../../../data/countrycode.json"
import { useForm } from 'react-hook-form'

const ContectForm = () => {

  function handleOnSubmit(e){
    e.preventDefault();
    console.log("hello ji kya hal chal")
  }


  return (
    <form onSubmit={handleOnSubmit}
    className='w-full mt-10 flex flex-col gap-8'>
    <div className='flex flex-row justify-between'>
    <label className='w-[48%]'>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >First Name</p>
    <input className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
 
     required
     placeholder="Enter first name"
     type='text'
     name = "firstName"
     
    />
    </label>

    <label className='w-[48%]'>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >Last Name </p>
    <input className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
 
     required
     placeholder="Enter last name"
     type='text'
     name = "lastName"
    />
    </label>
    </div>

    <label className='w-full'>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >Email Address</p>
    <input className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
 
     required
     placeholder="Enter email address"
     type='email'
     name = "email"
    />
    </label>
{/* phone nomber */}

    <label className='w-full'>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >Phone Nomber</p>
    <div className='flex w-full justify-between'>
    <select className='w-[15%] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
   >
   {
    countaryCoade.map((item ,index) => {
        return <option key={index} value={item.code}>
           {item.code} -{item.country} 
        </option>
    })
   }
    </select>
        
   
    

    <input className='w-[82%] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
 
     required
     placeholder="12345 67890"
     type='number'
     name = "firstName"
    />
    </div>
    </label>

    <label className='w-full'>
    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name</p>

    <textarea
     className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
     border-b border-pure-greys-300'
    placeholder='Enter your message heare'
    rows={7}
    cols={35}
    />
    </label>

    <button type='submit'
    className=' rounded-md bg-yellow-50 px-6 py-3 text-center  font-bold text-black 
    transition-all duration-200 hover:scale-x-95'>
        Send Message
    </button>
    </form>
  )
}

export default ContectForm
