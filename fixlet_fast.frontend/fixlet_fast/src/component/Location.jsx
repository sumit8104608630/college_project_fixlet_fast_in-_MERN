import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
//import axios from 'axios';
import locationImage from "../assets/staticPhotp/locate.svg"
import { useSelector,useDispatch } from 'react-redux';
import { fetchUser } from '../app/Actions/user_action.js';
import { currentContext } from '../component/Context.jsx';
import { useContext } from 'react';
function Location(props) {
  const {isLogin,userInfo,isLoading}=useSelector((state)=>state.user);
  const [toggle,setToggle]=useState(false);
  const [toggle2,setToggle2]=useState(false);
  const [location,setCompleteLocation]=useState("")
  const dispatch = useDispatch();
  const [not_in_area,setNotInArea]=useState(false);
  const [longitude,setLongitude]=useState(null);
  const [latitude,setLatitude]=useState(null);
  const Show=useContext(currentContext)

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleToggle=()=>{
    setToggle(true)
  }



  //console.log(location)
  
  const handleCurrentLocation=async()=>{
    navigator.geolocation.getCurrentPosition(async(position)=>{
      const obj={
        longitude:position.coords.longitude,
      latitude:position.coords.latitude
      }
      const fetchData=await fetch("http://localhost:8000/user/storeAddress",{
        method:"POST",
        body:JSON.stringify(obj)
        ,
        headers:{
          "Content-Type":"application/json",
        },
        credentials:'include'
      })
      const data=await fetchData.json()
      setCompleteLocation(data.data)
      if(data.data){
        setNotInArea(false)
        setToggle(false)
      }
    },()=>{
      alert("Unable to get your location please allow the Location")
    })
  }



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
// API call to store the address
const data= await fetch("http://localhost:8000/user/store_custom_address",{
  method:"POST",
  body:JSON.stringify(formData),
  headers:{
    "Content-Type":"application/json",
  },
  credentials:"include"
})
    
const response=await data.json()
console.log(response)
setCompleteLocation(response.data)
if(response.data){
  setToggle2(false)
  setNotInArea(false)
}
else{
  setToggle2(false);
  setNotInArea(!response.success)
  setToggle(true);

}
  };



  useEffect(()=>{
    if(location){
      console.log(location);
      dispatch(fetchUser());
    }
    return()=>{
      console.log("Component Updated");
    }
  },[location]);





  return (
    <>
    {!Show.showAddress&&
      <div>
  <button onClick={handleToggle} className='bg-white flex items-center px-2 py-2 rounded-lg'>
    <FaLocationDot className='text-gray-500' size={20} />
    {/* Replace <p> with <span> to avoid invalid nesting */}
    <span className='text-gray-600 text-sm w-96 text-ellipsis overflow-hidden whitespace-nowrap px-2'>
      {location || userInfo?.location}
    </span>
    <FaLocationCrosshairs size={20} className='text-gray-500' />
  </button>
</div>

}
{Show.showAddress&&
  <div className='w-full'>
  <div className='flex w-full items-center justify-between'>
    <div className='flex items-center gap-2'>
      <FaLocationDot className='text-gray-600' size={25} />
      <span className='text-gray-600 text-sm w-96 text-ellipsis px-2'>
        {location ? location : userInfo?.location}
      </span>
    </div>
    <div>
      <button
        onClick={handleToggle}
        className='px-5 py-2 bg-gray-100 rounded-lg border-2 border-gray-400 hover:bg-gray-200 font-semibold'>
        Edit
      </button>
    </div>
  </div>
</div>


}
  {toggle&&
<>

  <div className='fixed z-20 justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen  '>
    <div className='relative h-max'>
    <button onClick={()=>{setToggle(false)
    }
    } className='bg-white rounded-full p-1 mb-2 absolute   -top-10 right-0 translate-y-0'><IoCloseOutline size={20}/></button>

         <div className=' bg-white flex flex-col w-96  p-5 rounded'>
             <div className=' '>
                 <button onClick={handleCurrentLocation} className='w-full  flex gap-2 items-center font-semibold text-orange-500 hover:text-orange-500'>  
                    <FaLocationCrosshairs size={20} className='text-orange-500 ' />
                    Current Location
                 </button>
             </div>


             <div className=' '>
                 <button onClick={()=>setToggle2(true)} className='w-full text-center bg-orange-500  gap-2  font-semibold text-white py-1 rounded mt-5 '>  
                    Set Your Location
                 </button>
             </div>


             <hr className='w-full h-0.5  bg-gray-400 my-3'></hr>
             <div className='flex items-center'>{not_in_area?
                          <div className='flex flex-col gap-5 mt-5 items-center justify-center w-full'>
                          <div className=''><img className='w-72' src={locationImage}></img></div>
                          <div className="text-center text-gray-700 font-medium p-4">
                                <span className='text-lg'>We're not there yet, but we'll arrive soon. Thanks for your patience!</span>
                          </div>
                        </div>:
              <>
             <FaLocationDot className='text-gray-500' size={25} />
             <p className='text-gray-600 text-sm w-full px-2'>{location?location:userInfo.location}</p></>

              }
             </div>  
             </div>
             </div>

      </div>




{
  toggle2&&
<div className='absolute overflow-auto z-20 py-10 justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen  '>
<div className='relative h-full '>
<button onClick={()=>setToggle2(false)} className='bg-white rounded-full p-1 mb-2 absolute   -top-0 right-0 translate-y-0'><IoCloseOutline size={20}/></button>

      <div className="max-w-lg mx-auto mt-10 w-full bg-white p-8 rounded-lg shadow-lg">
<h2 className="text-2xl font-bold mb-6 text-center text-gray-600">
  Address Form
</h2>
<form onSubmit={handleSubmit}>

<div className='flex gap-2'>
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-400 mb-1">
      City
    </label>
    <input
      type="text"
      name="city"
      value={formData.city}
      onChange={handleChange}
      placeholder="Enter your city"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gorange-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-400 mb-1">
      State
    </label>
    <input
      type="text"
      name="state"
      value={formData.state}
      onChange={handleChange}
      placeholder="Enter your state"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gorange-500"
    />
  </div>
  </div>


  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-400 mb-1">
      Pin Code
    </label>
    <input
      type="text"
      name="pincode"
      value={formData.pincode}
      onChange={handleChange}
      placeholder="Enter your pin code"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gorange-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-400 mb-1">
      Country
    </label>
    <input
      type="text"
      name="country"
      value={formData.country}
      onChange={handleChange}
      placeholder="Enter your country"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gorange-500"
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-400 mb-1">
      Address
    </label>
    <textarea
      name="address"
      value={formData.address}
      onChange={handleChange}
      placeholder="Enter your address like street, Road etc.."
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gorange-500"
    ></textarea>
  </div>

  <button
  
    type="submit"
    className="w-full border-2 border-orange-500  hover:bg-orange-500 hover:text-white py-2 rounded-lg hover:bg-gorange-600 focus:outline-none text-gray-600 font-semibold focus:ring-2 focus:ring-gorange-500"
  >
    Submit
  </button>
</form>
</div>
</div>
</div>



}


</>
      
}
</>
    
  )
}

export default Location