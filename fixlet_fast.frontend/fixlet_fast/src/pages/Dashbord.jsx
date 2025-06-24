import  { useState,useEffect } from 'react'
import ac_repair from "../assets/button_image/ac_repair.webp"
import cleaning from "../assets/button_image/cleaning.webp"
import electresian from "../assets/button_image/electresian.webp"
import festival_decoration from "../assets/button_image/festival_decoration.webp"
import paint from "../assets/button_image/paint.webp"
import wallPanel from "../assets/button_image/wallPanel.jpeg"
import Addvertice from '../component/Addvertice'
import sofa from "../assets/Add/pexels-martinpechy-1866149.jpg"
import { IoCloseOutline, IoStorefront } from "react-icons/io5";
import electricity_image from "../assets/togglebutton/electrician/electricity.webp"
import { data, Link, NavLink, useNavigate } from 'react-router'
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
import { useSelector ,useDispatch} from 'react-redux'
import {fetchCart} from "../app/Actions/cart_action.js"
import QuickAccess from '../component/QuickAcces.jsx'
import { IoIosArrowDown, IoIosArrowDropleft, IoMdHome } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { useRef } from 'react'
import { useContext } from 'react'
import { currentContext } from '../component/Context.jsx';
import axios from 'axios'
import SearchBar from '../component/Search.jsx'
import { AiFillLayout } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { CiShoppingCart } from 'react-icons/ci'
import ProfileMobileMenu from '../component/ProfileMobileMenu.jsx'
import Location from '../component/Location.jsx'
const apiUrl=import.meta.env.VITE_BACKEND_API_URL


