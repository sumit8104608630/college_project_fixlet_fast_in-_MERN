import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {fetchCart} from "../app/Actions/cart_action.js"
import { IoCart } from "react-icons/io5";
import {cartImage} from "../component/CartImage.jsx"
import { LuIndianRupee } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
import { currentContext } from '../component/Context.jsx';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import emptyCart from "../assets/staticPhotp/emptyCart.svg";
import Loader from "../component/Loader"
import { FaArrowLeftLong } from "react-icons/fa6";
import {get_offers} from "../app/Actions/offers_action";



function Cart() {
  const Context=useContext(currentContext);
  const { offerLoading, offersData, offerError } = useSelector(state => state.offers);
  const dispatch=useDispatch();
  const [cartEmpty,setCartEmpty]=useState(false)
 //const [cart,setSart]=useState([]);
  const footerShow=useContext(currentContext)
  const {cartLoading,cartItems,cartError}=useSelector((state)=>state.cart);
  const {isLoading,userInfo}=useSelector((state)=>state.user);
  const city=userInfo?.city
  const [offers,setOffers]=useState([])
  



  useEffect(()=>{
    dispatch(get_offers())
},[dispatch])

useEffect(() => {
  setOffers(offersData)
  
},[offersData,offerLoading,])




  useEffect(()=>{
    Context.setShowHeader(false)
    footerShow.setFooterShow(false)
    dispatch(fetchCart());
    return ()=>{
      Context.setShowHeader(true)

      footerShow.setFooterShow(true)
    }
  },[dispatch,footerShow,Context])
  useEffect(()=>{
    if(cartItems.length===0){
      setCartEmpty(true)
    }
    else{
      setCartEmpty(false)
    }
  },[cartItems]) 


  return (<>{cartLoading&&offerLoading?<><Loader/></>:
    <main className='min-h-screen bg-gray-50 pb-10'>
      <div className='w-full bg-white shadow-sm sticky top-0 z-10 px-4 py-4 md:px-8 flex items-center gap-4'>
        <Link to={"/"} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FaArrowLeftLong size={20}/>
        </Link>
        <h1 className='text-xl font-bold text-gray-800'>My Cart</h1>
      </div>

      <div className="container mx-auto px-4 mt-6">
        {cartEmpty ? (
          <div className='flex flex-col items-center justify-center py-20 text-center'>
            <img className='w-48 md:w-64 mb-8 opacity-80' src={emptyCart} alt="Empty Cart" />
            <h1 className='text-2xl font-bold text-gray-800 mb-2'>Your cart is empty</h1>
            <p className='text-gray-500 mb-8 max-w-xs'>Looks like you haven't added any services yet. Explore our top services and book now!</p>
            <Link to={'/'} className='px-10 py-3 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200'>
              Explore Services
            </Link>
          </div>
        ) : (
          <div className='max-w-3xl mx-auto'>
            <div className='flex items-center gap-4 mb-8'>
              <div className="bg-orange-100 p-3 rounded-2xl">
                <IoCart size={32} className='text-orange-600' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-gray-800'>Order Summary</h2>
                <p className='text-sm text-gray-500'>{cartItems.length} service categories in cart</p>
              </div>
            </div>

            <div className="space-y-6">
              {cartItems.map((item, i) => (
                <div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden' key={item._id}>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className='text-xl font-bold text-gray-800 mb-1'>{item.serviceTypeName}</h3>
                        <p className='text-sm text-gray-500 font-medium'>{item.totalQuantity} items selected</p>
                      </div>
                      <div className="flex items-center bg-orange-50 px-3 py-1 rounded-full">
                        <LuIndianRupee size={14} className="text-orange-600" />
                        <span className='text-lg font-bold text-orange-600'>{item?.totalPrice}</span>
                      </div>
                    </div>

                    <div className='space-y-3 mb-6'>
                      {item.productDetails?.map(subItem => (
                        <div className='flex items-center justify-between py-2 border-b border-gray-50 last:border-0' key={subItem.subService.subServiceId}>
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                            <span className="text-gray-700 font-medium">{subItem.subService.subServiceName}</span>
                          </div>
                          <span className='text-gray-400 text-sm font-bold'>x{subItem.subService.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                      <Link 
                        to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=${item._id}`}  
                        state={{ headLine: `${item?.serviceTypeName}` }} 
                        className='py-3 px-4 rounded-2xl font-bold text-gray-600 border-2 border-gray-100 hover:bg-gray-50 text-center transition-colors'
                      >
                        Add More
                      </Link>
                      <Link 
                        to={`/check_out/?city=${city||"mumbai"}&categories=${item._id}`} 
                        className='py-3 px-4 rounded-2xl font-bold text-white bg-orange-500 hover:bg-orange-600 text-center transition-all shadow-md shadow-orange-100'
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
    }
    </>
  )
}

export default Cart