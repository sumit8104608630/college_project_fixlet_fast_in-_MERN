import React from 'react'
import emptyCart from "../assets/staticPhotp/emptyCart.svg";
import { Link } from 'react-router';


function EmptyCartItem(props) {
    const {city,categories} = props;  

  return (
    <div className='pt-20 w-full h-screen  flex justify-center'>
        <div className='w-96 flex flex-col items-center'>
        <img className='w-52' src={emptyCart}></img>
        <h1 className='font-medium text-gray-800 text-lg mt-4'>Your cart is empty!</h1>
        <p className='text-center font-normal text-gray-700 mt-2 text-base'>Browse our services and add your favorites to proceed.</p>
        <Link to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=${categories}`}state={{ headLine: 'Bed Bugs Control' }} className=" mt-2 text-orange-500 font-medium px-5 py-1 hover:bg-gray-50 rounded-lg border-2 text-lg">Explore Services</Link> 
           <Link to={"/myBooking"}
               className=" mt-2 text-orange-500 font-medium px-5 py-1 hover:bg-gray-50 rounded-lg border-2 text-lg"
                >
                  My booking
                </Link>       
        </div>
    </div>
  )
}

export default EmptyCartItem