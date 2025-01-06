import React from 'react'
import Ac_repair from "../assets/staticPhotp/Ac_repair.webp"
import cleaning_img from "../assets/staticPhotp/cleaning.webp"
import carpenter_img from "../assets/staticPhotp/carpenter_img.webp"
import plumber_img from "../assets/staticPhotp/plumber_img.webp"



function Addvertice() {
  return (
    <div className='flex gap-3 rounded-lg'>
    <div className='flex flex-col gap-3'>
      <div className='w-72 h-56'> 
        <img className='w-full rounded-tl-lg h-full object-cover' src={Ac_repair} alt="AC Repair" />    
      </div>
      <div className='w-72 h-56'> 
        <img className='w-full h-full rounded-bl-lg object-cover' src={cleaning_img} alt="Cleaning" />    
      </div>
    </div>
    <div className='flex flex-col gap-3'>
      <div className='w-72 h-56'> 
        <img className='w-full h-full rounded-tr-lg object-cover' src={carpenter_img} alt="Carpenter" />    
      </div>
      <div className='w-72 h-56'> 
        <img className='w-full h-full rounded-br-lg object-cover' src={plumber_img} alt="Plumber" />    
      </div>
    </div>
  </div> )
}

export default Addvertice   