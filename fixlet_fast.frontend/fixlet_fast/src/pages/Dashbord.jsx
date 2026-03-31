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
    if (link3Toggle || link2Toggle || link1Toggle) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [link3Toggle, link2Toggle, link1Toggle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



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
    <main  className={ `custom-dashBoardScroll  pt-36 xl:pt-28  pb-4  w-full xl:px-32 ${ link3Toggle&&"  overflow-hidden "}` }>
{link3Toggle&&
<div className='fixed z-50 inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4'>
  <div className='relative w-full max-w-lg animate-in fade-in zoom-in duration-200'>
    <button onClick={()=>setlink3Toggle(false)} className='bg-white rounded-full p-2 absolute -top-14 right-0 shadow-lg hover:bg-gray-100 transition-all'><IoCloseOutline size={24}/></button>
    <div className='rounded-3xl shadow-2xl p-6 md:p-8 bg-white'>
      <h1 className='mb-6 font-bold text-xl md:text-2xl text-gray-800 border-b pb-4'>Electrician, Plumber & Carpenter</h1>
      <div className='grid grid-cols-3 gap-3 md:gap-6'>
        <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=electrician`} className="flex flex-col items-center group">
          <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
            <img className="w-full h-full object-contain" src={electricity_image} alt="Electrician" />
          </div>
          <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Electrician</span>
        </Link>

        <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=plumber`} className="flex flex-col items-center group">
          <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
            <img className="w-full h-full object-contain" src={plumber} alt="Plumber" />
          </div>
          <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Plumber</span>
        </Link>

        <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=carpenter`} className="flex flex-col items-center group">
          <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
            <img className="w-full h-full object-contain" src={carpenter} alt="Carpenter" />
          </div>
          <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Carpenter</span>
        </Link>
      </div>
    </div>
  </div>
</div>
}


{link1Toggle&&
<div className='fixed z-50 inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4'>
  <div className='relative w-full max-w-lg animate-in fade-in zoom-in duration-200'>
    <button onClick={()=>setlink1Toggle(false)} className='bg-white rounded-full p-2 absolute -top-14 right-0 shadow-lg hover:bg-gray-100 transition-all'><IoCloseOutline size={24}/></button>
    <div className='rounded-3xl shadow-2xl p-6 md:p-8 bg-white'>
      <h1 className='mb-6 font-bold text-xl md:text-2xl text-gray-800 border-b pb-4'>AC & Appliance Repair</h1>
      <div className='grid grid-cols-3 gap-3 md:gap-6'>
        <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=ac_repair`} state={{ headLine: 'AC repair & Service' }} className="flex flex-col items-center group">
          <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
            <img className="w-full h-full object-contain" src={ac_repair} alt="AC" />
          </div>
          <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>AC repair & Service</span>
        </Link>

        <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=chimney`} state={{ headLine: 'Chimney Repair & Service' }} className="flex flex-col items-center group">
          <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
            <img className="w-full h-full object-contain" src={chimney} alt="Chimney" />
          </div>
          <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Chimney Repair</span>
        </Link>

        <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=gasstoverepair`} state={{ headLine: 'Gas Repair & service' }} className="flex flex-col items-center group">
          <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
            <img className="w-full h-full object-contain" src={gas} alt="Gas" />
          </div>
          <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Gas Repair</span>
        </Link>

        <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=refrigerator`} state={{ headLine: 'Refrigerator Repair ' }} className="flex flex-col items-center group">
          <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
            <img className="w-full h-full object-contain" src={refrigerator} alt="Refrigerator" />
          </div>
          <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Refrigerator</span>
        </Link>

        <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=mixergrinder`} state={{ headLine: 'Mixer & Grinder Repair' }} className="flex flex-col items-center group">
          <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
            <img className="w-full h-full object-contain" src={mixer} alt="Mixer" />
          </div>
          <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Mixer & Grinder</span>
        </Link>

        <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=washingmachine`} state={{ headLine: 'Washin Machine Repair' }} className="flex flex-col items-center group">
          <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
            <img className="w-full h-full object-contain" src={washinMashin} alt="Washing" />
          </div>
          <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Washing Machine</span>
        </Link>
      </div>
    </div>
  </div>
</div>
}



{link2Toggle&&
<div className='fixed z-50 inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4'>
  <div className='relative w-full max-w-lg animate-in fade-in zoom-in duration-200'>
    <button onClick={()=>setlink2Toggle(false)} className='bg-white rounded-full p-2 absolute -top-14 right-0 shadow-lg hover:bg-gray-100 transition-all'><IoCloseOutline size={24}/></button>
    <div className='rounded-3xl shadow-2xl p-6 md:p-8 bg-white overflow-y-auto max-h-[80vh]'>
      <h1 className='mb-6 font-bold text-xl md:text-2xl text-gray-800 border-b pb-4'>Cleaning & Pest Control</h1>
      
      <div className='mb-8'>
        <h2 className='text-xs font-bold text-orange-500 uppercase tracking-widest mb-5'>Cleaning Services</h2>
        <div className='grid grid-cols-3 gap-3 md:gap-6'>
          <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=bathroom_kitchen`} state={{ headLine: 'Bathroom & Kitchen Cleaning' }} className="flex flex-col items-center group">
            <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
              <img className="w-full h-full object-contain" src={bathroom} alt="Cleaning" />
            </div>
            <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Bathroom & Kitchen</span>
          </Link>

          <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=fullhome`} state={{ headLine: 'Full Home Cleaning' }} className="flex flex-col items-center group">
            <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
              <img className="w-full h-full object-contain" src={home} alt="Full Home" />
            </div>
            <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Full Home</span>
          </Link>

          <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=sofaCleaning`} state={{ headLine: 'Sofa Cleaning' }} className="flex flex-col items-center group">
            <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
              <img className="w-full h-full object-contain" src={sofa_image} alt="Sofa" />
            </div>
            <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Sofa Cleaning</span>
          </Link>
        </div>
      </div>

      <div>
        <h2 className='text-xs font-bold text-orange-500 uppercase tracking-widest mb-5'>Pest Control</h2>
        <div className='grid grid-cols-3 gap-3 md:gap-6'>
          <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=pestcontrol`} state={{ headLine: 'Insect Pest Control' }} className="flex flex-col items-center group">
            <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
              <img className="w-full h-full object-contain" src={pest} alt="Pest" />
            </div>
            <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Insect Control</span>
          </Link>

          <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=bedbugcontrol`} state={{ headLine: 'Bed Bugs Control' }} className="flex flex-col items-center group">
            <div className="bg-orange-50 aspect-square overflow-hidden flex items-center justify-center rounded-2xl p-3 md:p-4 w-full group-hover:bg-orange-100 transition-colors">
              <img className="w-full h-full object-contain" src={bed} alt="Bed Bug" />
            </div>
            <span className='text-[10px] md:text-xs mt-3 text-gray-700 font-bold text-center leading-tight'>Bed Bugs</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
}








        <div className=' flex w-full items-center justify-between'>

          <div className='flex  flex-col '>
          <h1  className='text-4xl w-96  text-start  xl:block hidden  text-gray-600 font-semibold'>
            Home service at your doorstep
          </h1>
          <div className='flex flex-col w-full gap-5  px-4 md:px-10 pt-5 pb-10 border-1 xl:rounded xl:border-gray-600 xl:shadow justify-center items-center bg-white'>
            <h1 className='text-start w-full xl:block hidden text-lg text-gray-600 font-semibold mb-2'>What are you looking for?</h1>
            
            <div className='grid grid-cols-3 gap-3 md:gap-5 w-full max-w-lg'>
              {/* Cleaning & Pest control */}
              <div className='flex flex-col items-center text-center'>
                <button onClick={() => setlink2Toggle(true)} className="relative group w-full">
                  <div className="bg-gray-100 aspect-square overflow-hidden flex items-center justify-center rounded-xl p-4 md:p-6 transition-all hover:bg-gray-200">
                    <img className="w-full h-full object-contain" src={cleaning} alt="Cleaning" />
                  </div>
                  <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                </button>
                <span className='text-[10px] md:text-xs mt-2 text-gray-700 font-medium leading-tight'>Cleaning & pest control</span>
              </div>

              {/* AC & Appliance Repair */}
              <div className='flex flex-col items-center text-center'>
                <button onClick={() => setlink1Toggle(true)} className="relative group w-full">
                  <div className="bg-gray-100 aspect-square overflow-hidden flex items-center justify-center rounded-xl p-4 md:p-6 transition-all hover:bg-gray-200">
                    <img className="w-full h-full object-contain" src={ac_repair} alt="AC Repair" />
                  </div>
                  <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                </button>
                <span className='text-[10px] md:text-xs mt-2 text-gray-700 font-medium leading-tight'>AC & Appliance Repair</span>
              </div>

              {/* Electrician, Plumber & Carpenter */}
              <div className='flex flex-col items-center text-center'>
                <button onClick={() => !link2Toggle ? setlink3Toggle(true) : setlink3Toggle(false)} className="relative group w-full">
                  <div className="bg-gray-100 aspect-square overflow-hidden flex items-center justify-center rounded-xl p-4 md:p-6 transition-all hover:bg-gray-200">
                    <img className="w-full h-full object-contain" src={electresian} alt="Electrician" />
                  </div>
                  <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                </button>
                <span className='text-[10px] md:text-xs mt-2 text-gray-700 font-medium leading-tight'>Electrician, Plumber & Carpenter</span>
              </div>

              {/* Festival Lights decoration */}
              <div className='flex flex-col items-center text-center'>
                <Link to={`/serviceDetailPage/service_data_get?city=${city || "mumbai"}&categories=lightdecoration`} state={{ headLine: 'Festival Lights decoration' }} className="relative group w-full">
                  <div className="bg-gray-100 aspect-square overflow-hidden flex items-center justify-center rounded-xl p-4 md:p-6 transition-all hover:bg-gray-200">
                    <img className="w-full h-full object-contain" src={festival_decoration} alt="Festival" />
                  </div>
                  <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                </Link>
                <span className='text-[10px] md:text-xs mt-2 text-gray-700 font-medium leading-tight'>Festival Lights decoration</span>
              </div>

              {/* Wall Panel installation */}
              <div className='flex flex-col items-center text-center'>
                <Link to={`/serviceDetailPage/service_data_get?city=${city || "mumbai"}&categories=wallpanel`} state={{ headLine: 'Wall Panel installation' }} className="relative group w-full">
                  <div className="bg-gray-100 aspect-square overflow-hidden flex items-center justify-center rounded-xl p-4 md:p-6 transition-all hover:bg-gray-200">
                    <img className="w-full h-full object-contain" src={wallPanel} alt="Wall Panel" />
                  </div>
                  <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                </Link>
                <span className='text-[10px] md:text-xs mt-2 text-gray-700 font-medium leading-tight'>Wall Panel installation</span>
              </div>

              {/* Painting & Water proofing */}
              <div className='flex flex-col items-center text-center'>
                <Link to={`/serviceDetailPage/service_data_get?city=${city || "mumbai"}&categories=wallpainting`} state={{ headLine: 'Painting & Water proofing' }} className="relative group w-full">
                  <div className="bg-gray-100 aspect-square overflow-hidden flex items-center justify-center rounded-xl p-4 md:p-6 transition-all hover:bg-gray-200">
                    <img className="w-full h-full object-contain" src={paint} alt="Paint" />
                  </div>
                  <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gray-600 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                </Link>
                <span className='text-[10px] md:text-xs mt-2 text-gray-700 font-medium leading-tight'>Painting & Water proofing</span>
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

      {/* Banner Section */}
      <div className='px-4 md:px-0 '>
        <div className='flex flex-col md:flex-row mt-8 md:mt-14 w-full rounded-3xl bg-amber-50 overflow-hidden shadow-sm border border-amber-100'>
          <div className='flex flex-col justify-between p-6 md:p-10 flex-1' >
            <div className='mb-6'>
              <span className='text-xs md:text-sm px-4 py-1.5 rounded-full text-white bg-green-700 font-bold uppercase tracking-wider'>Decorate your Home</span>
              <p className='text-base md:text-2xl font-medium text-gray-800 mt-6 leading-relaxed'>
                Transform your living space with our premium selection of sofas and home essentials, designed for comfort and style
              </p>
            </div>
            <Link to="/" className='w-max'>
              <span className='text-sm md:text-lg bg-black py-3 px-8 font-bold text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg'>By now</span>
            </Link>
          </div>
          <div className='flex-1 flex justify-center items-center bg-white md:bg-transparent'>
            <img className='w-full h-48 md:h-auto object-cover md:object-contain' src={sofa} alt="Sofa decoration" />
          </div>
        </div>
      </div>



      </main>
      </>
}
    </>
  )
}

export default Dashbord