import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import ConfirmationModel from '../components/common/ConfirmationModel'

const Dashbord = () => {

  const { loading: authLoading } = useSelector((state) => state.auth)
  const { loading: profileLoading } = useSelector((state) => state.profile)

  const [confModel, setConfModel] = useState(true)

  if (authLoading || profileLoading) {
    return (
      <div className='spinner w-screen flex flex-col justify-center items-center'>
        Loading....
      </div>
    )

  }

  return (
    <div className=' relative h-[calc(100vh-3.5rem)] bg-richblack-900 text-white overflow-hidden flex'>
      <Sidebar />

      <div className=' overflow-auto w-screen'>
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>

          <Outlet />

        </div>
      </div>

      {/* confirm mation model */}

     
    </div>
  )
}

export default Dashbord
