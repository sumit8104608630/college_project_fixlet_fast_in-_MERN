import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router';
import { IoIosArrowForward } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaBookReader } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GiAutoRepair } from "react-icons/gi";
import { useNavigate } from 'react-router';

function HelpCenter() {
  const navigate = useNavigate();

  const handleBackFunctionality=()=>{
    navigate("/");
  }
  return (
    <main className='flex justify-center py-10 h-screen  bg-gray-100'>
      <div className='w-1/3 '>
        <button onClick={handleBackFunctionality} >
        <FaArrowLeftLong className='' size={30}/>
        </button>
        <h1 className='text-3xl mt-10 font-bold text-gray-800 mb-5'>How can we help you?</h1>

        <div className='bg-white px-4 py-8  rounded'  >
          <h1 className='font-semibold text-2xl mb-4'>All topics</h1>
          <ul>
           <Link to={`/account`} className='flex border-b-2 justify-between items-center'> <li className='py-2 flex items-center '><span><RiAccountCircleFill className='text-gray-700' size={30}/></span> <span className='text-base  text-gray-700 px-5 py-1'>Account</span></li><span><IoIosArrowForward className='text-gray-500' size={20}/></span></Link>
           <Link className='flex border-b-2 justify-between items-center'> <li className='py-2 flex items-center '><span><FaBookReader className='text-gray-700' size={25}/></span> <span className='text-base  text-gray-700 px-5 py-1'>Getting Started with Fixlet Fast</span></li><span><IoIosArrowForward className='text-gray-500' size={20}/></span></Link>
           <Link to={'/safetyCheck'} className='flex border-b-2 justify-between items-center'> <li className='py-2 flex items-center '><span><AiFillSafetyCertificate className='text-gray-700' size={25}/></span> <span className='text-base  text-gray-700 px-5 py-1'>Our Safety</span></li><span><IoIosArrowForward className='text-gray-500' size={20}/></span></Link>
           <Link className='flex  justify-between items-center'> <li className=' pt-2 flex items-center '><span><GiAutoRepair className='text-gray-700' size={25}/></span> <span className='text-base  text-gray-700 px-5 pt-1'>Warranty</span></li><span><IoIosArrowForward className='text-gray-500' size={20}/></span></Link> 
          </ul>
        </div>
      </div>
    </main>
  )
}

export default HelpCenter