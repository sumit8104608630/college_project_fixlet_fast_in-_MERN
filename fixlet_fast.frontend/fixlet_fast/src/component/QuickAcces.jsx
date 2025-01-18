import React,{useState} from 'react'
import { Link } from 'react-router'
import decoration_img from "../assets/book_image/decoration_book_img.avif"
import bathRoom_img from "../assets/book_image/bathRoom_img.webp"
import AC_service_image from "../assets/book_image/AC_img.webp"
import { useSelector } from 'react-redux'
import wallPanel from "../assets/book_image/wallPanel.webp"
import home_apliance from "../assets/book_image/home_apliance.jpg"
import { IoCloseOutline } from "react-icons/io5";
import electricity_image from "../assets/togglebutton/electrician/electricity.webp"
import plumber from "../assets/togglebutton/electrician/plumber.webp"
import carpenter from "../assets/togglebutton/electrician/carpenter.webp"
import store from "../assets/book_image/store.jpg"

function QuickAcces() {
    const {isLoading,userInfo,isLogin}=useSelector((state)=>state.user);
    const city=userInfo?.city
      const [linkToggle,setLinkToggle]=useState(false);
    

  return (
<>
{linkToggle&&
    
    <div className='fixed z-20  justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen '>
      
    
      
          <div className=' border-1 rounded   backdrop-blur-lg bg-opacity-10 '>
          <button onClick={()=>setLinkToggle(false)} className='bg-white rounded-full p-1 mb-2 absolute right-0  -top-10 translate-y-0'><IoCloseOutline size={20}/></button>
    
          <div className='rounded border-gray-600  shadow p-5 bg-white'>
                  <h1 className='mb-5 font-semibold text-lg'>Electrician, Plumber & Carpenter</h1>
                  <div className='flex  gap-5 mb-5  mt-3'>
                  <div className='flex gap-5 '>
                  <div className='w-28'>
                <Link  to={{pathname:`/serviceDetailPage/service_data_get`,search:`?city=${city||"mumbai"}&categories=electrician`}} state={ {headLine: 'Electrician'} } className="relative w-full flex flex-col text-center  hover:text-gray-600 group">
                  <div className="bg-gray-100 px-8 rounded py-3">
                    <img className="w-14" src={electricity_image} alt="Cleaning" />
                  </div>
                    <span className='text-sm'>Electrician</span>
                </Link>
                </div>
    
                <div className='w-28'>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=plumber`}   state={{ headLine: 'Plumber' }} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
                  <div className="bg-gray-100 px-8 rounded py-3">
                    <img className="w-14" src={plumber} alt="Plumber" />
                  </div>
                    <span className='text-sm'>Plumber</span>
                </Link>
                </div>
    
                <div className='w-28'>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=carpenter`} state={{ headLine: 'Carpenter' }} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
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





    <div className='flex w-max gap-11  overflow-auto justify-between  '>

    <div className=" rounded z-0 overflow-hidden ">
<Link className='group h-40  w-80 ' to={`/serviceDetailPage/service_data_get?city=${city || "mumbai"}&categories=lightdecoration`}  state={{ headLine: 'AC repair & Service' }} >
<div className="relative flex flex-col h-40 rounded w-80 justify-end overflow-hidden">
<div className="absolute z-10 inset-0   bg-cover  transform transition-transform duration-300 scale-100 group-hover:scale-110" style={{ backgroundImage: `url(${decoration_img})` }}>
</div>
<div className='relative z-10  flex items-center bg-opacity-60 bg-black w-40 h-full font-semibold text-white  my-auto'><p className='px-2 text-base'>Create a Magical Ambiance with Perfect Light Decorations</p></div>

</div></Link>
</div>

<div className=" rounded  overflow-hidden z-0 ">
<Link className='group h-40  w-80 ' to={`/serviceDetailPage/service_data_get?city=${city || "mumbai"}&categories=acservice`}  state={{ headLine: 'AC repair & Service' }} >
<div className="relative flex flex-col h-40 rounded w-80 justify-end overflow-hidden">
<div className="absolute z-10 inset-0   bg-cover  transform transition-transform duration-300 scale-100 group-hover:scale-110" style={{ backgroundImage: `url(${AC_service_image})` }}>
</div>
<div className='relative z-10  flex items-center bg-opacity-60 bg-black w-40 h-full font-semibold text-white  my-auto'><p className='px-2 text-base'>Save Energy, Save Money  Book Your Service Now!</p></div>

</div></Link>
</div>


<div className=" rounded  overflow-hidden z-0 ">
<Link className='group h-40  w-80 ' to={`/serviceDetailPage/service_data_get?city=${city || "mumbai"}&categories=bathroom_kitchen`}  state={{ headLine: 'AC repair & Service' }} >
<div className="relative flex flex-col h-40 rounded w-80 justify-end overflow-hidden">
<div className="absolute z-10 inset-0   bg-cover  transform transition-transform duration-300 scale-100 group-hover:scale-110" style={{ backgroundImage: `url(${bathRoom_img})` }}>
</div>
<div className='relative z-10  flex items-center bg-opacity-60 bg-black w-40 h-full font-semibold text-white  my-auto'><p className='px-2 text-base'>Save Energy, Save Money  Book Your Service Now!</p></div>

</div></Link>
</div>





    <div className=" rounded z-0 overflow-hidden ">
<Link className='group h-40  w-80 ' to={`/serviceDetailPage/service_data_get?city=${city || "mumbai"}&categories=wallpanel`}  state={{ headLine: 'AC repair & Service' }} >
<div className="relative flex flex-col h-40 rounded w-80 justify-end overflow-hidden">
<div className="absolute z-10 inset-0   bg-cover  transform transition-transform duration-300 scale-100 group-hover:scale-110" style={{ backgroundImage: `url(${wallPanel})` }}>
</div>
<div className='relative z-10  flex items-center bg-opacity-60 bg-black w-40 h-full font-semibold text-white  my-auto'><p className='px-2 text-base'>Upgrade Your Interior with Premium Wall Panels</p></div>

</div></Link>
</div>

<div className=" rounded  overflow-hidden z-0 ">
<button className='group h-40  w-80 ' onClick={()=>setLinkToggle(true)}>
<div className="relative flex flex-col h-40 rounded w-80 justify-end overflow-hidden">
<div className="absolute z-10 inset-0   bg-cover  transform transition-transform duration-300 scale-100 group-hover:scale-110" style={{ backgroundImage: `url(${home_apliance})` }}>
</div>
<div className='relative z-10  flex items-center bg-opacity-60 bg-black w-40 h-full font-semibold text-white  my-auto'><p className='px-2 text-base text-start'>Fast, Efficient, & Affordable Home Appliance Repair Services</p></div>

</div></button>
</div>


<div className=" rounded  overflow-hidden z-0 ">
<Link className='group h-40  w-80 ' to={`/serviceDetailPage/service_data_get?city=${city || "mumbai"}&categories=bathroom_kitchen`}  state={{ headLine: 'AC repair & Service' }} >
<div className="relative flex flex-col h-40 rounded w-80 justify-end overflow-hidden">
<div className="absolute z-10 inset-0   bg-cover  transform transition-transform duration-300 scale-100 group-hover:scale-110" style={{ backgroundImage: `url(${store})` }}>
</div>
<div className='relative z-10  flex items-center bg-opacity-60 bg-black w-40 h-full font-semibold text-white  my-auto'><p className='px-2 text-base'> Upgrade Your Living Space with Our Exclusive Furniture Collection</p></div>

</div></Link>
</div>

    </div>  </>)
}

export default QuickAcces