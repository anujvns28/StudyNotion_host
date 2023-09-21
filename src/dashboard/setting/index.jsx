import React from 'react'
import ChengeProfilePicutre from './ChengeProfilePicutre'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

export default function DashboardSettings() {
  return (
    <div>
      <h1 className='text-4xl mb-16'>Edit Profile</h1>
      <ChengeProfilePicutre/>

      <EditProfile/>

      <UpdatePassword/>

      <DeleteAccount/>
    </div>
  )
}


