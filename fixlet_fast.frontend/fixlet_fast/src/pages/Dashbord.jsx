import React from 'react'
import ac_repair from "../assets/button_image/ac_repair.webp"
import cleaning from "../assets/button_image/cleaning.webp"
import electresian from "../assets/button_image/electresian.webp"
import festival_decoration from "../assets/button_image/festival_decoration.webp"
import paint from "../assets/button_image/paint.webp"
import wallPanel from "../assets/button_image/wallPanel.jpeg"
import { FaStar } from "react-icons/fa6";
import Addvertice from '../component/Addvertice'
import AC_service_image from "../assets/book_image/AC_img.webp"
import sofa from "../assets/Add/pexels-martinpechy-1866149.jpg"
import decoration_img from "../assets/book_image/decoration_book_img.avif"
import bathRoom_img from "../assets/book_image/bathRoom_img.webp"
import { Link } from 'react-router'
import { LuIndianRupee } from "react-icons/lu";



function Dashbord() {
  return (
    <>
      <main className='mt-28 w-full px-32'>

        <div className=' flex justify-center w-full items-center justify-between'>

          <div className='flex  flex-col '>
          <h1  className='text-4xl w-96  text-start   text-gray-600 font-semibold'>
            Home service at your doorstep
          </h1>
          <div className='flex flex-col w-full  gap-5 mt-10 p-10 border-1 rounded  border-gray-600 shadow justify-center items-center'>
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
          <Addvertice/>
        </div>


        <div className='flex justify-between mt-20 '>


            <div className='flex flex-col h-48 rounded w-72 justify-end bg-cover' style={{ backgroundImage: `url(${decoration_img})` }}>
              <p className='px-5 text-2xl font-semibold text-white  my-auto'>Home & Lights Decoration</p>
              <Link><h1 className='w-full h-12 px-5 flex items-center bg-gray-600 text-xl font-semibold bg-opacity-35 text-white hover:bg-opacity-50 hover:bg-gray-600'>Book now</h1></Link>
            </div>

             <div className='flex flex-col h-48 rounded w-72 justify-end bg-cover' style={{ backgroundImage: `url(${AC_service_image})` }}>
              <Link><h1 className='w-full h-12 px-5 flex items-center bg-gray-600 text-xl font-semibold bg-opacity-35 text-white hover:bg-opacity-50 hover:bg-gray-600'>Book now</h1></Link>
            </div>

            <div className='flex flex-col h-48 rounded w-72 justify-end bg-cover' style={{ backgroundImage: `url(${bathRoom_img})` }}>
              <Link><h1 className='w-full h-12 px-5 flex items-center bg-gray-600 text-xl font-semibold bg-opacity-35 text-white hover:bg-opacity-50 hover:bg-gray-600'>Book now</h1></Link>
            </div>

        </div>


        <div className='flex mt-20 py-10 px-10  bg-amber-100'>
          <div className='w-full flex flex-col justify-between ' >
            <div className=''>
            <span className='text-xl px-5 w-max rounded py-2  text-white bg-green-700 '>Decorate your Home</span>
            <p className='text-4xl font-semibold text-gray-600  py-5'>Transform your living space with our premium selection of sofas and home essentials, designed for comfort and style</p>
            </div>
            <Link > <span className=' bg-black py-2 font-bold  text-white  rounded px-10'>By now</span></Link>
          </div>
          <div className=' w-full flex  justify-end'><img  className='rounded w-96 ' src={sofa}></img></div>
        </div>



        <h1 className='mt-20 text-2xl font-semibold mb-5'>Quick Home Installation</h1>

        <div className='flex justify-between  '>
        <div className='w-72'>
            <Link>
            <div className='flex flex-col h-48 rounded w-72 justify-end bg-cover' style={{ backgroundImage: `url(${AC_service_image})` }}>
            </div>
            <div>
            <p className=' text-lg font-semibold text-gray-600  my-auto'>Save electricity bill </p>
            <span className='flex items-center text-gray-600'><FaStar /> 4.8 (4.5M)</span>
            <span className='flex items-center'>
            <LuIndianRupee/>150
            </span>
            </div>
            </Link>
            </div>

            

            <div className='w-72'>
            <Link>
            <div className='flex flex-col h-48 rounded w-72 justify-end bg-cover' style={{ backgroundImage: `url(${AC_service_image})` }}>
            </div>
            <div>
            <p className=' text-lg font-semibold text-gray-600  my-auto'>Save electricity bill </p>
            <span className='flex items-center text-gray-600'><FaStar /> 4.8 (4.5M)</span>
            <span className='flex items-center'>
            <LuIndianRupee/>150
            </span>
            </div>
            </Link>
            </div>

            <div className='w-72'>
            <Link>
            <div className='flex flex-col h-48 rounded w-72 justify-end bg-cover' style={{ backgroundImage: `url(${AC_service_image})` }}>
            </div>
            <div>
            <p className=' text-lg font-semibold text-gray-600  my-auto'>Save electricity bill </p>
            <span className='flex items-center text-gray-600'><FaStar /> 4.8 (4.5M)</span>
            <span className='flex items-center'>
            <LuIndianRupee/>150
            </span>
            </div>
            </Link>
            </div>

        </div>


        <div className='flex mt-20 py-10 px-10  bg-amber-100'>
          <div className='w-full flex flex-col justify-between ' >
            <div className=''>
            <span className='text-xl px-5 w-max rounded py-2  text-white bg-green-700 '>Decorate your Home</span>
            <p className='text-4xl font-semibold text-gray-600  py-5'>Transform your living space with our premium selection of sofas and home essentials, designed for comfort and style</p>
            </div>
            <Link > <span className=' bg-black py-2 font-bold  text-white  rounded px-10'>By now</span></Link>
          </div>
          <div className=' w-full flex  justify-end'><img  className='rounded w-96 ' src={sofa}></img></div>
        </div>

      </main>
    </>
  )
}

export default Dashbord