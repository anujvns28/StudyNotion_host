import React, { useEffect, useState } from 'react'

const RequirmentFildes = ({
    name,
    label,
    register,
    setValue,
    errors,
    getValues,
}) => {

    const [requirement, setRequirement] = useState("")
    const [requirementsList, setRequirementsList] = useState([]);

    useEffect(() => {
        register(name,{
            required:true,
        })
    },[])

    useEffect(() => {
        setValue(name, requirementsList)
      }, [requirementsList])

    const handleAddRequirment = () => {
        if (requirement) {
            setRequirementsList([...requirementsList, requirement]);
            setRequirement("")
        }
    }

    const handleRemoveRequirment = (index) => {
        const updatedRequirements = [...requirementsList]
        updatedRequirements.splice(index, 1)
        setRequirementsList(updatedRequirements)
    }
    return (
        <div className="flex flex-col space-y-2 text-black">
            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label} <sup className="text-pink-200">*</sup>
            </label>
            <div className="flex flex-col items-start space-y-2">
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
                    border-b border-pure-greys-300'
                />
                <button
                    type="button"
                    onClick={handleAddRequirment}
                    className="font-semibold text-yellow-50"
                >
                    Add
                </button>
            </div>
            {requirementsList.length > 0 && (
                <ul className="mt-2 list-inside list-disc">
                    {requirementsList.map((requirement, index) => (
                        <li key={index} className="flex items-center text-richblack-5">
                            <span>{requirement}</span>
                            <button
                                type="button"
                                className="ml-2 text-xs text-pure-greys-300 "
                                onClick={() => handleRemoveRequirment(index)}
                            >
                                clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    )
}

export default RequirmentFildes
