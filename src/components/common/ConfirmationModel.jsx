import React from 'react'
import ConfirmationButton from '../../dashboard/ConfirmationButton'

const ConfirmationModel = ({modelData}) => {
    console.log("modledata",modelData)
    return (

 <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
<div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
  <p className="text-2xl font-semibold text-richblack-5">
    {modelData?.text1}
  </p>
  <p className="mt-3 mb-5 leading-6 text-richblack-200">
    {modelData?.text2}
  </p>
  <div className="flex items-center gap-x-4 cursor-pointer">
    <ConfirmationButton active={true}  >
            <p onClick={() => modelData.handler1()}
             className='font-semibold px-2'> {modelData.btn1}</p>
    </ConfirmationButton>

    <ConfirmationButton active={false} >
          <p onClick={() => modelData.handler2()}
            className='font-semibold px-2 cursor-pointer'> {modelData.btn2}</p>
    </ConfirmationButton>
    
  </div>
</div>
</div> 
    )
}

export default ConfirmationModel
