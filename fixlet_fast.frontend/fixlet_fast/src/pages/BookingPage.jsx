import React from 'react'
import { useSearchParams } from 'react-router';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { MdPayments } from "react-icons/md";




function BookingPage() {
  const [searchParams] = useSearchParams();
  const {isLoading,userInfo}=useSelector((state)=>state.user);
console.log(userInfo)
  return (
    <main className='pt-28 w-full flex justify-center px-20'>
      <div className='w-4/5 flex justify-between gap-5'>
        <div className='w-full px-2 flex flex-col gap-5'>
          <div className='bg-green-200 px-5 rounded-lg py-4'><p className=' text-center text-green-800 font-medium text-xs'>You're saving total ₹60 on this order! .</p></div>


          <div className='border bg-gray-50 rounded-lg pb-2 flex flex-col'>
          <div className='flex items-center gap-4  px-3 py-4 ' >
            <IoIosMail className='text-gray-600 ' size={30}/><p className='flex flex-col'><spn className="text-base font-semibold text-gray-800">Send booking detail to</spn><span className='text-sm font-normal text-gray-600'>{userInfo?.email}</span></p>
          </div>
          <hr className=' my-2 bg-gray-500'/>
          <div className='flex items-center gap-4 px-3 py-4 ' >
            <div><FaLocationDot className='text-gray-600 ' size={25}/></div><p className='flex flex-col'><span className="text-base font-semibold text-gray-800">Address</span><span className='text-sm font-normal text-gray-600'>{userInfo?.location}</span></p>
          </div>
          <div className='px-2'>
          <button className='text-base font-semibold w-full rounded py-2 hover:bg-orange-600 text-white bg-orange-500'> change address </button>
          </div>
          <hr className=' my-2 bg-gray-500'/>

          <div className='flex items-center gap-4 px-3 py-4 ' >
            <div><IoTime className='text-gray-600 ' size={25}/></div><p>Slot</p>
          </div>
          <hr className=' my-2 bg-gray-500'/>
          <div className='flex items-center gap-4 px-3 py-4 ' >
            <div><MdPayments className='text-gray-600 ' size={25}/></div><p>Payment method</p>
          </div>
          </div>
          
          <div>
            <h1 className='text-lg font-semibold text-gray-800'>Cancellation policy</h1>
            <p className='text-gray-600'>Free cancellations if done more than 12 hrs before the service or if a professional isn’t assigned. A fee will be charged otherwise.</p>
            <button className='text-sm font-semibold underline'>Read full policy</button>
          </div>


        </div>
        <div className='w-full '>CheckOut detail</div>
      </div>
    </main>
  )
}

export default BookingPage