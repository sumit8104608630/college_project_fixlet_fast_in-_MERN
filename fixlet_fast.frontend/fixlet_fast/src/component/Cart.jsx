import React from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import Loader from "../component/Loader"


function Cart(props) {
  
    const subServiceName=props.subServiceName
    const totalPrice=props.totalPrice
    const onClickAdd=props.onClickAdd
    const serviceId=props.serviceId;
    const subServiceId=props.subServiceId;
    const quantity=props.quantity
    const onClickSubtract=props.onClickSubtract;
    const price=props.price
    const button_loading=props.button_loading
    const subservice=props.subservice;

  return (
    <div className='flex justify-between border-2 px-5 py-2 rounded'>
        <div><span>{subServiceName}</span></div>
        <div>
            <div>    
                <span className='flex justify-center items-center'><FaIndianRupeeSign  /> {totalPrice}</span>
            </div>
            <div className={`flex items-center w-20 border bg-orange-100 border-orange-500 rounded mt-2 justify-between`}>
            <button  onClick={() => onClickAdd(serviceId, subServiceId,subservice,price)} 
                          className={
                            `text-orange-500 px-2`}
                        >
     +
                        </button>

                    <span >


                
                    {button_loading[subServiceId] ? (
            <div className={`py-1 px-2 `}>  <svg
            version="1.1"
            viewBox="0 0 64 64"
            width="0.8em"
            height="0.8em"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
          >
            <circle
              className="stroke-gradient"
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#spinner-gradient)"
              strokeWidth="8"
            />
            <path
              className="stroke-current text-orange-500"
              d="M32,4 A28 28,0,0,0,32,60"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="spinner-gradient"
                gradientUnits="userSpaceOnUse"
                x1="32"
                y1="0"
                x2="32"
                y2="64"
              >
                <stop offset="0.1" stopColor="currentColor" stopOpacity="0" />
                <stop offset="0.9" stopColor="currentColor" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg></div>  // Spinner during loading
          ) : (
            <span className="text-sm font-semibold text-orange-500">{ quantity }</span>// Button label when not loading
          )}
                                
                      
                      </span>

                    <button  onClick={() => onClickSubtract(serviceId, subServiceId,subservice,price)} 
                                 className={
                                  `text-orange-500 px-2`}
                                >-</button>
                    </div>
        </div>
    </div>
   
  )
}

export default Cart