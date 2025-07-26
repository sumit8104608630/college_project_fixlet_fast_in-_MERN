import React from 'react';
import { X, HelpCircle, LogOut, Calendar, Home, Info } from 'lucide-react';
import {  useNavigate } from 'react-router';
import axios from 'axios';
import Cookies from "js-cookie"
import { useDispatch } from 'react-redux';
import {logout} from "../app/user.redux"

function ProfileMobileMenu({ isOpen, onClose }) {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const apiUrl=import.meta.env.VITE_BACKEND_API_URL

const handelLogout=()=>{
   axios.post( `${apiUrl}/user/user_logout`,{},{
    withCredentials:true
  }).then((response)=>{
    if(response.status===200){
    Cookies.remove('accessToken')
    Cookies.remove('refresh_token');
    dispatch(logout())
    }
    else{
      console.log("logout failed")
    }
  })
}

  if (!isOpen) return null;
  const handleHomeClick=(click)=>{
if(click==="home"){navigate("/")}
if(click==="about"){navigate("/about")}
if(click==="helpCenter"){navigate("/helpCenter")}
if(click==="myBooking"){navigate("/myBooking")}
if(click==="Logout"){
  handelLogout()
  onClose(false)
}

}


  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-20"
        onClick={onClose}
      />

      {/* Profile Popup */}
      <div className="fixed bottom-1/2 left-1/2 transform -translate-x-1/2 z-30 w-80 max-w-[90vw]">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200">
          {/* Header with close button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Profile Menu</h3>
            <button
              onClick={()=>onClose(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button 
            onClick={()=>handleHomeClick("home")}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <Home size={22} className="text-orange-600" />
              <span className="text-gray-700 font-medium">Home</span>
            </button>
            <button
              onClick={()=>handleHomeClick("about")}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
            <Info size={22} className="text-green-600" />

              <span className="text-gray-700 font-medium">About</span>
            </button>
            <button
            onClick={()=>handleHomeClick("helpCenter")}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <HelpCircle size={22} className="text-blue-600" />
              <span className="text-gray-700 font-medium">Help Center</span>
            </button>

            <button
            onClick={()=>handleHomeClick("myBooking")}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <Calendar size={20} className="text-green-600" />
              <span className="text-gray-700 font-medium">My Booking</span>
            </button>

            <button
              onClick={() => handleHomeClick('Logout')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-100"
            >
              <LogOut size={22} className="text-red-600" />
              <span className="text-gray-700 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileMobileMenu;