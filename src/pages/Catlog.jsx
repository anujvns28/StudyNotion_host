import React from 'react'
import FooterSection from '../components/common/FooterSection'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { fetchCourseCategories } from '../service/operations/courseDetailsApi'
import { catalogPageData } from '../service/operations/catalogPageData'
import CourseSlider from '../components/core/catlog/CourseSlider'

const Catlog = () => {
    const [categoryId,setCategoryId] = useState(null);
    const [catalogData,setCatalodData] = useState(null);
    const [active, setActive] = useState(1)
    const catalogName  = useParams();

    console.log(catalogName)
    
    useEffect(() => {
     const getCategoryId = async() =>{
     const result = await fetchCourseCategories();
     console.log("calling")
     if(result){
        const category_Id = result.data.allCategory.filter((data) => data.link === catalogName.courseName)[0]._id
    setCategoryId(category_Id);
   
     }
     }
     getCategoryId()
    },[catalogName])

    useEffect(() => {
    const categoryData = async() =>{
        const result = await catalogPageData({_id :categoryId });
        if(result){
            setCatalodData(result.data)
        }
        console.log("uuuuuuuuuuuuu",result)
    }
    if(categoryId){
        categoryData()
    }
    },[categoryId])

     console.log("xxxxxxxxxx",catalogData,categoryId)

    
     
     
    return (

       <div className='bg-richblack-900'>
        {
        catalogData ?  <>
        {/* Hero Section */}
        <div className=" box-content bg-richblack-800 px-4">
          <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
            <p className="text-sm text-richblack-300">
              {`Home / Catalog / `}
              <span className="text-yellow-25">
              { catalogData.selectedCategori.name}
              </span>
            </p>
            <p className="text-3xl text-richblack-5">
            {catalogData.selectedCategori.name}
            </p>
            <p className="max-w-[870px] text-richblack-200">
              { catalogData.selectedCategori.description}
            </p>
          </div>
        </div>
  
        {/* Section 1 */}
        <div className="  mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="text-white font-bold text-4xl  ">Courses to get you started</div>
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
          </div>
          <div>
          {
            catalogData.selectedCategori.course.length === 0 ? 
             <h1 className='text-white font-bold text-4xl text-center'>No Course Found</h1>
             : <CourseSlider
             courses={catalogData.selectedCategori.course}  
           />
          }
          </div>
        </div>
        {/* Section 2 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="text-white font-bold text-4xl ">
            Top courses in { catalogData.outherCategoris.name}
          </div>
          <div className="py-8">


          {
            catalogData.outherCategoris.course.length === 0 ? 
             <h1 className='text-white font-bold text-4xl text-center'>No Course Found in   
              <span className="text-yellow-25"> { " "}
              {  catalogData.outherCategoris.name}
              </span>
             </h1>
             : <CourseSlider
             courses={catalogData.outherCategoris.course}
           />
          }
            
          </div>
        </div>
  
        {/* Section 3 */}
       
  
        <FooterSection />
      </> : <div className=' text-white bg-richblack-900 flex items-center justify-center h-[100vh] w-[100vw]'>  loading... </div>
       }
       </div>
    )
}

export default Catlog
