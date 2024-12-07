import React from 'react'
import { Link ,NavLink} from 'react-router'
import logo from "../assets/Symbol-01.png"

function Header() {
  return (
    <div >
      <nav>
        <div className='flex justify-between px-5 items-center bg-orange-500'>
          <div>
            <Link to={"/"}>  
              <img className='w-14' src={logo} alt='logo'></img>
            </Link>
          </div>

          <div>
            <ul className='flex items-center text-white text-2xl gap-5 font-semibold'>
              <li>
                <NavLink to="/">
                  Home
                </NavLink>
              </li>
              <li>
              <NavLink to="/about">
                  About
                </NavLink>
              </li>
              <li>
              <NavLink className={({isActive})=>`${isActive?"text-white  decoration-solid":"text-white"} hover:text-white`} to="/store">
                  Store
              </NavLink>
              </li>
            </ul>
          </div>


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
            
          </div>
          

        </div>
      </nav>
    </div>
  )
}

export default Header