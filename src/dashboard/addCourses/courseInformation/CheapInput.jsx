import React from 'react'
import { MdClose } from "react-icons/md"
import { useState } from 'react'
import { useEffect } from 'react'

const CheapInput = (
    {
        label,
        name,
        placeholder,
        register,
        errors,
        setValue,
        getValues,
    }
) => {

    const [chips, setChips] = useState([])

    useEffect(() => {
        setValue(name, chips)
      }, [chips])

    //   handling tags 
      const handleKeydown   = (event) => {
       if(event.key === "Enter" || event.key === ","){
        event.preventDefault();
        const chipValue  = event.target.value.trim();
        if(chipValue && !chips.includes(chipValue)){
            const chipArray = [...chips,chipValue]
            setChips(chipArray);
            chipValue = ""
        }
       }
      }

      // deleting tag
      const handleDeletTag = (index) => {
      const newChips = [...chips]
      newChips.splice(index,1)
      setChips(newChips)
      }

      console.log(chips)
    return (
        <div className="flex flex-col space-y-2 text-black">
      {/* Render the label for the input */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
          
            {chip}
           
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeletTag(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeydown}
          className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
        />
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
    )
}

export default CheapInput
