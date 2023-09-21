import React from 'react'
import {HiChatBubbleLeftRight} from "react-icons/hi2"
import {BiWorld} from "react-icons/bi"
import {BsTelephoneFill} from "react-icons/bs"
import ContectForm from '../components/core/contect/ContectForm'
import FooterSection from '../components/common/FooterSection'

const ContecPage = () => {
    const contect = [
        {
            icon:<HiChatBubbleLeftRight/>,
            heading:"Chat on us",
            desc:"Our friendly team is here to help.",
            visit:"anujvns28@gmail.com"
        },
        {
            icon:<BiWorld/>,
            heading:"Visit us",
            desc:"Come and say hello at our office HQ.",
            visit:"Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
        },
        {
            icon:<BsTelephoneFill/>,
            heading:"Call us",
            desc:"Mon - Fri From 8am to 5pm",
            visit:"+123 456 7869"
        }
    ]
  return (
    <div>
   <section  className='w-screen min-h-screen bg-richblack-900 pb-20'>
   <div className='w-11/12 max-w-maxContent mx-auto  pt-16
     flex flex-row justify-between'>
        <div className='w-[38%] h-max bg-richblack-800 rounded-xl py-10 flex flex-col gap-10'>
        {
            contect.map((item,index) =>{
                return <div className='flex flex-col text-white px-9 '>
                  <div className='flex glex-row gap-3'>
                  <p className='text-2xl text-richblack-300'>{item.icon}</p>
                  <h1 className='text-xl font-semibold'>{item.heading}</h1>
                  </div>
                  <p className=' text-start text-base tracking-wide text-richblack-300 font-medium'>{item.desc}</p>
                  <p className=' text-start text-base tracking-wide text-richblack-300 font-medium'> {item.visit}</p>
                </div>
            })
         }
        </div>
        <div className='w-[58%] border border-richblack-500 rounded-xl p-14'>
        <h1 className='text-4xl text-white font-semibold text-start'>
        Got a Idea? We've got the skills. Let's team up
        </h1>
        <p  className=' mt-3 text-start text-base tracking-wide text-richblack-300 font-medium'>
        Tell us more about yourself and what you're got in mind.
        </p>
        <ContectForm/>
        </div>

    </div>
   </section>

   <FooterSection/>

    </div>
  )
}

export default ContecPage
