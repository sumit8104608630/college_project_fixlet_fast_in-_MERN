import React from 'react'
import ac_repair from "../assets/button_image/ac_repair.webp"
import cleaning from "../assets/button_image/cleaning.webp"
import electresian from "../assets/button_image/electresian.webp"
import festival_decoration from "../assets/button_image/festival_decoration.webp"
import paint from "../assets/button_image/paint.webp"
import wallPanel from "../assets/button_image/wallPanel.jpeg"

import Ac_repair from "../assets/staticPhotp/Ac_repair.webp"
import cleaning_img from "../assets/staticPhotp/cleaning.webp"
import carpenter_img from "../assets/staticPhotp/carpenter_img.webp"
import plumber_img from "../assets/staticPhotp/plumber_img.webp"



function Dashbord() {
  return (
    <>
      <main className='mt-28 w-full'>

        <div className='px-32 flex  w-full items-center justify-between'>

          <div className='flex justify-center flex-col items-center'>
          <h1 className='text-4xl  text-start   text-gray-600 font-semibold'>
            Home service at your doorstep
          </h1>
          <div className='flex flex-col  gap-5 mt-10 p-10 border-1 rounded w-max border-gray-600 shadow justify-center items-center'>
            <div className='flex gap-5'>
             <div className='w-28 '>
            <button className="relative  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={ac_repair} alt="AC Repair" />
               </div>
                <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                <span className='text-sm'>Cleaning & pest control</span>
            </button>
            </div>

            <div className='w-28'>
            <button className="relative hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={cleaning} alt="Cleaning" />
              </div>
                <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                <span className='text-sm'>AC & Appliance Repair</span>
            </button>
            </div>

            <div className='w-28'>
            <button className="relative  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={electresian} alt="Electrician" />
              </div>
                <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                <span className='text-sm'>Electrician,Plumber & Carpenter</span>
            </button>
            </div>
  
              </div>
            <div className='flex gap-5'>
            <div className='w-28'>
            <button className="relative  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={festival_decoration} alt="Festival Decoration" />
              </div>
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0  bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              <span className='text-sm'>Festival Lights decoration</span>
            </button>
          </div>


          <div className='w-28'>
            <button className="relative   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={wallPanel} alt="Wall Panel" />
              </div>
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              <span className='text-sm'>Wall Panel</span>
            </button>
            </div>

            <div className='w-28'>
            <button className="relative  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={paint} alt="Paint" />
              </div>
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              <span className='text-sm'>Painting & Water proofing</span>
            </button>
            </div>
  
              </div>

          </div>
          <div className='flex justify-between w-full mt-5 px-5'>
                <div className='flex flex-col items-center'><span className='text-xl font-semibold'>4.8</span><h1 className='text-gray-600 text-sm'>Service Rating</h1></div> 
                <div className='flex flex-col items-center'><span className='text-xl font-semibold'>12 M</span><h1 className='text-gray-600 text-sm'>Customer Globally</h1></div> 
              </div>
        </div>


        <div className='flex gap-3 rounded'>
  <div className='flex flex-col gap-3'>
    <div className='w-72 h-56'> 
      <img className='w-full rounded h-full object-cover' src={Ac_repair} alt="AC Repair" />    
    </div>
    <div className='w-72 h-56'> 
      <img className='w-full h-full rounded object-cover' src={cleaning_img} alt="Cleaning" />    
    </div>
  </div>
  <div className='flex flex-col gap-3'>
    <div className='w-72 h-56'> 
      <img className='w-full h-full rounded object-cover' src={carpenter_img} alt="Carpenter" />    
    </div>
    <div className='w-72 h-56'> 
      <img className='w-full h-full rounded object-cover' src={plumber_img} alt="Plumber" />    
    </div>
  </div>
</div>



        </div>

        <div>

        </div>

      </main>
    </>
  )
}

export default Dashbord