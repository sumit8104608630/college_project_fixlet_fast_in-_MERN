import React, { useState,useEffect } from 'react'
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
import { IoCloseOutline } from "react-icons/io5";
import electricity_image from "../assets/togglebutton/electrician/electricity.webp"
import { Link } from 'react-router'
import { LuIndianRupee } from "react-icons/lu";
import plumber from "../assets/togglebutton/electrician/plumber.webp"
import carpenter from "../assets/togglebutton/electrician/carpenter.webp"
import Loader from "../component/Loader"
import bathroom from "../assets/togglebutton/clean&pestControll/1728900638112-d33369.webp"
import home from "../assets/togglebutton/clean&pestControll/home.webp"
import sofa_image from"../assets/togglebutton/clean&pestControll/sofa.png";
import pest from "../assets/togglebutton/clean&pestControll/pest.webp"
import bed from "../assets/togglebutton/clean&pestControll/bed.jpeg"
import chimney from "../assets/togglebutton/AC&Apliance/chimaney.webp"
import gas from "../assets/togglebutton/AC&Apliance/Gas.webp"
import refrigerator from "../assets/togglebutton/AC&Apliance/Refirgerator.png"
import mixer from "../assets/togglebutton/AC&Apliance/mixer.webp"
import washinMashin from "../assets/togglebutton/AC&Apliance/washing_mashin.jpeg"
import { useSelector } from 'react-redux'

