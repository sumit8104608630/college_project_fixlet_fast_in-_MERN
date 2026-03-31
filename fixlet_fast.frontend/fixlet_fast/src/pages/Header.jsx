import React, { useEffect, useState } from 'react'
import { Link ,NavLink} from 'react-router'
import logo from "../assets/Symbol-01.png"
import axios from 'axios';
import Cookies from "js-cookie"
import SearchBar from "../component/Search"
import { useSelector,useDispatch} from 'react-redux';
import Location from '../component/Location'
import { CgProfile } from "react-icons/cg";
import { fetchUser } from '../app/Actions/user_action';
import { FaShoppingCart } from "react-icons/fa";
import {logout} from "../app/user.redux"
import { currentContext } from '../component/Context.jsx';
import { useContext } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
import { AiFillLayout } from "react-icons/ai";


import { IoMenu, IoClose } from "react-icons/io5";
import ProfileMobileMenu from '../component/ProfileMobileMenu.jsx'

const apiUrl=import.meta.env.VITE_BACKEND_API_URL
function Header() {
const {cartItems}=useSelector((state)=>state.cart);
const Show=useContext(currentContext)
const [profileToggle,setProfileToggle]=useState(false)
const [isMenuOpen, setIsMenuOpen] = useState(false);
const dispatch=useDispatch();
const [cartCount, setCartCount] = useState(); // Example cart count
const [isScroll,setIsScroll]=useState(false)
const {isLogin,userInfo}=useSelector((state)=>state.user);
const city=userInfo?.city


useEffect(() => {
  const handleScroll = () => {
    setIsScroll(window.scrollY > 0);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


const handelLogout=(e)=>{
  e.preventDefault()
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
useEffect(()=>{
  Show.setShowAddress(false)
return ()=>{
  Show.setShowAddress(true)
}
},[Show])

useEffect(()=>{

  dispatch(fetchUser())
  setProfileToggle(false)
},[isLogin,dispatch])

useEffect(()=>{
  setProfileToggle(false)
  const singleArray=cartItems?.map((item=>item.productDetails)).flat()
  setCartCount(singleArray.length)
},[cartItems])

  return (
    <>
      <div className='fixed top-0 left-0 w-full z-50'>
        {/* Desktop Header */}
        <nav className={`hidden lg:flex w-full ${isScroll ? 'shadow-xl bg-orange-600' : 'shadow-none bg-orange-500'} items-center transition-all duration-300`}>
          <div className='flex justify-between w-full px-6 lg:px-10 items-center py-2'>
            <div className='flex items-center gap-6 lg:gap-12'>
              <Link to={"/"}>  
                <img className='w-10 lg:w-12' src={logo} alt='logo' />
              </Link>

              <ul className='flex items-center text-white gap-4 lg:gap-8 font-semibold'>
                <li>
                  <NavLink to="/" className={({ isActive }) => `relative text-base lg:text-lg text-white ${isActive ? "after:w-full" : "after:w-0"} hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 py-1`}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={({ isActive }) => `relative text-base lg:text-lg text-white ${isActive ? "after:w-full" : "after:w-0"} hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 py-1`}>
                    About
                  </NavLink>
                </li>
              </ul>
            </div>

            {Show.checkout && (
              <div className="flex gap-4 lg:gap-5 items-center flex-1 justify-center max-w-2xl mx-4">
                {userInfo && <Location />}
                <div className="flex-1 max-w-md">
                  <SearchBar />
                </div>
              </div>
            )}

            {!userInfo ? (
              <div className='flex gap-3 lg:gap-5'>
                <NavLink className={({isActive}) => `${isActive ? "text-orange-500 bg-white" : "text-white"} border-2 border-white px-4 lg:px-5 py-1 rounded-full text-sm lg:text-base font-semibold hover:bg-white hover:text-orange-500 transition-colors`} to={"/login"}>
                  Login
                </NavLink>
                <NavLink className={({isActive}) => `${isActive ? "text-orange-500 bg-white" : "text-white"} border-2 border-white px-4 lg:px-5 py-1 rounded-full text-sm lg:text-base font-semibold hover:bg-white hover:text-orange-500 transition-colors`} to={"/register"}>
                  Sign Up
                </NavLink>
              </div>
            ) : (
              Show.checkout && (
                <div className='flex items-center gap-4 lg:gap-6'>
                  {Show.cartShow && (
                    <div className="relative">
                      <Link to="/cart">
                        <FaShoppingCart size={24} className="text-white" />
                        {cartCount > 0 && (
                          <span className="absolute -top-2 -right-2 text-[10px] font-bold text-white bg-red-600 rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                          </span>
                        )}
                      </Link>
                    </div>
                  )}
                  <div className='relative'>
                    <button onClick={() => setProfileToggle(prev => !prev)} className="flex items-center gap-1">
                      <CgProfile className='text-white' size={28} />
                      <IoIosArrowDown className={`text-white transition-transform ${profileToggle ? 'rotate-180' : ''}`} />
                    </button>
                    {profileToggle && (
                      <div className='absolute top-full right-0 mt-2 bg-white min-w-[160px] rounded-lg shadow-xl overflow-hidden py-1 border border-gray-100'>
                        <Link to="/helpCenter" className='block px-4 py-2 text-gray-700 hover:bg-orange-50 transition-colors'>Help Center</Link>
                        <Link to="/myBooking" className='block px-4 py-2 text-gray-700 hover:bg-orange-50 transition-colors'>My Booking</Link>
                        <button onClick={handelLogout} className='w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors'>Logout</button>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </nav>

        {/* Mobile/Tablet Header */}
        <nav className={`lg:hidden flex flex-col w-full ${isScroll ? 'shadow-lg bg-white' : 'bg-white'} transition-all duration-300`}>
          <div className='flex justify-between items-center px-4 py-3'>
            <div className='flex items-center gap-3'>
              <button onClick={() => setIsMenuOpen(true)}>
                <IoMenu size={28} className="text-orange-500" />
              </button>
              <Link to="/">
                <img className='w-10' src={logo} alt='logo' />
              </Link>
            </div>

            {Show.checkout && (
              <div className='flex items-center gap-4'>
                {userInfo && (
                  <div className="max-w-[150px] md:max-w-[300px]">
                    <Location />
                  </div>
                )}
                {Show.cartShow && (
                  <div className="relative">
                    <Link to="/cart">
                      <FaShoppingCart size={24} className="text-orange-500" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 text-[10px] font-bold text-white bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {!userInfo && (
              <div className='flex gap-2'>
                <Link to="/login" className="text-orange-500 text-sm font-semibold border border-orange-500 px-3 py-1 rounded-full">Login</Link>
              </div>
            )}
          </div>
          
          {Show.checkout && (
            <div className="px-4 pb-3">
              <SearchBar />
            </div>
          )}
        </nav>
      </div>


      {/* Mobile Menu Overlay */}
      <ProfileMobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  )
}

  


export default Header