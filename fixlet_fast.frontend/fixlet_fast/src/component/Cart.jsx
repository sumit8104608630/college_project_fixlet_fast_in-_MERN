import React from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";

function Cart(props) {
    const subServiceName=props.subServiceName
    const totalPrice=props.totalPrice
    const onClickAdd=props.onClickAdd
    const serviceId=props.serviceId;
    const subServiceId=props.subServiceId;
    const quantity=props.quantity
    const onClickSubtract=props.onClickSubtract;
    const price=props.price
    const subservice=props.subservice;
  return (
    <div className='flex justify-between border-2 px-5 py-2 rounded'>
        <div><span>{subServiceName}</span></div>
        <div>
            <div>    
                <span className='flex justify-center items-center'><FaIndianRupeeSign  /> {totalPrice}</span>
            </div>
            <div className={`flex items-center w-20 border bg-orange-100 border-orange-500 rounded mt-2 justify-between`}>
            <button  onClick={() => onClickAdd(serviceId, subServiceId,subservice)} className="text-sm font-semibold text-orange-500 hover:bg-orange-300 hover:text-white px-2">+</button>

                    <span className="text-sm font-semibold text-orange-500">{quantity}</span>

                    <button  onClick={() => onClickSubtract(serviceId, subServiceId,subservice)} className="text-sm font-semibold text-orange-500 px-2 hover:bg-orange-300 hover:text-white">-</button>
                    </div>
        </div>
    </div>
   
  )
}

export default Cart