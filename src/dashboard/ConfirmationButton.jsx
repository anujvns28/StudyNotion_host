import React, { Children } from 'react'

const ConfirmationButton = ({children,active}) => {
  return (
    <div
     className={`${active ? "bg-yellow-50 text-black" : "bg-richblack-200 text-black"} rounded-md
     px-3 py-2`}>
      {children}
    </div>
  )
}

export default ConfirmationButton
