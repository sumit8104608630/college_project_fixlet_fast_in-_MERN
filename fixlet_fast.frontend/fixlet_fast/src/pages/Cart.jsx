import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {fetchCart} from "../app/Actions/cart_action.js"
import { IoCart } from "react-icons/io5";
import {gasstoverepair} from "../component/CartImage.jsx"


function Cart() {
  const dispatch=useDispatch();
  const [cart,setSart]=useState({});
  const {cartLoading,cartItems,cartError}=useSelector((state)=>state.cart);
  useEffect(()=>{
    dispatch(fetchCart());
  },[dispatch])
  console.log(cartItems)
  return (<>{cartLoading?<>loading...</>:
    <main className=' pt-28  w-full px-32'>
              <div className='flex gap-4 items-center'>
                <IoCart size={50} className='text-orange-500' />
                <h1 className='text-3xl text-gray-700 font-bold'>Your Cart</h1>
              </div>
              <img src={gasstoverepair} />
      {
  cartItems.map((item)=>{
    return(<h1 key={item._id}>{item.serviceTypeName}</h1>)
  })

}</main>
    }
    </>
  )
}

export default Cart