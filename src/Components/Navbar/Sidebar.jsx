import React from 'react'
import { useContext, useEffect, useState } from "react";

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
import Swal from 'sweetalert2';
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card"; // Assuming Card component is used for individual metrics
import { supabase } from "../../firebase/supabaseClient"; // Import Supabase client
import { jsPDF } from "jspdf"; // Import jsPDF

const Sidebar = () => {
    const { user, logOut } = useContext(AuthContext);

     // Log out handler
  const handleLogOut = () => {
    // Assume logOut is a function that handles the logout logic, like clearing tokens or user data
    // You should replace it with your actual logout logic
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/"); // Redirect after successful logout
      })
      .catch((error) => {
        console.error("Logout Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: error.message,
        });
      });
  };


    return (
      <div className="text-gray-900 px-4 fixed w-16 md:w-64 border-r border-gray-300 h-screen bg-gray-50 shadow-lg">
        {/* Logo Section */}
        <div>
          <img
            src={logo}
            alt="Easy Diary Logo"
            className="h-32 py-4 m-auto"
          />
        </div>
  
        {/* Navigation Links */}
        <ul className="flex flex-col mt-3 text-base">
          {/* Functional Compose Link */}
          <NavLink
            to="/compose"
            className={({ isActive }) =>
              `flex items-center py-3 px-6 space-x-4 font-medium rounded-lg 
              transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-500"
              }`
            }
          >
            <FaPenToSquare className="text-xl" />
            <span className="hidden md:inline">ডায়রি লিখুন</span>
          </NavLink>
  
          {/* Non-functional Dashboard Link */}
          <div
            className="flex items-center py-3 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed"
          >
            <FaTachometerAlt className="text-xl" />
            <span className="hidden md:inline">ড্যাশবোর্ড</span>
          </div>
  
          {/* Non-functional Notifications Link */}
          <div
            className="flex items-center py-3 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed"
          >
            <IoIosNotifications className="text-xl" />
            <span className="hidden md:inline">নোটিফিকেশন</span>
          </div>
  
          {/* Non-functional History Link */}
          <div
            className="flex items-center py-3 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed"
          >
            <FaHistory className="text-xl" />
            <span className="hidden md:inline">ইতিহাস</span>
          </div>
  
          {/* Non-functional Sent Link */}
          <div
            className="flex items-center py-3 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed"
          >
            <IoIosSend className="text-xl" />
            <span className="hidden md:inline">প্রেরিত</span>
          </div>
  
          {/* Non-functional Received Link */}
          <div
            className="flex items-center py-3 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed"
          >
            <MdCallReceived className="text-xl" />
            <span className="hidden md:inline">গৃহীত</span>
          </div>
  
          {/* Non-functional Pending Link */}
          <div
            className="flex items-center py-3 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed"
          >
            <MdOutlinePendingActions className="text-xl" />
            <span className="hidden md:inline">অমীমাংসিত</span>
          </div>
  
          {/* Non-functional Completed Link */}
          <div
            className="flex items-center py-3 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed"
          >
            <GrCompliance className="text-xl" />
            <span className="hidden md:inline">সম্পন্ন</span>
          </div>
  
          {/* Non-functional Call Support Link */}
          <div
            className="flex items-center py-3 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed"
          >
            <RiCustomerService2Line className="text-xl" />
            <span className="hidden md:inline">জরুরী প্রোয়জন</span>
          </div>
  
          {/* Non-functional Account Link */}
          <div
            className="flex items-center py-3 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed"
          >
            <MdOutlineManageAccounts className="text-xl" />
            <span className="hidden md:inline">অ্যাকাউন্ট</span>
          </div>

 {/* Log Out Link */}
 <div
          onClick={handleLogOut}
          className="flex items-center py-3 px-6 space-x-4 font-medium rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-500 cursor-pointer"
        >
          <IoMdLogOut className="text-xl" />
          <span className="hidden md:inline">লগ আউট</span>
        </div>



        </ul>
      </div>
    );
  };
  
  export default Sidebar;