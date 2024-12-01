import React from 'react'
import logo from "../../assets/images/logo/easy-diary.png"
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt } from 'react-icons/fa'
import { IoIosNotifications } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { MdCallReceived } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className=
    'text-gray-900 px-4 fixed w-16 md:w-64 border-r border-gray-300 h-screen bg-gray-200'>
      <div>
      <img src={logo} alt="easy Dairy logo" className='h-32 py-4 m-auto ' />
      </div>
    <ul className='flex flex-col mt-3 text-xl'>
        <NavLink className="flex items-center py-1.5 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <FaPenToSquare />
            <span className='hidden md:inline '>Compose</span>
        </NavLink>
        <NavLink className="flex items-center py-1.5 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
            <FaTachometerAlt></FaTachometerAlt>
            <span className='hidden md:inline '>Dashboard</span>
        </NavLink>
        <NavLink className="flex items-center py-1.5 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
            <IoIosNotifications ></IoIosNotifications>
            <span className='hidden md:inline '>Notification</span>
        </NavLink>
        <NavLink className="flex items-center py-1.5 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
            <FaHistory></FaHistory>
            <span className='hidden md:inline '>History</span>
        </NavLink>
        <NavLink className="flex items-center py-1.5 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <IoIosSend />
            <span className='hidden md:inline '>Sent</span>
        </NavLink>
        <NavLink className="flex items-center py-1.5 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <MdCallReceived />
            <span className='hidden md:inline '>Received</span>
        </NavLink>
        <NavLink className="flex items-center py-1.5 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <MdOutlinePendingActions />
            <span className='hidden md:inline '>Pending</span>
        </NavLink>
        <NavLink className="flex items-center py-1.5 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <GrCompliance />
            <span className='hidden md:inline '>Completed</span>
        </NavLink>
        <NavLink className="flex items-center py-1.5 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <RiCustomerService2Line />
            <span className='hidden md:inline '>Call Support</span>
        </NavLink>
        <NavLink className="flex items-center py-1.5 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <MdOutlineManageAccounts />
            <span className='hidden md:inline '>Account</span>
        </NavLink>
        {/* <NavLink className="flex items-center  py-1.5 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <IoMdLogOut />
            <span className='hidden md:inline '>Logout</span>
        </NavLink> */}
    </ul>
  
    </div>
  )
}

export default Sidebar
