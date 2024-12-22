import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';

function Location(props) {
  const [toggle,setToggle]=useState(false);
  const [location,setCompleteLocation]=useState("")
  const [longitude,setLongitude]=useState(null);
  const [latitude,setLatitude]=useState(null);

  const handleToggle=()=>{
    setToggle(true)
  }

  useEffect(()=>{

     axios(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`).then((data)=>{
      setCompleteLocation(data);
     })

  },[longitude,latitude]);
  console.log(location)
  
  const handleCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
    },()=>{
      alert("Unable to get your location please allow the Location")
    })
  }
  console.log(longitude,latitude);


  return (
    <>
    <div>
        <button onClick={handleToggle}  className=' bg-white flex items-center px-2 py-2 rounded-lg'>
      <FaLocationDot className='text-gray-500' size={20} />
    <p className='  text-gray-600 text-sm px-2'>Mumbai ghatkopar west indra nagar golibar road</p>
    <FaLocationCrosshairs size={20} className='text-gray-500' />
    </button>
  </div>
  {toggle&&

  <div className='fixed z-20 justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen '>
    <div className='relative h-max'>
          <button onClick={()=>setToggle(false)} className='bg-white rounded-full p-1 mb-2 absolute   -top-28 -right-96 translate-y-0'><IoCloseOutline size={20}/></button>
    </div>
         <div className=' bg-white flex flex-col  p-5 rounded'>
             <div className=' '>
                 <button onClick={handleCurrentLocation} className='w-full  flex gap-2 items-center font-semibold text-gray-600 hover:text-orange-500'>  
                    <FaLocationCrosshairs size={20} className='text-gray-500 ' />
                    Current Location
                 </button>
             </div>
             <hr className='w-full h-2 rounded bg-gray-400 my-5'></hr>
             <div className='flex items-center'>
             <FaLocationDot className='text-gray-500' size={20} />
             <p className='text-gray-600 text-sm px-2'>Mumbai ghatkopar west indra nagar golibar road</p>
             </div>  
             </div>
      </div>
}
</>
    
  )
}

export default Location