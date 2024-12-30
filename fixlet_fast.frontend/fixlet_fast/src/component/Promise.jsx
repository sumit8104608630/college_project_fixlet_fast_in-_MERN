import React from 'react'
import quality from "../assets/staticPhotp/quality.svg"
import { FaCheck } from "react-icons/fa";


function Promice() {
  return (
    <div className='relative border-2 w-96 pt-2 px-5  border-b-black border-b-2 rounded-t'>
        <div className='w-full flex  flex-col'>
        <div> <img className='' src={quality}/></div>
        </div>

        <ul className='w-full absolute top-1/2 '>
        <h1 className='text-lg font-semibold text-gray-800 mb-2'>Fixlet Fast Promise</h1>
            <li className='flex items-center gap-2'><FaCheck className='text-orange-500' size={20} /> <span className='text-md font-normal text-gray-800'> Skilled Technicians</span></li>
            <li className='flex items-center gap-2'><FaCheck className='text-orange-500' size={20} /> <span className='text-md font-normal text-gray-800'>Easy Booking</span></li>
            <li className='flex items-center gap-2'><FaCheck className='text-orange-500' size={20} /> <span className='text-md font-normal text-gray-800'> Transparent Pricing</span></li>
        </ul>
       
    </div>
  )
}

export default Promice