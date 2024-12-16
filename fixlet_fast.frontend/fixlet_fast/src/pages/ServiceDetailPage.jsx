import React from 'react';
import json from "../component/fakejsonData.js"; // Assuming this is the data you're working with
import { FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";





function serviceDetailPage() {
  return (
    <div className='mt-28   px-32 '>


    <div className=' '>



    <div className=" gap-5  flex ">
      <div>
      <h1  className='text-4xl font-semibold w-max mt-5  text-gray-700 mb-5'>Electrician</h1>

      <div className='grid h-max grid-cols-3 gap-5 border-2 p-5 rounded-xl'>
      {json.map((service, index) => (
        <a href={`#${service.servicePartName}`}   key={service.serviceName}
>
    <div
    className="bg-white p-4 w-24 h-full flex flex-col items-center justify-between rounded-lg border-2  border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg hover:border-gray-200 cursor-pointer"
  >
  
          <img 
            src={service.serviceImage} 
            alt={service.serviceName} 
            className="w-full h-auto object-cover rounded"
          />
          <h2 className=" text-center text-sm text-gray-600 font-semibold mt-4">{service.serviceName}</h2>
          
        </div>
        </a>
      ))}
      </div>
      </div>


  

<div className='h-screen   overflow-auto scrollbar-thin scrollbar-none scrollbar-track-gray-200'>
    <div className='flex flex-col border-2 rounded px-5  '>
      {
        json.map((service,index)=>{
          return(
            <div id={`${service.servicePartName}`} className='py-5'  key={service.serviceName}
            >

              <h1 className='text-gray-700 text-2xl font-bold'>{service.serviceName}</h1>
              {
                service.serviceSubType.map((service, index) => {

                    return (
                      <>
                      <div className='flex gap-5 items-center w-full justify-between py-4' key={service.subServiceName}>
                    
                        <div>
                        <h2 className="text-lg font font-semibold r text-gray-600">{service.subServiceName}</h2>
                        <div className='flex items-center gap-2'>
                          <div><FaStar size={12} className='text-yellow-400'/></div>
                          <div><span>{service.serviceRatingCount} View</span></div>
                        </div>
                        <div className='flex items-center gap-4'>
                          <div className='flex items-center'><FaIndianRupeeSign size={12} />  <span> {service.price} </span> </div>
                          <div className='flex gap-2 items-center'><spn><FaRegClock size={12} /></spn><span>{service.serviceTime} mins</span></div>
                        </div>
                        <div><button className='text-orange-500'>View details</button></div>
                        </div>

                        <div className='flex flex-col items-center'>
                          <img className='rounded' src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_128,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1726730716477-571a68.jpeg"></img>
                          <div>{service.serviceRatingCount===0?<button className='text-orange-500 border px-5 w-15 rounded text-sm border-orange-400 mt-2 hover:bg-orange-100 font-semibold hover:border-orange-600 hover:text-orange-600'>Add</button>
                          :
                          <div className='flex items-center w-20 border  hover:bg-orange-100 border-orange-500 rounded mt-2 justify-between '>
                          <button className='text-sm font-semibold text-orange-500 px-2'>+</button>
                          <span className='text-sm font-semibold text-orange-500'>1</span>
                          <button className='text-sm font-semibold text-orange-500 px-2'>-</button>
                          </div>
                          }</div>
                        </div>
                        
                      </div>
                      <hr></hr>
                      </>
                    )

                })
              }

            </div>
          )
        })
      }
      
    </div>
</div>



    <div>
 
 </div>




    </div>
    </div>
    </div>
  );
}

export default serviceDetailPage;
