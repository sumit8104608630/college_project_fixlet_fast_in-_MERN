import React from "react";
import { NavLink ,Link} from "react-router-dom";
import "../index.css"
import logo from "../assets/Symbol-01.png"
function Header() {
  return (
    <header className="bg-orange-500 text-white py-2 px-6 flex justify-between items-center ">
       <Link to={"/"}>
      <div className="flex items-center space-x-3">
       
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold">Fixlet Fast</h1>
      </div>
      </Link>
      <nav>
      <ul className='flex items-center text-white text-2xl gap-8 font-semibold'>
      <li>
    <NavLink to="/bePartner" className={({ isActive }) => `relative text-lg text-white ${isActive ? "decoration-solid after:w-full after:left-0 after:translate-x-0" : "after:left-1/2 after:translate-x-[-50%]"} hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded py-1 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`}>
      Be Partner
    </NavLink>
  </li>
  <li>
    <NavLink to="http://localhost:5173/about" target="blank" className={({ isActive }) => `relative text-lg text-white ${isActive ? "decoration-solid after:w-full after:left-0 after:translate-x-0" : "after:left-1/2 after:translate-x-[-50%]"} hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded py-1 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`}>
      About
    </NavLink>
  </li>

</ul>

      </nav>
    </header>
  );
}

export default Header;
