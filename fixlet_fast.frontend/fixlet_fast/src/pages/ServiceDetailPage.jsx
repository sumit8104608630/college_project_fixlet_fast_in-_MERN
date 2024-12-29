import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll'; // Importing Link from react-scroll
import electricianJson from "../component/fakejsonData"; // Assuming this is the data you're working with
import { FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { useSearchParams } from 'react-router';
import {useSelector,useDispatch} from "react-redux"
import { fetchService } from '../app/Actions/service_action';
import {useLocation} from "react-router-dom"
import Loader from "../component/Loader"
import { useNavigate } from 'react-router-dom';


function ServiceDetailPage(props) {
  const {loading,services_data,error}=useSelector(state=>state.service);
  const dispatch=useDispatch();
  const {isLogin,userInfo,isLoading}=useSelector(state=>state.user)
  const [active, setActive] = useState(null);
  const [searchParams]=useSearchParams();


  // let collect some information from query params from url to get the perfect data

  const city=searchParams.get('city')||"mumbai";
  const categories=searchParams.get('categories');
  const state=userInfo?.state;
  const location = useLocation();
  const { headLine } = location.state || {}; 

  useEffect(()=>{
    if(state&&city&&categories){
   dispatch(fetchService({state,city,categories}))
    }
  },[city,state,categories,dispatch])



  return (<>{isLoading&&loading?<Loader/>:
    <div className="gap-5 justify-center mt-20 flex">
      <div className="h-min sticky top-24">
        <h1 className="text-4xl font-semibold w-96 mt-5 text-gray-700 mb-5">{headLine}</h1>

        <div
          className={`grid h-max w-max grid-cols-${Math.ceil(services_data.length<=2 ? 2 :services_data.length / 2)} gap-5 border-2 p-5 rounded`}
          style={{gridTemplateColumns:`repeat(${Math.ceil(services_data.length<=2 ? 2 :services_data.length / 2)}, 1fr)`}}
        >
          {services_data.map((service) => (
            <Link
              to={service.servicePartName}
              smooth={true} // Adding smooth scroll behavior
              offset={-70} // Adjusting scroll position if needed
              duration={500} // Time for the smooth scroll
              onClick={() => setActive(service.serviceName)}
              key={service._id}
            >
              <div
                className={`bg-white p-4 w-24 h-full flex flex-col items-center justify-between rounded border-2 border-gray-200 transition-transform transform hover:scale-95 hover:border-gray-500 cursor-pointer ${
                  service.serviceName === active && "border-2 border-gray-500" 
                }`}
              >
                <img
                  src={service.serviceImage}
                  alt={service.serviceName}
                  className="w-full h-auto object-cover rounded"
                />
                <h2 className="text-center text-sm text-gray-600 font-semibold mt-4">{service.serviceName}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="scrollbar-thin scrollbar-none scrollbar-track-gray-200">
        <div  className="flex flex-col border-2 rounded w-96 px-5">
          {services_data.map((service) => (
            <div id={service.servicePartName} className="py-5" key={service._id}>
              <h1 className="text-gray-700 text-start text-2xl font-bold">{service.serviceName}</h1>
              {service.serviceSubType.map((subService) => (
                <div key={subService._id}>
                <div  className="flex gap-5 items-center w-full justify-between py-4" >
                    <div>
                      <h2 className="text-lg text-start font-semibold text    -gray-600">{subService.subServiceName}</h2>
                      <div className="flex items-center gap-2">
                        <FaStar size={12} className="text-yellow-400" />
                        <span>{subService.serviceRatingCount} review</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <FaIndianRupeeSign size={12} />
                          <span>{subService.price}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <FaRegClock size={12} />
                          <span>{subService.serviceTime>60?(((subService.serviceTime)/60).toFixed()-1+"."+(((subService.serviceTime)/60-1)*60).toFixed()) +" hr":subService.serviceTime+" mins"} </span>
                        </div>
                      </div>
                      <div className="text-start">
                        <button className="text-orange-500">View details</button>
                      </div>
                    </div>

                  <div className="flex flex-col items-center">
                    <img
                      className="rounded w-20 h-20 object-contain"
                      src={subService.subServiceImage}
                      alt={subService.subServiceName}
                    />
                    <div>
                      {subService.serviceRatingCount === 0 ? (
                        <button className="text-orange-500 border px-5 w-15 rounded text-sm border-orange-400 mt-2 hover:bg-orange-100 font-semibold hover:border-orange-600 hover:text-orange-600">
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center w-20 border hover:bg-orange-100 border-orange-500 rounded mt-2 justify-between">
                          <button className="text-sm font-semibold text-orange-500 px-2">+</button>
                          <span className="text-sm font-semibold text-orange-500">1</span>
                          <button className="text-sm font-semibold text-orange-500 px-2">-</button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                </div>
                <hr className='w-full  bg-gray-400'></hr>

                </div>
              ))}

            </div>
          ))}
          
        </div>
      </div>

      <div className="w-96 h-min sticky top-24 border"></div>
    </div>}</>
  );
}

export default ServiceDetailPage;
