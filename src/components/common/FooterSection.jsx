import React from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FooterLink2 } from '../../data/footer-links';
import { NavbarLinks } from '../../data/navbarLinks';


const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
  ];
  const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
  const Plans = ["Paid memberships", "For students", "Business solutions"];
  const Community = ["Forums", "Chapters", "Events"];

const FooterSection = () => {
    
   

  return (
    <div className='w-full bg-richblack-800 pt-16'>
     <div className='flex  w-11/12 max-w-maxContent mx-auto  pb-5 '>
     <div className='flex w-[50%] text-white border-r border-richblack-700  justify-between '>
      <div className='w-[33%] pr-8 '>
        <img src={Logo}/>

        <h2 className='mt-3 text-richblack-50 font-semibold text-[16px]'>Company</h2>
        {
            ["About", "Careers", "Affiliates"].map(item =>{
                return <div className='flex flex-row mt-3 text-[14px] cursor-pointer text-richblack-300
                 hover:text-white transition-all duration-200'>
                    <Link to={item.toLowerCase()} > {item}</Link>
                </div>
            })
        }
        <div className='flex gap-4 mt-3 text-richblack-300'>
                 <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
        </div>
      </div>
      <div className='w-[33%]'>
        <h2 className=' text-richblack-50 font-semibold text-[16px]'>Resources</h2>
        {
            Resources.map(item =>{
                return <div className='flex flex-row mt-3 text-[14px] cursor-pointer text-richblack-300
                hover:text-white transition-all duration-200'>
                    <Link to={item.toLowerCase()}>{item}</Link>
                </div>
            })
        }
        <h2 className='mt-3 text-richblack-50 font-semibold text-[16px]'>Support</h2>
       <div className='flex flex-row mt-3 text-[14px] cursor-pointer text-richblack-300
                 hover:text-white transition-all duration-200'>
       <Link to={"helpCenter"}>Help Center</Link>
       </div>
      </div>
      <div className='w-[33%]'>
      <h2 className=' text-richblack-50 font-semibold text-[16px]'>Plans</h2>
      {
            Plans.map(item =>{
                return <div className='flex flex-row mt-3 text-[14px] cursor-pointer text-richblack-300
                hover:text-white transition-all duration-200'>
                    <Link to={item.toLowerCase()}>{item}</Link>
                </div>
            })
        }

     <h2 className='mt-3 text-richblack-50 font-semibold text-[16px]'>Community</h2>
      {
            Community.map(item =>{
                return <div className='flex flex-row mt-3 text-[14px] cursor-pointer text-richblack-300
                hover:text-white transition-all duration-200'>
                    <Link to={item.toLowerCase()}>{item}</Link>
                </div>
            })
        }
      </div>
      </div>

      <div className='flex w-[50%] text-white  justify-between'>
      <div className='w-[33%] pl-5 pb-8'>
      <h2 className=' text-richblack-50 font-semibold text-[16px]'>{FooterLink2[0].title}</h2>
      {
            FooterLink2[0].links.map(item =>{
                return <div className='flex flex-row mt-3 text-[14px] cursor-pointer text-richblack-300
                hover:text-white transition-all duration-200'>
                    <Link to={item.link}>{item.title}</Link>
                </div>
            })
        }
      </div>

      <div>
      <h2 className=' text-richblack-50 font-semibold text-[16px]'>{FooterLink2[1].title}</h2>
      {
            FooterLink2[1].links.map(item =>{
                return <div className='flex flex-row mt-3 text-[14px] cursor-pointer text-richblack-300
                hover:text-white transition-all duration-200'>
                    <Link to={item.link}>{item.title}</Link>
                </div>
            })
        }
      </div>
      <div>
      <h2 className=' text-richblack-50 font-semibold text-[16px]'>{FooterLink2[2].title}</h2>
      {
            FooterLink2[2].links.map(item =>{
                return <div className='flex flex-row mt-3 text-[14px] cursor-pointer text-richblack-300
                hover:text-white transition-all duration-200'>
                    <Link to={item.link}>{item.title}</Link>
                </div>
            })
        }
      </div>
      </div>
     </div>

     <div className='flex max-w-maxContent mx-auto border-t py-14 border-richblack-700 justify-between  ' >
        <div className='flex  '>
        {
        BottomFooter.map((item,index) =>{

            return <div className={`${BottomFooter.length-1 > index ? " border-r px-4 border-richblack-700 ":""} flex px-4`}>
               <p className='text-[14px] cursor-pointer text-richblack-300
            hover:text-white transition-all duration-200'> 
                <Link to={item.split(" ").join("-")}>{item}</Link> 
                </p>
            </div>
        })
       }
        </div>
       
        <div className='text-[14px] cursor-pointer text-richblack-300
            '>
        Made By ❤️ Anuj Yadav © 2023 Studynotion
        </div>
      </div>
    </div>
  )
}

export default FooterSection
