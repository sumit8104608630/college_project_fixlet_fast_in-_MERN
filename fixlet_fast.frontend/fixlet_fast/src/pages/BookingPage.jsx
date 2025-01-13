import React from 'react'
import { useSearchParams } from 'react-router';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import { useContext } from 'react';
import { currentContext } from '../component/Context.jsx';
import {fetchCheckOut} from "../app/Actions/cart_action.js"
import Loader from "../component/Loader.jsx"
import { FaIndianRupeeSign } from "react-icons/fa6";




function BookingPage() {
  const [searchParams] = useSearchParams();
  const dispatch=useDispatch()
  const {checkOutItemLoading,checkOutItem,checkOutItemError}=useSelector((state)=>state.cart);
  const {isLoading,userInfo}=useSelector((state)=>state.user);
    const Context=useContext(currentContext);
    const city = searchParams.get('city') || "mumbai";
    const categories = searchParams.get('categories');  
    const state = userInfo?.state;
    useEffect(()=>{
      dispatch(fetchCheckOut({state,city,categories}));
      Context.setCheckout(false)
      return()=>{
        Context.setCheckout(true)
      }
    },[Context,city,state,dispatch,categories])
  
console.log(checkOutItem)
  return (<>{checkOutItemLoading?<><Loader/></>:
    <main className='pt-24 w-full flex justify-center px-20'>
      <div className='w-4/5 flex justify-between gap-5'>
        <div className='w-full px-2 flex flex-col gap-5'>
          <div className='bg-green-200 px-5 rounded-lg py-4'><p className=' text-center text-green-800 font-medium text-xs'>You're saving total ₹60 on this order! .</p></div>


          <div className='border bg-gray-50 rounded-lg pb-2 flex flex-col'>
          <div className='flex items-center gap-4  px-3 py-4 ' >
            <IoIosMail className='text-gray-600 ' size={30}/><p className='flex flex-col'><span className="text-base font-semibold text-gray-800">Send booking detail to</span><span className='text-sm font-normal text-gray-600'>{userInfo?.email}</span></p>
          </div>
          <hr className=' my-2 bg-gray-500'/>
          <div className='flex items-center gap-4 px-3 py-4 ' >
            <div><FaLocationDot className='text-gray-600 ' size={25}/></div><p className='flex flex-col'><span className="text-base font-semibold text-gray-800">Address</span><span className='text-sm font-normal text-gray-600'>{userInfo?.location}</span></p>
          </div>
          <div className='px-2'>
          <button className='text-base font-semibold w-full rounded py-2 hover:bg-orange-600 text-white bg-orange-500'> Change address </button>
          </div>
          <hr className=' my-2 bg-gray-500'/>

          <div className=' flex items-center gap-4 px-3 py-4 ' >
            <div><IoTime className='text-gray-600 ' size={25}/></div><p>Slot</p>
          </div>
          <hr className=' my-2  bg-gray-500'/>
          <div className='flex  items-center gap-4 px-3 py-4 ' >
            <div><MdPayments className='text-gray-600 ' size={25}/></div><p>Payment method</p>
          </div>
          </div>
          
          <div className=''>
            <h1 className='text-lg font-semibold text-gray-800'>Cancellation policy</h1>
            <p className='text-gray-600'>Free cancellations if done more than 12 hrs before the service or if a professional isn’t assigned. A fee will be charged otherwise.</p>
            <button className='text-sm font-semibold underline'>Read full policy</button>
          </div>


        </div>
        <div className='w-full flex flex-col gap-5 '>
          <div>
            {<>
              <h1 className='text-3xl mb-2 font-semibold text-gray-700'>{checkOutItem?.serviceTypeName}</h1>
            <div style={checkOutItem?.productDetails?.length>4?{overflow:"auto",height:"320px"}:{overflow:"hidden"}} className='flex custom-cartScroll  flex-col gap-2'>{checkOutItem?.productDetails?.map((item)=>{
              return(<>
              
                

                    <div className='flex justify-between border-2 px-5 py-2 rounded'>
                        <div><span>{item?.subService.subServiceName}</span></div>
                        <div>
                            <div>    
                                <span className='flex justify-center items-center'><FaIndianRupeeSign  /> {item?.subService.totalPrice}</span>
                            </div>
                            <div className={`flex items-center w-20 border bg-orange-100 border-orange-500 rounded mt-2 justify-between`}>
                            <button   className="text-sm font-semibold text-orange-500 hover:bg-orange-300 hover:text-white px-2">+</button>
                
                                    <span className="text-sm font-semibold text-orange-500">{item?.subService.quantity}</span>
                
                                    <button className="text-sm font-semibold text-orange-500 px-2 hover:bg-orange-300 hover:text-white">-</button>
                                    </div>
                        </div>
                    </div>



              </>)
            })}</div>
            </>
            }
          </div>
          <div className='rounded-lg border'>
            <h1 className='px-5 py-2 text-lg font-medium text-gray-700'>Payment summary</h1>
            <ul className='flex gap-2 flex-col px-4 mt-2'>
              <li className='flex justify-between px-2'><span className='underline decoration-dotted text-gray-800'>total item</span><span className=' decoration-dotted'>{checkOutItem?.totalPrice}</span></li>
              <li className='flex justify-between px-2'><span className='underline decoration-dotted text-gray-800'>Visitation Fee</span><span className=' decoration-dotted'>70</span></li>
              <li className='flex justify-between px-2'><span className='underline decoration-dotted text-gray-800'>Tax & Fee</span><span className=' decoration-dotted'>2250</span></li>
            </ul> 
            <hr className='h-0.5 bg-gray-500 my-2'/>
            <div className='px-4'>
              <p className='flex justify-between px-2 text-lg font-medium py-2 text-gray-800'><span>Total Price</span><span>1200</span></p>
            </div>
          </div>
        </div>
      </div>
    </main>}</>
  )
}

export default BookingPage