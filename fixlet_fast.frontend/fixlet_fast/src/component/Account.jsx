import React from 'react'
import { Link } from 'react-router'
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";


function Account() {
  return (
    <main className='flex justify-center py-10 h-screen  bg-gray-100'>
      <div className='w-1/3 '>
        <Link to={"/helpCenter"}>
        <FaArrowLeftLong className='' size={30}/>
        </Link>
        <h1 className='text-3xl mt-10 font-bold text-gray-800 mb-5'>How can we help you?</h1>

        <div className='bg-white px-4 py-8  rounded'  >
          <h1 className='font-semibold text-2xl mb-4'>All topics</h1>
          <ul>
           <Link to={`/changePassword`} className='flex border-b-2 justify-between items-center'> <li className='py-2 flex items-center '> <span className='text-base  text-gray-700 px-5 py-1'>Change Password</span></li><span><IoIosArrowForward className='text-gray-500' size={20}/></span></Link>
           <Link to={'/changeEmail'} className='flex border-b-2 justify-between items-center'> <li className='py-2 flex items-center '> <span className='text-base  text-gray-700 px-5 py-1'>Change Email</span></li><span><IoIosArrowForward className='text-gray-500' size={20}/></span></Link>
           <Link className='flex justify-between items-center'> <li className='pt-2 flex items-center '> <span className='text-base  text-gray-700 px-5 pt-1'>Payment History</span></li><span><IoIosArrowForward className='text-gray-500' size={20}/></span></Link>
          </ul>
        </div>
      </div>
    </main>  )
}

export default Account