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
import Loader from"../component/Loader.jsx"
import { currentContext } from '../component/Context.jsx';
import { useContext } from 'react';
import { useNavigate } from 'react-router';

function Header() {
const {cartLoading,cartItems,cartError}=useSelector((state)=>state.cart);
const Show=useContext(currentContext)
const [profileToggle,setProfileToggle]=useState(false)
const dispatch=useDispatch();
const [cartCount, setCartCount] = useState(); // Example cart count
const [isScroll,setIsScroll]=useState(false)
const {isLogin,userInfo,isLoading}=useSelector((state)=>state.user);
const [mapToggle,setMapToggle]=useState(null);



window.addEventListener("scroll",()=>{
  setIsScroll(true)
  if(window.scrollY==0)
    {
      setIsScroll(false)
    }
})


const handelLogout=(e)=>{
  e.preventDefault()
   axios.post('http://localhost:8000/user/user_logout',{},{
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
  dispatch(fetchUser())
  setProfileToggle(false)
  return () => {
    // Cleanup code (optional)
    console.log("Cleanup function called");
  };
},[isLogin,dispatch])

useEffect(()=>{
  setProfileToggle(false)
  const singleArray=cartItems?.map((item=>item.productDetails)).flat()
  setCartCount(singleArray.length)
},[cartItems])

  return (<>{
    <div className='absolute top-0 z-10'>
      {
        
      <nav className={`fixed w-full ${isScroll ? 'shadow-xl' : 'shadow-none'} items-center`}>
        <div className='flex justify-between  px-10 items-center py-2 bg-orange-500'>
          <div className='flex items-center gap-20'>
          <div>
            <Link to={"/"}>  
              <img className='w-12' src={logo} alt='logo'></img>
            </Link>
          </div>

          <div>
            <ul className='flex  items-center text-white text-2xl gap-8 font-semibold'>
              <li>
                <NavLink to="/" className={({ isActive }) => `relative text-lg text-white ${isActive ? "decoration-solid after:w-full after:left-0 after:translate-x-0" : "after:left-1/2 after:translate-x-[-50%]"} hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded py-1 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`}>
                  Home
                </NavLink>
              </li>
              <li>
              <NavLink className={({ isActive }) => `relative text-lg text-white ${isActive ? "decoration-solid after:w-full after:left-0 after:translate-x-0" : "after:left-1/2 after:translate-x-[-50%]"} hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded py-1 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`} to="/about">
                  About
                </NavLink>
              </li>
              <li>
              <NavLink className={({ isActive }) => `relative text-lg text-white ${isActive ? "decoration-solid after:w-full after:left-0 after:translate-x-0" : "after:left-1/2 after:translate-x-[-50%]"} hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded py-1 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`}to="/store">
                   Store
              </NavLink>
              </li>
            </ul>
          </div>
          </div>
          {Show.checkout&&
          <div className="flex gap-5">
           {userInfo?<Location />:""}
           <SearchBar/>
            </div>
}

{ !userInfo?
          <div className='flex gap-5'>

            <div>
            <NavLink className={({isActive})=>`${isActive?"text-orange-500 border-orange-500 border-2 font-semibold text-lg bg-white px-5 py-1 rounded-full":"text-white text-lg font-semibold border-2 px-5 py-1 rounded-full border-white"} hover:text-orange-500 hover:border-orange-500  hover:bg-white`} to={"/login"}>
              Login
            </NavLink>
            </div>

            <div>
            <NavLink className={({isActive})=>`${isActive?"text-orange-500 border-orange-500 font-semibold text-lg border-2 bg-white px-5 py-1 rounded-full":"text-white text-lg font-semibold border-2 px-5 py-1 rounded-full border-white"} hover:text-orange-500 hover:border-orange-500  hover:bg-white`} to={"/register"}>
              Sign Up
            </NavLink>
            </div>
            
          </div>:null
}
{userInfo&&Show.checkout?
<div className='flex items-center gap-5'>
  {Show.cartShow&&
<div className="relative">
      <Link to="/cart">
        <FaShoppingCart size={25} className="text-white font-bold" />
        {cartCount >0 && (
          <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-white bg-red-600 rounded-full px-2 py-0.5">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
}
  <div className='relative'>
    
  <button onClick={() => setProfileToggle(prev => !prev)}>
    <CgProfile className='text-white' size={30} />
  </button>
  {profileToggle ? (
    <div className='absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-100 w-max rounded shadow-md'>
      <ul className='flex flex-col gap-2 px-4 py-2'>
        <li>
          <Link to={`/helpCenter`}>Help Center</Link>
        </li>
        <li>
          <Link to={"/booking_page"}>My Booking</Link>
        </li>
        <li>
          <button onClick={handelLogout}>Logout</button>
        </li>
      </ul>
    </div>
  ) : (
    ""
  )}
</div></div>:""}
        </div>
      </nav>
    }

    </div>
}
    </>
  )
}

export default Header