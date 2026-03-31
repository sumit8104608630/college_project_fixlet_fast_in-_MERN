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
}
onClose(false)
}


  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => onClose(false)}
      />

      {/* Side Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-orange-500 text-white">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">Fixlet Fast</h3>
              <p className="text-xs opacity-80">Home services at your doorstep</p>
            </div>
            <button
              onClick={() => onClose(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Main Menu</p>
              <button 
                onClick={() => handleHomeClick("home")}
                className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-orange-50 rounded-xl transition-all text-left group"
              >
                <Home size={22} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                <span className="text-gray-700 font-semibold group-hover:text-gray-900">Home</span>
              </button>
              
              <button
                onClick={() => handleHomeClick("about")}
                className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-orange-50 rounded-xl transition-all text-left group"
              >
                <Info size={22} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                <span className="text-gray-700 font-semibold group-hover:text-gray-900">About</span>
              </button>
            </div>

            <div className="px-4 mt-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Account & Support</p>
              <button
                onClick={() => handleHomeClick("helpCenter")}
                className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-orange-50 rounded-xl transition-all text-left group"
              >
                <HelpCircle size={22} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                <span className="text-gray-700 font-semibold group-hover:text-gray-900">Help Center</span>
              </button>

              <button
                onClick={() => handleHomeClick("myBooking")}
                className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-orange-50 rounded-xl transition-all text-left group"
              >
                <Calendar size={22} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                <span className="text-gray-700 font-semibold group-hover:text-gray-900">My Booking</span>
              </button>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => handleHomeClick('Logout')}
              className="w-full flex items-center gap-4 px-4 py-4 hover:bg-red-50 text-red-600 rounded-xl transition-all text-left group"
            >
              <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
              <span className="font-bold">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileMobileMenu;