import React, { useState } from 'react'
import { sidebarLinks } from "../data/dashboard-links"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLik from './SidebarLik'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModel from '../components/common/ConfirmationModel'
import { lougOut } from '../service/operations/authApi'
import { useNavigate } from 'react-router-dom'
const Sidebar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.profile);
    

    const [confModel, setConfModel] = useState(null)

    if (profileLoading || authLoading) {
        return <div>
            Loading....
        </div>
    }

    


    return (
        <div className=' w-[260px]  border-richblack-700 border border-t-0  h-[calc(100vh-3.5rem)] text-white bg-richblack-800
        py-9'>

            {

                sidebarLinks.map((item) => {
                    if (item.type && user.accountType !== item.type) return null
                    return (
                        <SidebarLik link={item.path} iconName={item.icon} name={item.name} />
                    )
                }
                )
            }

            <div className='w-[180px] mx-auto border-b py-3 border-richblack-700 '></div>

            <div className='pt-5'>
                <SidebarLik
                    name={"Settings"} link={"/dashboard/settings"}
                    iconName="VscSettingsGear"
                />
            </div>

            <div onClick={() => setConfModel({
                text1:"Are you sure?",
                text2:"You will be logged out of your account.",
                btn1: "logout",
                btn2:"cancle",
                handler1: () => dispatch(lougOut(navigate)),
                handler2: () => setConfModel(null)
            })}
            className='pt-1  flex pl-8 font-medium w-full px-4 p-2 items-center cursor-pointer'>
                <div className='flex items-center justify-center text-richblack-300 gap-2'>
                    <span className='text-xl tracking-wide  '
                    >{<VscSignOut/>}</span>
                    <p className='   text-sm tracking-wide  '>
                       Logout
                    </p>
                </div>
            </div>

         {
            confModel &&   <ConfirmationModel modelData={confModel}/>
         }
            
        </div>

    )
}

export default Sidebar
