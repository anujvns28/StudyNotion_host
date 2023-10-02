import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, useNavigate } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbarLinks'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { AiOutlineDown } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { lougOut } from '../../service/operations/authApi'
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { useEffect } from 'react'
import { fetchCourseCategories } from '../../service/operations/courseDetailsApi'
import { useState } from 'react'


const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks,setSublinks] = useState([])


  

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  useEffect(() => {
  const getSublinks = async() =>{
    const result = await fetchCourseCategories();
    
    if(result){
      setSublinks(result.data.allCategory)
    }
  }
  getSublinks()
  },[])




  return (
    <div className=' w-screen flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800'>
      <div className='relative flex w-11/12 max-w-maxContent items-center justify-between'>

        <Link to="/">
          <img src={logo} width={160} height={160} loading='lazy' />
        </Link>

        <div className='flex gap-x-6 text-richblack-25'>
          {
            NavbarLinks.map((item, index) => {
              return <div className=''>

                {
                  item.title === "Catalog" ? (
                    <div className='group relative flex cursor-pointer items-center gap-1 z-50'>
                      <p className='tracking-wide'>{item.title}</p>
                      <AiOutlineDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {
                          subLinks.length ? (
                            subLinks.map((subLink, index) => {
                              return <div className=''>
                               {
                                subLink.length === 0 ? "Loading..."
                                : <Link to={`/catalog/${subLink.link}`} key={index}>
                                <p className='hover:bg-richblack-50 py-4  px-4 rounded-md'
                                >{subLink.name}</p>
                              </Link>
                               } 
                              </div>
                            })
                          ) : (<div></div>)
                        }
                      </div>


                    </div>

                  ) :
                    (

                      <Link to={item.path}>
                        <p className={`${matchRoute(item.path) ? "text-yellow-25 tracking-wide" : "text-richblack-25 tracking-wide"} `}>  {item.title}</p>
                      </Link>
                    )
                }

              </div>
            })
          }
        </div>

        <div className='flex gap-x-4 items-center'>
          {
            token === null && (
              <Link to={"/login"}>
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                  Log in
                </button>
              </Link>
            )
          }

          {
            token === null && (
              <Link to={"/signup"}>
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                  Sign up
                </button>
              </Link>
            )
          }

          {
            token && user.accountType !== "Instructor" && (
              <Link to={"/dashboard/cart"}>
              <p className='text-2xl text-richblack-25'>  <AiOutlineShoppingCart /> </p>
              <p className='absolute text-caribbeangreen-50 -top-1 bg-richblack-800 px-1  rounded-full translate-x-4 '>{totalItems}</p>
              </Link>
            )
          }
          {
            token && user && (
              <ProfileDropDown/>
            )
          }
          






        </div>

      </div>
    </div>
  )
}

export default NavBar


// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000


