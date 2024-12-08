import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";

function Location() {
  return (
    <div className=' bg-white flex items-center px-2 rounded'>
    <FaLocationDot className='text-gray-500' size={20} />
    <p className='  text-gray-600 text-sm px-2'>Mumbai ghatkopar west indra nagar golibar road</p>
    <FaLocationCrosshairs size={20} className='text-gray-500' />
    </div>  )
}

export default Location