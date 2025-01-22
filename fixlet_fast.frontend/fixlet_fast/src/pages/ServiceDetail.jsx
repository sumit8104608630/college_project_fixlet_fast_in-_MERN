import React  from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import AddButton from '../component/AddButton';
import { FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { useEffect,useState } from "react";
import { useSelector } from 'react-redux';


function ServiceDetail(props) {
const MemoizedButton = React.memo(AddButton);
const [filter_cartItems,setFilter_cartItems] = useState([]);
const showDetail=props?.dataDetail;
const subService=showDetail?.subservice;
const serviceId=showDetail?.serviceId
const onAddButton=props.onAddButton;
const [cartLoading,setCartLoading]=useState(true)
const { loading, services_data, error } = useSelector(state => state.service);


useEffect(()=>{
setFilter_cartItems(props.filter_cartItems)
},[props.filter_cartItems])



useEffect(()=>{
if(filter_cartItems.length>0||cartLoading){
  setCartLoading(false)
}
},[filter_cartItems.length,cartLoading])

  return (<>
  {cartLoading||loading?
<div className=' flex justify-center items-center h-full'>
<div className="relative flex flex-col items-center">
        <svg
          version="1.1"
          viewBox="0 0 64 64"
          width="2em"
          height="2em"
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
        </svg>
        <div className="mt-2 text-center text-orange-500 text-sm font-medium">Please wait</div>
      </div>
  </div>
  :
    <>
        <div>
          <div className='px-5'>
            {
                                  <div >
                                    <div className="flex gap-5 items-center w-full justify-between py-4">
                                      <div>
                                        <h2 className="text-lg text-start font-semibold text-gray-600">{subService?.subServiceName}</h2>
                                        <div className="flex items-center gap-2">
                                          <FaStar size={12} className="text-yellow-400" />
                                          <span>{subService?.serviceRatingCount} review</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                          <div className="flex items-center">
                                            <FaIndianRupeeSign size={12} />
                                            <span>{subService?.price}</span>
                                          </div>
                                          <div className="flex gap-2 items-center">
                                            <FaRegClock size={12} />
                                            <span>{subService?.serviceTime > 60 ? (
                                              (((subService?.serviceTime) / 60).toFixed() > (subService?.serviceTime) / 60 ? ((subService?.serviceTime) / 60).toFixed() - 1 : ((subService?.serviceTime) / 60).toFixed() + "." + (((subService?.serviceTime) / 60 - 1) * 60).toFixed()) + " hr"
                                            ) : `${subService?.serviceTime} mins`} </span>
                                          </div>
                                        </div>
                                    
                                      </div>
            
                                      <div className="flex flex-col items-center">
                                        <img
                                          className="rounded w-20 h-20 object-contain"
                                          src={subService?.subServiceImage}
                                          alt={subService?.subServiceName}
                                        />
                                        <div>
                                          {filter_cartItems?.some((item) => item.serviceId === serviceId && item.subService.subServiceId === subService?._id) ? (
                                            <div key={subService?._id}>
                                              {filter_cartItems?.map((item, i) => (
                                                <MemoizedButton
                                                  onClickAdd={props.onAddButton}
                                                  price={subService.price}
                                                  subservice={subService}
                                                  onClickSubtract={props.onSubButton}
                                                  key={i}
                                                  service={item?.serviceId}
                                                  subService_id={subService?._id}
                                                  service_id={serviceId}
                                                  subService={item?.subService}
                                                />
                                              ))}
                                            </div>
                                          ) : (
                                            <button
                                              onClick={() => onAddButton(serviceId, subService?._id,subService,subService?.price)}
                                              className="text-orange-500 border px-5 w-15 rounded text-sm border-orange-400 mt-2 hover:bg-orange-100 font-semibold hover:border-orange-600 hover:text-orange-600"
                                            >
                                              Add
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                }
          </div>
        </div>
        <hr className='h-0.5  bg-gray-700 my-2' />
        <div className='px-5'>
        <h1 className='font-semibold mb-5 text-2xl text-gray-700'>Included</h1>
            <ul style={{ maxHeight: '155px', overflowY: 'auto' }} className='flex flex-col gap-1 custom-scrollbar'>
            {
              subService?.included?.map((item,i)=><p className='flex text-xl  gap-3 font-medium text-gray-700' key={i}><span className='pt-1'><FaCheckCircle/></span><span>{item}</span></p>)
            }
            </ul>
        </div>
        <hr className='h-0.5  bg-gray-700 my-2' />
        <div className='px-5'>
        <h1 className='font-semibold mb-5 text-2xl text-gray-700'>Note</h1>
            <ul style={{ maxHeight: '140px', overflowY: 'auto' , }} className='flex flex-col gap-1 custom-scrollbar'>
            {
              subService?.note?.map((item,i)=><p className='flex text-xl gap-4 font-medium text-gray-700' key={i}><span className='pt-1'><FaExclamationCircle/></span><span>{item}</span></p>)
            }
            </ul>
        </div>
        </>
}
    </>
  )
}

export default ServiceDetail