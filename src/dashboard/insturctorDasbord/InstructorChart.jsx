import React, { useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';


const InstructorChart = ({courses}) => {
    const [chart,setChart] = useState("Student")

    const generateRandomColors = () => {
       
          const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)})`
         
      
        return color
      }

    const incomeArr = []
    const studentArr = []
    console.log(courses,'kkkk')
    courses.data.map((course) =>incomeArr.push({title:course.courseName,value:course.totalAmountGenerated,color:generateRandomColors()}))
    courses.data.map((course) => studentArr.push({title:course.courseName,value:course.totalStudentsEnrolled,color:generateRandomColors()}))
    

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
    <p className="text-lg font-bold text-richblack-5">Visualize</p>
    <div className="space-x-4 font-semibold">
      {/* Button to switch to the "students" chart */}
      <button onClick={() => setChart("Student")}
      className={`rounded-sm p-1 px-3 transition-all duration-200 ${
        chart === "Student"
          ? "bg-richblack-700 text-yellow-50"
          : "text-yellow-400"
      }`}
      >
        Students
      </button>
      {/* Button to switch to the "income" chart */}
      <button onClick={() => setChart("Anuj")}
      className={`rounded-sm p-1 px-3 transition-all duration-200 ${
        chart === "Anuj"
          ? "bg-richblack-700 text-yellow-50"
          : "text-yellow-400"
      }`}
      >
        Income
      </button>
    </div>
    
    <div className="relative mx-auto aspect-square h-[80%] w-full top-0 ">
      {/* Render the Pie chart based on the selected chart */}
      <PieChart
    data={chart === "Student" ? studentArr : incomeArr}
/>
      
    </div>
  </div>
)
}

  

export default InstructorChart
