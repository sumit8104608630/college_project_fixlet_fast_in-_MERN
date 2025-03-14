import React from 'react'
import { useNavigate, useSearchParams } from 'react-router';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { IoIosMail } from "react-icons/io";
import CancellationPolicyModal from "../component/static/CancellationPolicyModal.jsx"
import { IoTime } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import { useContext } from 'react';
import { currentContext } from '../component/Context.jsx';
import {fetchCheckOut} from "../app/Actions/cart_action.js"
import Loader from "../component/Loader.jsx"
import { FaIndianRupeeSign } from "react-icons/fa6";
import EmptyCartItem from '../component/EmptyCartItem.jsx';
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';
import { LuIndianRupee } from "react-icons/lu";
import {get_offers} from "../app/Actions/offers_action";
import Location from "../component/Location.jsx"
import PaymentLoading from '../component/PaymentLoading.jsx';

const apiUrl=import.meta.env.VITE_BACKEND_API_URL
const  RAZORPAY_KEY_ID=import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID // Razorpay Key ID


function BookingPage() {
  const [searchParams] = useSearchParams();
  
  const dispatch=useDispatch()
  const [isModalOpen, setModalOpen] = useState(false);
  const [timeEditToggle,setTimeEditToggle]=useState(false)
  const [emptyCart,setEmpty]=useState(false);
  const {checkOutItemLoading,checkOutItem,checkOutItemError}=useSelector((state)=>state.cart);
  const [allItem,setAllItem]=useState({})
  const {isLoading,userInfo}=useSelector((state)=>state.user);
    const Context=useContext(currentContext);
    const city = searchParams.get('city') || "mumbai";
    const categories = searchParams.get('categories');  
    const state = userInfo?.state;
    const footerShow=useContext(currentContext);
    const [visitationFee,setVisitationFee]=useState(0);
    const [taxFee,setTaxFee]=useState(80)
    const [slotToggle,setSlotToggle]=useState(false);
    const [timeToggle,setTimeToggle]=useState(false)
    const today = new Date();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [time,setTime]=useState([])
    const [loading,setLoading]=useState(true);
      const { offerLoading, offersData, offerError } = useSelector(state => state.offers);
    const [offers,setOffers]=useState([])
    const navigate=useNavigate()
    const [paymentLoading,setPaymentLoading]=useState(false)
    const [date,setDate]=useState({
      day:"",
      date:"",
      time:""
    });

   useEffect(()=>{
    if(!userInfo&&!loading){
      navigate("/login")
    }
   }) 
    useEffect(()=>{
      Context.setShowAddress(true)
    },[Context])

    
    useEffect(() => {
      dispatch(get_offers());
    }, [dispatch]);
    useEffect(() => {
      if(!offerLoading){
        const filter_offer=offersData?.filter(item=>item?._id===categories?item?._id===categories:item?._id==="visitation")[0];
      setOffers(filter_offer?.offersDetails)
      }
    },[offersData,offerLoading,categories])
    






    // Get current day and date
    const currentDay = daysOfWeek[today.getDay()];
    const currentDate = today.getDate();
    ;


    useEffect(()=>{
      axios.get(`${apiUrl}/tax/get_tax_fee?totalPrice=${allItem?.totalPrice}`,{
        withCredentials: true, 
      }).then((response)=>{
        setTaxFee(response.data.data)
      })
    },[allItem?.totalPrice])

    useEffect(()=>{
      axios.get(`${apiUrl}/visit/get_visit_fee?type=${categories}`,{
        withCredentials: true, 
      }).then((response)=>{
   
        setVisitationFee(response.data.data?.price)
      }).catch((error)=>{
        if (error.response?.status === 404) {
          setVisitationFee(false);
        } 
      })
    },[categories])

    useEffect(() => {
      if (!offers || offers.length === 0 || !allItem) return;
    
      const offer = offers[0];
    
      // Condition to reduce visitationFee
      if (allItem?.totalQuantity >= offer?.quantity && visitationFee > offer?.price) {
        setVisitationFee((prev) => prev - offer.price);
      }
    
      // Condition to increase visitationFee
      if (allItem?.totalQuantity < offer?.quantity && visitationFee < offer?.price) {
        setVisitationFee((prev) => prev + offer.price);
      }
    }, [allItem?.totalQuantity, offers]);
    



    useEffect(()=>{
      Context.setShowHeader(false)
      setTimeEditToggle(false)
      footerShow.setFooterShow(false)
      dispatch(fetchCheckOut({state,city,categories}));
      Context.setCheckout(false)
 
      return()=>{
        Context.setShowHeader(true)

        Context.setCheckout(true)
        footerShow.setFooterShow(true)
      }
    },[Context,city,state,dispatch,categories,footerShow])

    useEffect(() => {
 
      if (!isLoading && checkOutItem) {
        
        setAllItem({ ...checkOutItem }); 
      }
    }, [checkOutItem, isLoading]);
    

const update_cart = (serviceId, subServiceId, subService, quantity, price,time) => {

  setAllItem((prev) => {
    const updatedProducts = prev?.productDetails.map((item) => {
      if (item.serviceId === serviceId && subServiceId === item.subService.subServiceId) {
        const updatedQuantity = item.subService.quantity + quantity;
        const updateTime=time*updatedQuantity;
        const updatedTotalPrice = (item.subService.totalPrice / item.subService.quantity) * updatedQuantity;

        return {
          ...item,
          subService: {
            ...item.subService,
            quantity: updatedQuantity,
            serviceTime:updateTime,
            totalPrice: updatedTotalPrice,
          },
        };
      }
      return item;
    });

    return { ...prev, productDetails: updatedProducts };
  });


  if(allItem._id===categories){
    if(quantity===-1){
      setAllItem((prev)=>{
          return{...prev,totalPrice:prev.totalPrice-price,totalQuantity:prev.totalQuantity+quantity,totalTime:prev.totalTime-time}
      });
    }
    else{
      setAllItem((prev)=>{
        return{...prev,totalPrice:prev.totalPrice+price,totalQuantity:prev.totalQuantity+quantity,totalTime:prev.totalTime+time}
    });
    }
    }


};

    


    const handleAddServices = async (serviceId,subServiceId,subService,price,time) => {

      try {
        const obj = {
          serviceId: serviceId,
          subServiceId: subServiceId,
        };
        await fetch(`${apiUrl}/cart/cart_of_service`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
          credentials: "include",
        });
  const filterCart=checkOutItem.productDetails.filter(item=>item.serviceId==serviceId&&item.subService.subServiceId==subServiceId);
  const obj_inside=filterCart[0]
  function isEmpty(obj_inside) {
    return Object.keys(obj_inside).length === 0;
  }
        if(isEmpty(obj_inside)){
          return  update_addObj(serviceId,subServiceId,subService,1,price)
        }
        if(!isEmpty(obj_inside)&&obj_inside.subService.quantity>=1){
          return update_cart(serviceId,subServiceId,subService,1,price,time);
        }
        const new_cart=services_data?.filter(((item)=>{
          if(item._id===serviceId){
            return item;
          }
      }))
      } catch (error) {
        console.log(error);
      }
    };





    const remove_obj=(serviceId,subServiceId,price,time)=>{
    //  const filterCart=allItem.productDetails.filter(item=>item.serviceId==serviceId&&item.subService.subServiceId==subServiceId);
     // const obj_inside=filterCart.length>0?{...filterCart}[0]:{}
     setAllItem((prev)=>{
       
      return {...prev,totalTime:prev.totalTime-time,totalPrice:prev.totalPrice-price,totalQuantity:prev.totalQuantity-1,totalService:prev.totalService-1}})
      setAllItem((prev)=>(
        {...prev,productDetails:prev.productDetails.filter(item=>item.serviceId!==serviceId||item.subService.subServiceId!==subServiceId)}
      ));
      
    }
     
    useEffect(() => {
      if (allItem.productDetails?.length===0 ) {
        setEmpty(true);
      }
    }, [allItem, checkOutItem]);


    
  const handleSubServices = async (serviceId, subServiceId,subService,price,time) => {
    try {
      const obj = {
        serviceId: serviceId,
        subServiceId: subServiceId,
      };

        await fetch(`${apiUrl}/cart/reduce_service_cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
        credentials: "include",
      });
const filterCart=allItem.productDetails.filter(item=>item.serviceId==serviceId&&item.subService.subServiceId==subServiceId);
const obj_inside={...filterCart}[0]
function isEmpty(obj_inside) {
  return Object.keys(obj_inside).length === 0;
}
      if(!isEmpty(obj_inside)&&obj_inside.subService.quantity>1){
       return update_cart(serviceId,subServiceId,subService,-1,price,time);
      }
      else{
      return  remove_obj(serviceId,subServiceId,price,time)   
       }
    } catch (error) {
      console.log(error);
    }
  };


  const handleSlot=()=>{

    setSlotToggle(true)

  }
    



  const getCurrentAndFutureDates = () => {
    const today = new Date();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Get current day and date

    
    // Generate next few dates
    let futureDates = [];
    for (let i = 0; i <daysOfWeek.length; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);  // Add i days to the current date
      const futureDay = daysOfWeek[nextDate.getDay()]; // Get day of the week
    const futureDate = nextDate.getDate(); // Get the date of the month
    const month = nextDate.getMonth() + 1;
    const year = nextDate.getFullYear();
    futureDates.push({ day: futureDay, date: futureDate, month: month,year:year });
    }
    
    return futureDates;
  };

  


  const [timeSlots, setTimeSlots] = useState(() => {
    const futureDates = getCurrentAndFutureDates();
    return futureDates.map((date) => ({
      day: date.day,
      date: date.date,
      month:date.month,
      year:date.year,
      times: ["09:00 AM", "10:00 AM", "11:00 AM"],
    }));
  });

// Log timeSlots when it updates



const handleSelectDate=async(day,date)=>{
  setDate(prev=>({...prev,day:day,date:date}))
setLoading(true)
  const response=await axios.get(`${apiUrl}/time/get_time?day=${day}`,{
    withCredentials: true, 
  });
  const data=await response.data;
  setTimeToggle(true);
  const time=data.data.times
  console.log(data)

  const filterPassTime=(times)=>{
    const now=new Date();
    const currentDay=now.getDate();
    const currentHours=now.getHours();
    const currentMinutes=now.getMinutes();

    return times.filter(timeSlot=>{
      const [time,period]=timeSlot.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      if(currentDay===date){
      return   hours > currentHours || (hours === currentHours && minutes >= currentMinutes);
      }
      else{
       return times
      }

    })
  }


  setTime(filterPassTime(time))
  if(data.statusCode===200){
    setLoading(false)
  }
  
}

const handleSelectTime=(time)=>{

  setDate(prev=>({...prev,time:time}));
  setSlotToggle(false);
  
  setTimeEditToggle(true)
}
useEffect(()=>{
  if(date.day!==""&&date.date!==""&&date.time!==""){
    setTimeEditToggle(true)
    }
 if(date.time==""){
  setTimeEditToggle(false)
 }

},[date]);



const handlePay = async (amount,allItem,date) => {
  try {
    const month=timeSlots.filter(item=>item.date==date.date&&date.day==item.day)[0].month
    const year=timeSlots.filter(item=>item.date==date.date&&date.day==item.day)[0].year
    const formateDate=`${year}-${month}-${date.date} ${date.time}`
    console.log(formateDate);
    const { data } = await axios.post(`${apiUrl}/payment/orderId`, {
      amount: amount * 100, // Amount in paise (Razorpay expects amount in paise)
      receipt: `receipt_${Date.now()}`,
    });


    const options = {
      key: RAZORPAY_KEY_ID,
      amount: data.data.amount,
      currency: data.data.currency,
      name: "Fixlet Fast",
      order_id: data.data.id,
      handler: async (response) => {
        // Send payment details to backend for verification
        try {
          setPaymentLoading(true);

          await axios.post(`${apiUrl}/payment/verify_payment`, {
            visitationFee,
            taxFee,
  
            categories,
            serviceType:checkOutItem?.serviceTypeName,
            serviceDetail:allItem,
            date:date,
            formateDate:formateDate,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          },{withCredentials:true}).then(res=>console.log(res))
          setEmpty(true)
          setAllItem(prev=>({}))
          setPaymentLoading(false) 
        } catch (error) {
          console.error("Error verifying payment:", error);
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: `${userInfo.fullName}`, // Prefill customer info
        email: userInfo?.email,
        contact: "9999999999",
      },
      theme: {
        color: "#f97316",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    alert("Payment initialization failed!");
  }
};


  
  return (<>{checkOutItemLoading?<><Loader/></>:emptyCart||!checkOutItem?<EmptyCartItem city={city} categories={categories} />:
<>{paymentLoading?<PaymentLoading/>:
    <main className='md:pt-24 pt-5 w-full flex  justify-center  md:px-20'>
      

{slotToggle&&
      <div className='fixed  z-20 px-5 bg-opacity-50 left-0 top-0 justify-center items-center bg-black flex w-full h-screen '>

              <div className=' border-1 rounded  md:w-1/2   backdrop-blur-lg bg-opacity-10 '>
              
                  <button onClick={()=>setSlotToggle(false)} className='bg-white rounded-full p-1 mb-2 absolute right-0  -top-10 translate-y-0'><IoCloseOutline size={20}/></button>
                  <div className='rounded border-gray-600  shadow p-5 bg-white'>


                    <div>
                      <div>
                        <h1 className='text-lg font-semibold'>When should the professional arrive?</h1>
                        <p className="text-gray-700 text-base">
  {`Service will take approx. ${
    allItem?.totalTime >= 60
      ? `${Math.floor(allItem?.totalTime / 60)} hr${
          allItem?.totalTime % 60 !== 0 ? ` ${allItem?.totalTime % 60} min` : ""
        }`
      : `${allItem?.totalTime} min`
  }`}
</p>
                      
                               <div className='grid grid-cols-2 md:grid-cols-4 md:h-max h-40 overflow-auto custom-scrollbar w-full mt-5 gap-5 '>{
                            timeSlots?.map((time)=>{
                              return(                    
                                  <button key={time.date} onClick={()=>handleSelectDate(time.day,time.date)} className={`flex  ${date.day===time.day?"bg-orange-50":""} flex-col gap-1 justify-center items-center border-2 hover:bg-orange-50 px-4 py-1 rounded`}>
                                  <span className='md:text-lg text-base font-semibold'>{time.day}</span>
                                  <span className='md:text-sm text-base'>{time.date} </span>
                                  </button>
                              )
                            })
                          }</div>
                        
                      </div>
                      {timeToggle&&
                      <>
                      <hr className='my-5 h-0.5 bg-gray-500'></hr>
                      <h1 className='mb-5'>Time available :</h1>
                      <div className=''>
                        {loading?<div className="relative flex flex-col items-center">
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
      </div>:
                      
                          <ul className="grid grid-cols-2 w-full  md:grid-cols-4 md:h-max custom-scrollbar h-36 overflow-auto gap-4">
                            {time.length===0?<>
                              <div className=" text-red-700  w-max   rounded-lg text-center">
      ⏳ No time slots are available for the selected date. Please choose a different Date.
    </div>
                            </>:<>
 {time?.map((time, index) => {
   return (
     <button
       key={index}
       onClick={() => handleSelectTime(time)}
       className="flex flex-col gap-1 justify-center items-center border-2 hover:bg-orange-50 px-4 py-1 rounded"
     >
       <span className="md:text-lg text-base font-semibold">{time}</span>
     </button>
   );
 })}
 </>}
</ul>
}
                          
                      </div>
                      </>
}
                      <div></div>
                    </div>

                      
                  </div>
              </div>
      </div>
}







      <div className='w-4/5 hidden md:flex justify-between gap-5'>
        <div className='w-full px-2 flex flex-col gap-5'>
          {}
          <div className='bg-green-200 px-5 rounded-lg py-4'><p className=' text-center text-green-800 font-medium text-xs'>{`You'`} {offers[0]?.offerDescription}</p></div>


          <div className='border bg-gray-50 rounded-lg  flex flex-col'>
          <div className='flex  items-center gap-4  px-3 py-4 ' >
            <IoIosMail className='text-gray-600 ' size={30}/><p className='flex flex-col'><span className="text-base font-semibold text-gray-800">Send booking detail to</span><span className='text-sm font-normal text-gray-600'>{userInfo?.email}</span></p>
          </div>
          <hr className=' my-2 bg-gray-500'/>
          <div className='flex w-full items-center justify-between gap-4 py-4 pr-2 ' >
           <div className='flex w-full px-2 flex-col'> <Location/></div>
          </div>
          
          <hr className=' my-2 bg-gray-500'/>

          <div className=' flex items-center gap-4 px-2 py-4 ' >
            <div className='flex flex-col w-full' >
              <div className='flex justify-between items-center gap-2 pr-2'>
                <div className='flex items-center gap-2'>
            <div><IoTime className='text-gray-600 ' size={25}/></div><p className='flex'>{date.day!==""&&date.date!==""&&date.time!==""?`${date.day}: ${date.date} Time: ${date.time}`:"Select Slot"}</p></div>
            {timeEditToggle&&
            <button onClick={()=>{setSlotToggle(true)
              setDate({...date,  day:"",
                date:"",
                time:""})
            }} className='px-5 py-2 bg-gray-100 rounded-lg border-2 border-gray-400 hover:bg-gray-200 font-semibold'>Edit</button>
            }
              </div>
              {!timeEditToggle&&
            <div className='pt-2'>       
          <button onClick={handleSlot} className='text-base font-semibold w-full rounded py-2 hover:bg-orange-600 text-white bg-orange-500'> Select Slot  </button>  
          </div>
          }
          </div>
          </div>
          <hr className=' mt-2  bg-gray-500'/>
          <div className='relative'>
            {!timeEditToggle&&
          <div className='absolute w-full h-full opacity-60 top-0 rounded-b bg-gray-200 '></div>

            }
          <div className='flex  items-center gap-4 px-3 py-4 ' >
            <div><MdPayments className='text-gray-600 ' size={25}/></div><p>Payment method</p>
          </div>
          {timeEditToggle&&
          <div className='pt-2 px-2 pb-2'>       
          <button onClick={()=>handlePay((allItem?.totalPrice+visitationFee+taxFee||0),allItem,date)} className='text-base font-semibold w-full rounded py-2 hover:bg-orange-600 text-white bg-orange-500'> Proceed to pay  </button>  
          </div>
}
          </div>
          </div>
          
          <div className=''>
            <h1 className='text-lg font-semibold text-gray-800'>Cancellation policy</h1>
            <p className='text-gray-600'>Free cancellations if done more than 12 hrs before the service or if a professional isn’t assigned. A fee will be charged otherwise.</p>
            <button className="text-base underline font-semibold " onClick={() => setModalOpen(true)}>Read full policy</button>
          </div>
<div>
          <CancellationPolicyModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>

        </div>


        <div className='w-full flex flex-col gap-5 '>
          <div>
            {<>
              <h1 className='text-3xl mb-2 font-semibold text-gray-700'>{checkOutItem?.serviceTypeName}</h1>
            <div style={allItem?.productDetails?.length>4?{overflow:"auto",height:"320px"}:{overflow:"hidden"}} className='flex custom-cartScroll  flex-col gap-2'>{allItem?.productDetails?.map((item)=>{
              return(
              
                

                    <div key={item?.subService.subServiceId} className='flex justify-between border-2 px-5 py-2 rounded'>
                        <div><span>{item?.subService.subServiceName}</span></div>
                        <div>
                            <div>    
                                <span className='flex justify-center items-center'><FaIndianRupeeSign size={15} className='text-gray-800' /> {item?.subService.totalPrice}</span>
                            </div>
                            <div className={`flex items-center w-20 border bg-orange-100 border-orange-500 rounded mt-2 justify-between`}>
                            <button  onClick={() => handleAddServices(item.serviceId, item?.subService.subServiceId,item?.subService,(item?.subService.totalPrice/item?.subService.quantity),(item?.subService.serviceTime/item?.subService.quantity))} className="text-sm font-semibold text-orange-500 hover:bg-orange-300 hover:text-white px-2">+</button>
                
                                    <span className="text-sm font-semibold text-orange-500">{item?.subService.quantity}</span>
                
                                    <button onClick={()=>handleSubServices(item.serviceId,item?.subService.subServiceId,item?.subService,(item?.subService.totalPrice/item?.subService.quantity),(item?.subService.serviceTime/item?.subService.quantity))} className="text-sm font-semibold text-orange-500 px-2 hover:bg-orange-300 hover:text-white">-</button>
                                    </div>
                        </div>
                    </div>



              )
            })}</div>
            </>
            }
          </div>
          <div className='rounded-lg border'>
            <h1 className='px-5 py-2 text-lg font-medium text-gray-700'>Payment summary</h1>
            <ul className='flex gap-2 flex-col px-4 mt-2'>
              <li className='flex justify-between px-2'><span className='underline decoration-dotted text-gray-800'>total item</span><span className='flex items-center decoration-dotted'><LuIndianRupee className='text-gray-800' size={12} />{allItem?.totalPrice}</span></li>
              {visitationFee&&<> <li className='flex justify-between px-2'><span className='underline decoration-dotted text-gray-800'>Visitation Fee</span><span className='flex items-center decoration-dotted'><LuIndianRupee className='text-gray-800' size={12} />{visitationFee}</span></li></>}
              <li className='flex justify-between px-2'><span className='underline decoration-dotted text-gray-800'>Tax & Fee</span><span className='flex items-center decoration-dotted'><LuIndianRupee className='text-gray-800' size={12} />{taxFee}</span></li>
            </ul> 
            <hr className='h-0.5 bg-gray-500 my-2'/>
            <div className='px-4'>
              <p className='flex justify-between px-2 text-lg font-medium py-2 text-gray-800'><span>Total Price</span><span className='flex items-center'><LuIndianRupee className='text-gray-800' size={15} />{allItem?.totalPrice+visitationFee+taxFee||0}</span></p>
            </div>
          </div>
        </div>



      </div>
      
      <div className='w-full md:hidden block'>
      <div className='w-full flex pb-10 flex-col gap-5 '>
          <div>
            {<>
              <h1 className='text-xl px-2 mb-2 font-semibold text-gray-700'>{checkOutItem?.serviceTypeName}</h1>
            <div style={allItem?.productDetails?.length>4?{overflow:"auto",height:"320px"}:{overflow:"hidden"}} className='flex custom-cartScroll  flex-col gap-2'>{allItem?.productDetails?.map((item)=>{
              return(
              
                

                    <div key={item?.subService.subServiceId} className='flex justify-between border-2 px-5 py-2 '>
                        <div><span>{item?.subService.subServiceName}</span></div>
                        <div>
                            <div>    
                                <span className='flex justify-center items-center'><FaIndianRupeeSign  /> {item?.subService.totalPrice}</span>
                            </div>
                            <div className={`flex items-center w-20 border bg-orange-100 border-orange-500 rounded mt-2 justify-between`}>
                            <button  onClick={() => handleAddServices(item.serviceId, item?.subService.subServiceId,item?.subService,(item?.subService.totalPrice/item?.subService.quantity),(item?.subService.serviceTime/item?.subService.quantity))} className="text-sm font-semibold text-orange-500 hover:bg-orange-300 hover:text-white px-2">+</button>
                
                                    <span className="text-sm font-semibold text-orange-500">{item?.subService.quantity}</span>
                
                                    <button onClick={()=>handleSubServices(item.serviceId,item?.subService.subServiceId,item?.subService,(item?.subService.totalPrice/item?.subService.quantity),(item?.subService.serviceTime/item?.subService.quantity))} className="text-sm font-semibold text-orange-500 px-2 hover:bg-orange-300 hover:text-white">-</button>
                                    </div>
                        </div>
                    </div>



              )
            })}</div>
            </>
            }
          </div>
          <div className='rounded-lg border'>
            <h1 className='px-5 py-2 text-lg font-medium text-gray-700'>Payment summary</h1>
            <ul className='flex gap-2 flex-col px-4 mt-2'>
              <li className='flex justify-between px-2'><span className='underline decoration-dotted text-gray-800'>total item</span><span className=' decoration-dotted'>{allItem?.totalPrice}</span></li>
              <li className='flex justify-between px-2'><span className='underline decoration-dotted text-gray-800'>Visitation Fee</span><span className=' decoration-dotted'>{visitationFee}</span></li>
              <li className='flex justify-between px-2'><span className='underline decoration-dotted text-gray-800'>Tax & Fee</span><span className=' decoration-dotted'>{taxFee}</span></li>
            </ul> 
            <hr className='h-0.5 bg-gray-500 my-2'/>
            <div className='px-2'>
            <div className='bg-green-200 px-5 rounded py-2'><p className=' text-center text-green-800 font-medium text-xs'>{`You'`} re saving total ₹60 on this order! .</p></div>
            </div>
            <div className='px-4'>
              <p className='flex justify-between px-2 text-lg font-medium py-2 text-gray-800'><span>Total Price</span><span>{allItem?.totalPrice+visitationFee+taxFee||0}</span></p>
            </div>
          </div>
        </div>


        <div className='fixed z-10 h-max py-2 border-t shadow-[0px_-4px_10px_rgba(0,0,0,0.1)] border-gray-100  w-full px-1  bottom-0  bg-white  '>
          <div>
            <div className='flex items-center px-2'><p className='text-xs '>{userInfo?.location}</p><span className='text-orange-500 border-2 px-2 py-1 rounded-lg border-gray-400'>Edit</span></div>
            <div>
              <button onClick={handleSlot} className='w-full py-2 rounded-lg font-semibold text-base text-white mt-2 bg-orange-500'>Select Slot</button>
            </div>
          </div>

        </div>
      </div>
    </main>
  
    }</>}</>
  )
}

export default BookingPage