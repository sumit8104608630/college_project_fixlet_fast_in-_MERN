
import React from 'react'

function AddButton(props) {
    const serviceId=props.service;
    const subserviceId=props.subService?.subServiceId;
    const quantity=props.subService?.quantity
    const service_id=props.service_id;
    const subservice_id=props.subService_id;
    const onClickSubtract=props.onClickSubtract;
    const onClickAdd=props.onClickAdd;
    const price=props.price
    const subservice=props.subservice;
    const button_loading=props.button_loading


    
  return (
    <div>{serviceId==service_id&&subserviceId==subservice_id&&
       <>     
                        <div className={`flex items-center w-20 border bg-orange-100 border-orange-500 rounded mt-2 justify-between`}>
                          <button  onClick={() => onClickAdd(service_id, subservice_id,subservice,price)} className="text-sm font-semibold text-orange-500 hover:bg-orange-300 hover:text-white px-2">+</button>

                          <span >


                
                    {button_loading[subservice_id] ? (
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

                          <button  onClick={() => onClickSubtract(service_id, subservice_id,subservice,price)} className="text-sm font-semibold text-orange-500 px-2 hover:bg-orange-300 hover:text-white">-</button>
                        </div>
                      
    </>
}</div>
)
}

export default AddButton
