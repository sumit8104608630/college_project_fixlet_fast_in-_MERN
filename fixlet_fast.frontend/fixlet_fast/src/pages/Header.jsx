import React, { useEffect } from 'react'
import { Link ,NavLink} from 'react-router'
import logo from "../assets/Symbol-01.png"
import { BsFillPersonFill } from "react-icons/bs";
import SearchBar from "../component/Search"
import { useSelector,useDispatch} from 'react-redux';
import Location from '../component/Location'
import { fetchUser } from '../app/Actions/user_action';

function Header() {
const dispatch=useDispatch()
const {isLogin,userInfo,isLoading}=useSelector((state)=>state.user);

useEffect(()=>{
  dispatch(fetchUser())
  return () => {
    // Cleanup code (optional)
    console.log("Cleanup function called");
  };
},[isLogin])

console.log(isLogin)
  return (
    <div>

      {
       
      <nav className='fixed w-full'>
        <div className='flex justify-between px-5 items-center py-2 bg-orange-500'>
          <div>
            <Link to={"/"}>  
              <img className='w-14' src={logo} alt='logo'></img>
            </Link>
          </div>

          <div>
            <ul className='flex items-center text-white text-2xl gap-8 font-semibold'>
              <li>
                <NavLink to="/" className={({ isActive }) => `relative text-white ${isActive ? "decoration-solid" : ""}  hover:text-white after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px]  after:w-0 after:bg-white after:transition-all after:duration-300  hover:after:left-0 hover:after:w-full `}>
                  Home
                </NavLink>
              </li>
              <li>
              <NavLink className={({ isActive }) => `relative text-white ${isActive ? "decoration-solid" : ""}  hover:text-white after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px]  after:w-0 after:bg-white after:transition-all after:duration-300  hover:after:left-0 hover:after:w-full `}to="/about">
                  About
                </NavLink>
              </li>
              <li>
              <NavLink className={({ isActive }) => `relative text-white ${isActive ? "decoration-solid" : ""}  hover:text-white after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px]  after:w-0 after:bg-white after:transition-all after:duration-300  hover:after:left-0 hover:after:w-full `}to="/store">
                   Store
              </NavLink>
              </li>
            </ul>
          </div>
          
          <div className="flex gap-5">
            <Location/>
           <SearchBar/>
            </div>

{ !isLogin?
          <div className='flex gap-5'>

            <div>
            <NavLink className={({isActive})=>`${isActive?"text-orange-500 border-orange-500 border-2 font-semibold text-xl bg-white px-5 py-1 rounded":"text-white text-xl font-semibold border-2 px-5 py-1 rounded border-white"} hover:text-orange-500 hover:border-orange-500  hover:bg-white`} to={"/login"}>
              Login
            </NavLink>
            </div>

            <div>
            <NavLink className={({isActive})=>`${isActive?"text-orange-500 border-orange-500 font-semibold text-xl border-2 bg-white px-5 py-1 rounded":"text-white text-xl font-semibold border-2 px-5 py-1 rounded border-white"} hover:text-orange-500 hover:border-orange-500  hover:bg-white`} to={"/register"}>
              Sign Up
            </NavLink>
            </div>
            
          </div>:null
}

        </div>
      </nav>
    }

    </div>
  )
}

export default Header