function Dashbord() {
  const [link3Toggle,setlink3Toggle]=useState(false);
  const [link2Toggle,setlink2Toggle]=useState(false);
  const [link1Toggle,setlink1Toggle]=useState(false);
  const {isLoading,userInfo,isLogin}=useSelector((state)=>state.user);
  
  const city=userInfo?.city

  useEffect(() => {

    if (link3Toggle||link2Toggle||link1Toggle) {
      document.body.style.overflow="hidden"
      
    } else {
      // Restore normal scroll behavior
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [link3Toggle,link2Toggle,link1Toggle]);






  return (
    <>{isLoading?<Loader/>:


      <main  className={ ` pt-28  w-full px-32 ${ link3Toggle&&"  overflow-hidden "}` }>

{link3Toggle&&
<div className='fixed z-20 justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen '>
  

  
      <div className=' border-1 rounded   backdrop-blur-lg bg-opacity-10 '>
      <button onClick={()=>setlink3Toggle(false)} className='bg-white rounded-full p-1 mb-2 absolute right-0  -top-10 translate-y-0'><IoCloseOutline size={20}/></button>

      <div className='rounded border-gray-600  shadow p-5 bg-white'>
              <h1 className='mb-5 font-semibold text-lg'>Electrician, Plumber & Carpenter</h1>
              <div className='flex  gap-5 mb-5  mt-3'>
              <div className='flex gap-5 '>
              <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=electrician`} className="relative w-full flex flex-col text-center  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={electricity_image} alt="Cleaning" />
              </div>
                <span className='text-sm'>Electrician</span>
            </Link>
            </div>

            <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=plumber`} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={plumber} alt="Electrician" />
              </div>
                <span className='text-sm'>Plumber</span>
            </Link>
            </div>

            <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=carpenter`} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={carpenter} alt="Festival Decoration" />
              </div>
              <span className='text-sm'>Carpenter</span>
            </Link>
          </div>
            </div>
            </div>
            </div>
              </div></div>

}




{link1Toggle&&
<div className='fixed z-20 justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen '>
  
  
      <div className=' border-1 rounded   backdrop-blur-lg bg-opacity-10 '>
      <button onClick={()=>setlink1Toggle(false)} className='bg-white rounded-full p-1 mb-2 absolute right-0  -top-10 translate-y-0'><IoCloseOutline size={20}/></button>

      <div className='rounded border-gray-600  shadow p-5 bg-white'>
              <h1 className='mb-5 font-semibold text-lg'>AC & Appliance repair</h1>
              <div className='flex flex-col  gap-5 mb-5  mt-3'>
              <div className='flex gap-5 '>

              <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=acservice`} className="relative w-full flex flex-col text-center  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={ac_repair} alt="Cleaning" />
              </div>
                <span className='text-sm'>AC repair & Service</span>
            </Link>
            </div>

              <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=chimney`} className="relative w-full flex flex-col text-center  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={chimney} alt="Cleaning" />
              </div>
                <span className='text-sm'>Chimney Repair & Service</span>
            </Link>
            </div>

            <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=gasstoverepair`} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={gas} alt="Electrician" />
              </div>
                <span className='text-sm'>Gas Repair & service</span>
            </Link>
            </div>
         
            </div>





            <div className='flex gap-5 '>
            <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=refrigerator`} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={refrigerator} alt="Festival Decoration" />
              </div>
              <span className='text-sm'>Refrigerator Repair </span>
            </Link>
          </div>

            <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=mixergrinder`} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={mixer} alt="Electrician" />
              </div>
                <span className='text-sm'>Mixer & Grinder Repair</span>
            </Link>
            </div>

            <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=washingmachine`} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={washinMashin} alt="Festival Decoration" />
              </div>
              <span className='text-sm'>Washin Machine Repair </span>
            </Link>
          </div>
            </div>
            </div>
            </div>
              </div></div>

}



{link2Toggle?
  <div className='fixed z-20 bg-opacity-50 left-0 top-0 justify-center items-center bg-black flex w-full h-screen '>
  <div className=' border-1 rounded    backdrop-blur-lg bg-opacity-10     '>
      <button onClick={()=>setlink2Toggle(false)} className='bg-white rounded-full p-1 mb-2 absolute right-0  -top-10 translate-y-0'><IoCloseOutline size={20}/></button>

              
              <div className='rounded border-gray-600  shadow p-5 bg-white'>
              <h1 className='mb-5 font-semibold text-lg'>Cleaning & Pest pest control</h1>
              <span>Cleaning</span>
              <div className='flex  gap-5 mb-5  mt-3'>
              <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=bathroom_kitchen`} className="relative w-full flex flex-col text-center  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={bathroom} alt="Cleaning" />
              </div>
                <span className='text-sm'>Bathroom & Kitchen Cleaning</span>
            </Link>
            </div>

            <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=fullhome`} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={home} alt="Electrician" />
              </div>
                <span className='text-sm'>Full Home Cleaning</span>
            </Link>
            </div>

            <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=sofaCleaning`} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={sofa_image} alt="Festival Decoration" />
              </div>
              <span className='text-sm'>Sofa Cleaning</span>
            </Link>
          </div>
            </div>

            <span>Pest Control</span>
              <div className='flex  gap-5  mt-3'>
              <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=pestcontrol`}  className="relative w-full flex flex-col text-center  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={pest} alt="Cleaning" />
              </div>
                <span className='text-sm'>Insect Pest Control</span>
            </Link>
            </div>



            <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=bedbugcontrol`} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={bed} alt="Festival Decoration" />
              </div>
              <span className='text-sm'>Bed Bugs Control</span>
            </Link>
          </div>
            </div>
            </div>
              </div></div>:""

}








        <div className=' flex w-full items-center justify-between'>

          <div className='flex  flex-col '>
          <h1  className='text-4xl w-96  text-start   text-gray-600 font-semibold'>
            Home service at your doorstep
          </h1>
          <div className='flex flex-col w-full  gap-5 mt-10 px-10 pt-5 pb-10 border-1 rounded  border-gray-600 shadow justify-center items-center'>
          <h1 className='text-start w-full text-lg text-gray-600'>What are you looking for?</h1>
            <div className='flex gap-5'>
             <div className='w-28 '>
            <button onClick={()=>setlink2Toggle(true)} className="relative  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={cleaning} alt="AC Repair" />
               </div>
                <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                <span className='text-sm'>Cleaning & pest control</span>
            </button>
            </div>

            <div className='w-28'>
            <button onClick={()=>setlink1Toggle(true)} className="relative hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={ac_repair} alt="Cleaning" />
              </div>
                <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                <span className='text-sm'>AC & Appliance Repair</span>
            </button>
            </div>

            <div  className='w-28'>
            <button onClick={()=>!link2Toggle?setlink3Toggle(true):setlink3Toggle(false )} className="relative  hover:text-gray-600 group">
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
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=lightdecoration`} className="relative  flex flex-col text-center hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={festival_decoration} alt="Festival Decoration" />
              </div>
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0  bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              <span className='text-sm'>Festival Lights decoration</span>
            </Link>
          </div>


          <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=wallpanelinstallation`} className="relative w-full flex flex-col text-center    hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={wallPanel} alt="Wall Panel" />
              </div>
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              <span className='text-sm'>Wall Panel installation</span>
            </Link>
            </div>

            <div className='w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city}&categories=wallpainting`} className="relative w-full flex flex-col text-center hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-14" src={paint} alt="Paint" />
              </div>
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              <span className='text-sm'>Painting & Water proofing</span>
            </Link>
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
}
    </>
  )
}

export default Dashbord