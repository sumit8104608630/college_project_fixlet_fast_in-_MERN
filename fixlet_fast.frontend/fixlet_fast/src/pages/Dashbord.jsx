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
    <main  className='pt-20 md:pt-28 pb-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Hero Section */}
      <div className='flex flex-col lg:flex-row items-center justify-between gap-10 mb-16'>
        <div className='flex flex-col flex-1 w-full'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl text-gray-800 font-bold mb-6 text-center lg:text-left leading-tight'>
            Home services at your doorstep
          </h1>
          
          <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8'>
            <h2 className='text-xl font-semibold text-gray-700 mb-6 text-center lg:text-left'>What are you looking for?</h2>
            
            <div className='grid grid-cols-3 gap-4 md:gap-6'>
              <button onClick={() => setlink2Toggle(true)} className="flex flex-col items-center group">
                <div className="bg-orange-50 p-4 rounded-2xl group-hover:bg-orange-100 transition-colors duration-300 w-full aspect-square flex items-center justify-center">
                  <img className="w-12 h-12 object-contain" src={cleaning} alt="Cleaning" />
                </div>
                <span className='text-[10px] md:text-xs mt-2 font-medium text-gray-600 text-center'>Cleaning & Pest Control</span>
              </button>

              <button onClick={() => setlink1Toggle(true)} className="flex flex-col items-center group">
                <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-100 transition-colors duration-300 w-full aspect-square flex items-center justify-center">
                  <img className="w-12 h-12 object-contain" src={ac_repair} alt="AC Repair" />
                </div>
                <span className='text-[10px] md:text-xs mt-2 font-medium text-gray-600 text-center'>AC & Appliance Repair</span>
              </button>

              <button onClick={() => setlink3Toggle(true)} className="flex flex-col items-center group">
                <div className="bg-green-50 p-4 rounded-2xl group-hover:bg-green-100 transition-colors duration-300 w-full aspect-square flex items-center justify-center">
                  <img className="w-12 h-12 object-contain" src={electresian} alt="Electrician" />
                </div>
                <span className='text-[10px] md:text-xs mt-2 font-medium text-gray-600 text-center'>Electrician, Plumber & Carpenter</span>
              </button>

              <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=lightdecoration`} state={{ headLine: 'Festival Lights decoration' }} className="flex flex-col items-center group">
                <div className="bg-yellow-50 p-4 rounded-2xl group-hover:bg-yellow-100 transition-colors duration-300 w-full aspect-square flex items-center justify-center">
                  <img className="w-12 h-12 object-contain" src={festival_decoration} alt="Decoration" />
                </div>
                <span className='text-[10px] md:text-xs mt-2 font-medium text-gray-600 text-center'>Festival Lights</span>
              </Link>

              <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=wallpanel`} state={{ headLine: 'Wall Panel installation' }} className="flex flex-col items-center group">
                <div className="bg-purple-50 p-4 rounded-2xl group-hover:bg-purple-100 transition-colors duration-300 w-full aspect-square flex items-center justify-center">
                  <img className="w-12 h-12 object-contain" src={wallPanel} alt="Wall Panel" />
                </div>
                <span className='text-[10px] md:text-xs mt-2 font-medium text-gray-600 text-center'>Wall Panel</span>
              </Link>

              <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=wallpainting`} state={{ headLine: 'Painting & Water proofing' }} className="flex flex-col items-center group">
                <div className="bg-red-50 p-4 rounded-2xl group-hover:bg-red-100 transition-colors duration-300 w-full aspect-square flex items-center justify-center">
                  <img className="w-12 h-12 object-contain" src={paint} alt="Paint" />
                </div>
                <span className='text-[10px] md:text-xs mt-2 font-medium text-gray-600 text-center'>Painting & Waterproofing</span>
              </Link>
            </div>

            <div className='flex justify-between mt-8 pt-6 border-t border-gray-100'>
              <div className='flex flex-col items-center'>
                <span className='text-xl font-bold text-gray-800'>4.8</span>
                <span className='text-xs text-gray-500'>Service Rating</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='text-xl font-bold text-gray-800'>{user_globally}</span>
                <span className='text-xs text-gray-500'>Global Customers</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className='hidden lg:block flex-1'>
          <Addvertice />
        </div>
      </div>

      {/* Quick Access Section */}
      <div className='mb-16'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Quick Access</h2>
          <div className='hidden md:flex gap-2'>
            <button onClick={scrollLeft} className='p-2 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition-all'>
              <IoIosArrowDropleft size={24} />
            </button>
            <button onClick={scrollRight} className='p-2 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition-all'>
              <IoIosArrowDropright size={24} />
            </button>
          </div>
        </div>
        <div ref={scrollContainRef} className='overflow-x-auto pb-4 scrollbar-hide'>
          <QuickAccess />
        </div>
      </div>

      {/* Banner Section */}
      <div className='mb-16'>
        <div className='bg-amber-100 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center'>
          <div className='p-8 md:p-12 flex-1'>
            <span className='inline-block px-4 py-1 bg-green-700 text-white text-sm font-semibold rounded-full mb-4'>
              Decorate your Home
            </span>
            <h2 className='text-2xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight'>
              Transform your living space with our premium selection
            </h2>
            <p className='text-gray-600 mb-8'>
              Designed for comfort and style, our home essentials bring a new life to your space.
            </p>
            <Link to="/" className='inline-block px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors'>
              Buy Now
            </Link>
          </div>
          <div className='flex-1 w-full h-64 md:h-auto'>
            <img className='w-full h-full object-cover' src={sofa} alt="Sofa Decoration" />
          </div>
        </div>
      </div>

      {/* Modals/Popups */}
      {link3Toggle && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
          <div className='bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden'>
            <button onClick={() => setlink3Toggle(false)} className='absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition-all z-10'>
              <IoCloseOutline size={24} />
            </button>
            <div className='p-8'>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>Electrician, Plumber & Carpenter</h3>
              <div className='grid grid-cols-3 gap-6'>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=electrician`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-6 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={electricity_image} alt="Electrician" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-sm mt-3 font-medium text-gray-700'>Electrician</span>
                </Link>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=plumber`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-6 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={plumber} alt="Plumber" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-sm mt-3 font-medium text-gray-700'>Plumber</span>
                </Link>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=carpenter`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-6 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={carpenter} alt="Carpenter" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-sm mt-3 font-medium text-gray-700'>Carpenter</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {link1Toggle && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
          <div className='bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden'>
            <button onClick={() => setlink1Toggle(false)} className='absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition-all z-10'>
              <IoCloseOutline size={24} />
            </button>
            <div className='p-8'>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>AC & Appliance Repair</h3>
              <div className='grid grid-cols-3 gap-6'>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=ac_repair`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-4 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={ac_repair} alt="AC" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-xs mt-3 font-medium text-gray-700'>AC Repair</span>
                </Link>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=chimney`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-4 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={chimney} alt="Chimney" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-xs mt-3 font-medium text-gray-700 text-center'>Chimney Repair</span>
                </Link>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=gasstoverepair`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-4 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={gas} alt="Gas" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-xs mt-3 font-medium text-gray-700 text-center'>Gas Stove</span>
                </Link>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=refrigerator`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-4 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={refrigerator} alt="Refrigerator" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-xs mt-3 font-medium text-gray-700 text-center'>Refrigerator</span>
                </Link>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=mixergrinder`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-4 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={mixer} alt="Mixer" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-xs mt-3 font-medium text-gray-700 text-center'>Mixer/Grinder</span>
                </Link>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=washingmachine`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-4 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={washinMashin} alt="Washing" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-xs mt-3 font-medium text-gray-700 text-center'>Washing Machine</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {link2Toggle && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
          <div className='bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden'>
            <button onClick={() => setlink2Toggle(false)} className='absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition-all z-10'>
              <IoCloseOutline size={24} />
            </button>
            <div className='p-8'>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>Cleaning & Pest Control</h3>
              <div className='grid grid-cols-3 gap-6'>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=bathroom_kitchen`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-4 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={bathroom} alt="Bathroom" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-xs mt-3 font-medium text-gray-700 text-center'>Bathroom/Kitchen</span>
                </Link>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=fullhome`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-4 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={home} alt="Full Home" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-xs mt-3 font-medium text-gray-700 text-center'>Full Home</span>
                </Link>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=sofaCleaning`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-4 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={sofa_image} alt="Sofa" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-xs mt-3 font-medium text-gray-700 text-center'>Sofa Cleaning</span>
                </Link>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=pestcontrol`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-4 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={pest} alt="Pest" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-xs mt-3 font-medium text-gray-700 text-center'>Insect Control</span>
                </Link>
                <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=bedbugcontrol`} className='flex flex-col items-center group'>
                  <div className='bg-gray-50 p-4 rounded-2xl w-full aspect-square flex items-center justify-center group-hover:bg-orange-50 transition-colors'>
                    <img src={bed} alt="Bed Bug" className='w-full h-full object-contain' />
                  </div>
                  <span className='text-xs mt-3 font-medium text-gray-700 text-center'>Bed Bugs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
</>
}
    </>
  )
}

export default Dashbord