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



function Cart() {
    const Context=useContext(currentContext);
  const dispatch=useDispatch();
  const [cartEmpty,setCartEmpty]=useState(false)
 // const [cart,setSart]=useState([]);
  const footerShow=useContext(currentContext)
  const {cartLoading,cartItems,cartError}=useSelector((state)=>state.cart);
  const {isLoading,userInfo}=useSelector((state)=>state.user);
  const city=userInfo?.city

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
  return (<>{cartLoading?<><Loader/></>:
    <main className=' md:pt-28  flex flex-col   items-center w-full md:px-32'>
      <div className='w-full bg-white shadow-sm fixed top-0 px-5 py-5 '>
     <Link to={"/"}>
            <FaArrowLeftLong className='' size={25}/>
    </Link>
    </div>
      {cartEmpty?
      <div className='flex justify-between gap-5  flex-col items-center px-5 pt-3 '>
                          <div>
                            <img className='w-36' src={emptyCart} />
                          </div>
                          <div className='flex flex-col items-center '>
                          <h1 className='text-lg md:text-xl font-medium text-gray-600'>No item in your cart</h1>
                          <span className='text-xs md:text-base text-gray-500'>Lets add some service</span>
                          </div>
                          <div >
                          <Link to={'/'} className='px-5 py-2 text-xs md:text-xl font-semibold text-gray-700 hover:bg-gray-100 bg-white border-2  rounded-lg'>Explore service</Link>
                          </div>
                        </div>
                        :
      <div className='w-full md:w-1/2'>
              <div className='flex px-2 md:px-0 gap-4 items-center justify-start w-full mb-5'>
                <IoCart size={50} className='text-orange-500' />
                <h1 className='text-3xl text-gray-700 font-bold'>Your Cart</h1>
              </div>
      {
  cartItems.map((item)=>{
    return(
    <div className='' key={item._id}>
      <hr className='h-0.5  bg-gray-400'/>
    <h1 className='text-3xl px-2 md:p-0 pt-2 font-medium text-gray-600 mb-2' >{item.serviceTypeName}</h1>
    <p className='flex px-2 text-gray-700  mb-3 items-center'><span>Total service {item.totalQuantity}</span> . <span className='flex items-center'><LuIndianRupee size={15} />{item.totalPrice}</span></p>
    <>
    {
      item.productDetails?.map(item=>{
        return(
          <div className='flex px-5' key={item.subService.subServiceId}>
            <div className='flex flex-col '>
            <p className='text-xl items-center  flex gap-2'><li>{item.subService.subServiceName}</li><span className='text-gray-500 text-base'>x {item.subService.quantity}</span></p>
                 <div className="flex gap-2 items-center">{/*
                  <FaRegClock size={12} />
                  <span>{item.subService.serviceTime > 60 ? (
                    (((item.subService.serviceTime) / 60).toFixed() > (item.subService.serviceTime) / 60 ? ((item.subService.serviceTime) / 60).toFixed() - 1 : ((item.subService.serviceTime) / 60).toFixed() + "." + (((item.subService.serviceTime) / 60 - 1) * 60).toFixed()) + " hr"
                  ) : `${item.subService.serviceTime} mins`} </span>
    */}</div>
            </div>
          </div>
        )
      })
     
    }
    </>
    <div className='flex w-full px-2 gap-2 my-5'>
      <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=${item._id}`} className='px-5 py-2 text-xl  text-center font-semibold text-gray-700   hover:bg-gray-100 w-full bg-white border-2  rounded-lg'>Add Service</Link>
      <Link to={`/check_out/?city=${city||"mumbai"}&categories=${item._id}`} className='px-5 py-2 text-xl font-semibold text-white text-center bg-orange-500 w-full  rounded-lg'>Checkout</Link>
    </div>
    </div>
    
    )
  })
}
</div>
}
</main>
    }
    </>
  )
}

export default Cart