function Dashbord() {
  const navigate=useNavigate();
  const [link3Toggle,setlink3Toggle]=useState(false);
  const [link2Toggle,setlink2Toggle]=useState(false);
  const [link1Toggle,setlink1Toggle]=useState(false);
  const {isLoading,userInfo}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const scrollContainRef=useRef(null);
  const city=userInfo?.city
  const [cartCount, setCartCount] = useState(); // Example cart count
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const Context=useContext(currentContext);
    const {cartLoading,}=useSelector((state)=>state.cart);
    const [user_globally,setUser_globally]=useState(0)
  const {cartItems}=useSelector((state)=>state.cart);
  const [mobileAddressToggle,setMobileAddressToggle]=useState(null)
    useEffect(()=>{
      const singleArray=cartItems?.map((item=>item.productDetails)).flat()
      setCartCount(singleArray.length)
    },[cartItems])

    useEffect(()=>{
axios.get(`${apiUrl}/global/user_count`).then(response=>response.data).then(data=>{
  setUser_globally(data.data.totalUser)
})
      dispatch(fetchCart())
      return ()=>{
      }
    },[dispatch])

  useEffect(() => {
    window.scroll(0,0)
    if (link3Toggle||link2Toggle||link1Toggle) {
      document.body.style.overflow="hidden"
      
    } else {
      // Restore normal scroll behavior
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [link3Toggle,link2Toggle,link1Toggle,dispatch,]);



  const scrollLeft=()=>{
    scrollContainRef.current.scrollBy({
      left: -900,
      behavior: 'smooth',
    })
  }
  const scrollRight=()=>{
    scrollContainRef.current.scrollBy({
      left:900,
      behavior: 'smooth',
    })
  }

const toogleRender=()=>{
  Context.setPartValue("Drill & Hang")
  navigate(`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=carpenter`)
}

const handleAddressSet=()=>{
 setMobileAddressToggle(true)
}


  return (
    <>{isLoading||cartLoading?<Loader/>:
<>

   <ProfileMobileMenu
        isOpen={isProfileMenuOpen}
        onClose={setIsProfileMenuOpen}  
      />


      <div className='block md:hidden'>
      {!Context.showAddress&&
        <>
      <div className='flex h-max fixed w-full z-10 shadow-sm  bg-white  flex-col gap-3 px-2 py-2'>
        {userInfo?
        <div className='flex items-center justify-between px-2'>
        <div className='flex gap-4 justify-center items-center'>
               <div>
                    <button onClick={()=>setIsProfileMenuOpen(true)}>
                    <CgProfile  className='text-orange-500 ' size={30} />
                    </button>
                </div>
                <Location/>
      </div>
          <div>
          {Context.cartShow&&
      <div className="relative">
            <Link to="/cart">
            <p className='p-1 border-2 border-gray-800 rounded-full'><CiShoppingCart size={20} /></p>
            {cartCount >0 && (
                <span className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-xs font-semibold text-white bg-red-600 rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
       
      }
      
      
      
          </div>
        </div>:
                  <div className='flex w-full justify-end gap-5'>
      
                  <div>
                  <NavLink className={({isActive})=>`${isActive?"text-white border-orange-500 border-2 font-semibold text-xs md:text-lg bg-orange-500 px-5 py-1 rounded-full":"text-orange-500 text-xs md:text-lg font-semibold border-2 px-5 py-1 rounded-full border-orange-500"} hover:text-orange-500 hover:border-orange-500  hover:bg-white`} to={"/login"}>
                    Login
                  </NavLink>
                  </div>
      
                  <div>
                  <NavLink  className={({isActive})=>`${isActive?"text-white border-orange-500 border-2 font-semibold text-xs md:text-lg bg-orange-500 px-5 py-1 rounded-full":"text-orange-500 text-xs md:text-lg font-semibold border-2 px-5 py-1 rounded-full border-orange-500"} hover:text-orange-500 hover:border-orange-500  hover:bg-white`} to={"/register"}>
                    Sign Up
                  </NavLink>
                  </div>
                  
                </div>
      }
        <div className="sticky top-0  z-10 px-2 py-2">
        <SearchBar />
      </div>
      
      </div>

      </>
      }</div>




{/* this is main dash board */}
      

      <main  className={ `custom-dashBoardScroll  pt-20 xl:pt-28  pb-4  w-full xl:px-32 ${ link3Toggle&&"  overflow-hidden "}` }>
{link3Toggle&&
<div className='fixed z-20 px-5 justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen '>
  

  
      <div className=' border-1 rounded   backdrop-blur-lg bg-opacity-10 '>
      <button onClick={()=>setlink3Toggle(false)} className='bg-white rounded-full p-1 mb-2 absolute right-0  -top-10 translate-y-0'><IoCloseOutline size={20}/></button>

      <div className='rounded border-gray-600  shadow p-5 bg-white'>
              <h1 className='mb-5 font-semibold text-lg'>Electrician, Plumber & Carpenter</h1>
              <div className='flex  gap-5 mb-5  mt-3'>
              <div className='flex gap-5 '>
              <div className='md:w-24'>
            <Link  to={{pathname:`/serviceDetailPage/service_data_get`,search:`?city=${city||"mumbai"}&categories=electrician`}} state={ {headLine: 'Electrician'} } className="relative w-full flex flex-col text-center  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={electricity_image} alt="Cleaning" />
              </div>
                <span className='text-xs mt-1'>Electrician</span>
            </Link>
            </div>

            <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=plumber`}   state={{ headLine: 'Plumber' }} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={plumber} alt="Plumber" />
              </div>
                <span className='text-xs mt-1'>Plumber</span>
            </Link>
            </div>

            <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=carpenter`} state={{ headLine: 'Carpenter' }} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={carpenter} alt="Festival Decoration" />
              </div>
              <span className='text-xs mt-1'>Carpenter</span>
            </Link>
          </div>
            </div>
            </div>
            </div>
              </div></div>

}




{link1Toggle&&
<div className='fixed z-20 px-5 justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen '>
  
  
      <div className=' border-1 rounded   backdrop-blur-lg bg-opacity-10 '>
      <button onClick={()=>setlink1Toggle(false)} className='bg-white rounded-full p-1 mb-2 absolute right-0  -top-10 translate-y-0'><IoCloseOutline size={20}/></button>

      <div className='rounded border-gray-600  shadow p-5 bg-white'>
              <h1 className='mb-5 font-semibold text-lg'>AC & Appliance repair</h1>
              <div className='flex flex-col  gap-5 mb-5  mt-3'>
              <div className='flex gap-5 '>

              <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=acservice`} state={{ headLine: 'AC repair & Service' }} className="relative w-full flex flex-col text-center  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={ac_repair} alt="Cleaning" />
              </div>
                <span className='text-xs mt-1'>AC repair & Service</span>
            </Link>
            </div>

              <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=chimney`} state={{ headLine: 'Chimney Repair & Service' }} className="relative w-full flex flex-col text-center  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={chimney} alt="Cleaning" />
              </div>
                <span className='text-xs mt-1'>Chimney Repair & Service</span>
            </Link>
            </div>

            <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=gasstoverepair`} state={{ headLine: 'Gas Repair & service' }} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={gas} alt="Electrician" />
              </div>
                <span className='text-xs mt-1'>Gas Repair & service</span>
            </Link>
            </div>
         
            </div>





            <div className='flex gap-5 '>
            <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=refrigerator`} state={{ headLine: 'Refrigerator Repair ' }} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={refrigerator} alt="Festival Decoration" />
              </div>
              <span className='text-xs mt-1'>Refrigerator Repair </span>
            </Link>
          </div>

            <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=mixergrinder`} state={{ headLine: 'Mixer & Grinder Repair' }} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={mixer} alt="Electrician" />
              </div>
                <span className='text-xs mt-1'>Mixer & Grinder Repair</span>
            </Link>
            </div>

            <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=washingmachine`} state={{ headLine: 'Washin Machine Repair' }} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={washinMashin} alt="Festival Decoration" />
              </div>
              <span className='text-xs mt-1'>Washin Machine Repair </span>
            </Link>
          </div>
            </div>
            </div>
            </div>
              </div></div>

}



{link2Toggle?
  <div className='fixed z-20 px-5 bg-opacity-50 left-0 top-0 justify-center items-center bg-black flex w-full h-screen '>
  <div className=' border-1 rounded    backdrop-blur-lg bg-opacity-10 '>
      <button onClick={()=>setlink2Toggle(false)} className='bg-white rounded-full p-1 mb-2 absolute right-0  -top-10 translate-y-0'><IoCloseOutline size={20}/></button>

              
              <div className='rounded border-gray-600  shadow p-5 bg-white'>
              <h1 className='mb-5 font-semibold text-lg'>Cleaning & Pest pest control</h1>
              <span>Cleaning</span>
              <div className='flex  gap-5 mb-5  mt-3'>
              <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=bathroom_kitchen`} state={{ headLine: 'Bathroom & Kitchen Cleaning' }} className="relative w-full flex flex-col text-center  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className=" md:w-11 w-32 md:11 h-11" src={bathroom} alt="Cleaning" />
              </div>
                <span className='text-xs mt-1'>Bathroom & Kitchen Cleaning</span>
            </Link>
            </div>

            <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=fullhome`} state={{ headLine: 'Full Home Cleaning' }} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className=" md:md:w-11 w-32 h-11" src={home} alt="Electrician" />
              </div>
                <span className='text-xs mt-1'>Full Home Cleaning</span>
            </Link>
            </div>

            <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=sofaCleaning`} state={{ headLine: 'Sofa Cleaning' }} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className=" md:md:w-11 w-32 h-11" src={sofa_image} alt="Festival Decoration" />
              </div>
              <span className='text-xs mt-1'>Sofa Cleaning</span>
            </Link>
          </div>
            </div>

            <span>Pest Control</span>
              <div className='flex  gap-5  mt-3'>
              <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=pestcontrol`} state={{ headLine: 'Insect Pest Control' }} className="relative w-full flex flex-col text-center  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-11  h-11" src={pest} alt="Cleaning" />
              </div>
                <span className='text-xs mt-1'>Insect Pest Control</span>
            </Link>
            </div>



            <div className='md:w-24'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=bedbugcontrol`}state={{ headLine: 'Bed Bugs Control' }} className="relative w-full flex flex-col text-center   hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="w-11  h-11" src={bed} alt="Festival Decoration" />
              </div>
              <span className='text-xs mt-1'>Bed Bugs Control</span>
            </Link>
          </div>
            </div>
            </div>
              </div></div>:""

}








        <div className=' flex w-full items-center justify-between'>

          <div className='flex  flex-col '>
          <h1  className='text-4xl w-96  text-start  xl:block hidden  text-gray-600 font-semibold'>
            Home service at your doorstep
          </h1>
          <div className='flex flex-col w-full  gap-5 mt-10 px-5 md:px-10 pt-5 pb-10 border-1 xl:rounded   xl:border-gray-600 xl:shadow justify-center items-center'>
          <h1 className='text-start w-full  xl:block hidden text-lg text-gray-600'>What are you looking for?</h1>
            <div className='flex gap-5'>
             <div className='w-22 md:w-28 '>
            <button onClick={()=>setlink2Toggle(true)} className="relative  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={cleaning} alt="AC Repair" />
               </div>
                <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                <span className='text-xs mt-1'>Cleaning & pest control</span>
            </button>
            </div>

            <div className='w-22 md:w-28'>
            <button onClick={()=>setlink1Toggle(true)} className="relative hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={ac_repair} alt="Cleaning" />
              </div>
                <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                <span className='text-xs mt-1'>AC & Appliance Repair</span>
            </button>
            </div>

            <div  className='  w-22 md:w-28'>
            <button onClick={()=>!link2Toggle?setlink3Toggle(true):setlink3Toggle(false )} className="relative  hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={electresian} alt="Electrician" />
              </div>
                <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                <span className='text-xs mt-1'>Electrician,Plumber & Carpenter</span>
            </button>
            </div>

  
              </div>
            <div className='flex gap-5'>
            <div className='w-22 md:w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=lightdecoration`} state={{ headLine: 'Festival Lights decoration' }} className="relative  flex flex-col text-center hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={festival_decoration} alt="Festival Decoration" />
              </div>
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0  bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              <span className='text-xs mt-1'>Festival Lights decoration</span>
            </Link>
          </div>


          <div className='w-22 md:w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=wallpanel`} state={{ headLine: 'Wall Panel installation' }} className="relative w-full flex flex-col text-center    hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={wallPanel} alt="Wall Panel" />
              </div>
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              <span className='text-xs mt-1'>Wall Panel installation</span>
            </Link>
            </div>

            <div className='w-22 md:w-28'>
            <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=wallpainting`} state={{ headLine: 'Painting & Water proofing' }} className="relative w-full flex flex-col text-center hover:text-gray-600 group">
              <div className="bg-gray-100 px-8 rounded py-3">
                <img className="md:w-11 w-32 h-11" src={paint} alt="Paint" />
              </div>
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              <span className='text-xs mt-1'>Painting & Water proofing</span>
            </Link>
            </div>
  
              </div>

          </div>
          <div className='flex justify-between w-full  md:mt-5 px-5'>
                <div className='flex flex-col items-center'><span className='md:text-xl text-base  font-semibold'>4.8</span><h1 className='text-gray-600 text-sm'>Service Rating</h1></div> 
                <div className='flex flex-col items-center'><span className='md:text-xl text-base  font-semibold'>{user_globally}</span><h1 className='text-gray-600 text-sm'>Customer Globally</h1></div> 
              </div>
        </div>
          <Addvertice/>
        </div>

<div className='relative mt-20 gap-5 flex px-8 md:px-0  items-center'>
<button onClick={scrollLeft} className=' xl:block hidden h-max' ><IoIosArrowDropleft className='text-orange-500' size={50}/></button>
        <div ref={scrollContainRef} className='w-full custom-ResponsiveScrollbar overflow-auto custom-dashBoardScroll'>
          <QuickAccess/>
          </div>
<button onClick={scrollRight} className=' xl:block hidden h-max'><IoIosArrowDropright className='text-orange-500' size={50}/></button>
</div>

<div className='px-2 '>
        <div className='flex mt-14 md:py-10 py-5  md:px-10 px-5 w-full rounded bg-amber-100'>
          <div className=' flex flex-col justify-between ' >
            <div className=''>
            <span className='md:text-xl text-base px-3 md:px-5 w-max rounded py-1 md:py-2  text-white bg-green-700 '>Decorate your Home</span>
            <p className='text-xs mt-1 md:text-2xl font-normal text-gray-600  py-5'>Transform your living space with our premium selection of sofas and home essentials, designed for comfort and style</p>
            </div>
            <Link > <span className='text-xs md:text-xl  bg-black py-2 font-bold  text-white  rounded px-5 md:px-10'>By now</span></Link>
          </div>
          <div className='  flex  justify-end'><img  className='rounded  w-80 md:h-auto h-32 md:w-96 ' src={sofa}></img></div>
        </div>
</div>



      </main>
      </>
}
    </>
  )
}

export default Dashbord