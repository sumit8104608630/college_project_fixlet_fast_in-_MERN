import React from 'react'
import { useNavigate, useSearchParams } from 'react-router';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { IoIosMail } from "react-icons/io";
import CancellationPolicyModal from "../component/static/CancellationPolicyModal.jsx"
import { IoArrowBack, IoTime } from "react-icons/io5";
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
import { Link } from 'react-router';
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

   const handleGoBack = () => {
        navigate(-1); // Go back to previous page
    }
  
  return (
    <>
           <div className=' w-full top-0  md:hidden fixed bg-white shadow-sm border-b z-10'>
                            <div className='px-4 sm:px-6 lg:px-20 py-4'>
                                <div className='flex items-center gap-4'>
                                    <button 
                                        onClick={handleGoBack}
                                        className='flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100'
                                    >
                                        <IoArrowBack size={25} />
                                    </button>
                                </div>
                            </div>
                        </div>
      {checkOutItemLoading ? (
        <Loader />
      ) : emptyCart || !checkOutItem ? (
        <>
        <EmptyCartItem city="Mumbai" categories={categories} />
     
        </>
      ) : (
        <>
          {paymentLoading ? (
            <PaymentLoading />
          ) : (
            <div className="min-h-screen md:mt-0 mt-16 bg-gray-50">
              {/* Slot Selection Modal */}
              {slotToggle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                  <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Select Time Slot</h2>
                      <button
                        onClick={() => setSlotToggle(false)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <IoCloseOutline size={24} />
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">When should the professional arrive?</h3>
                        <p className="text-gray-600">
                          Service will take approx. {
                            allItem?.totalTime >= 60
                              ? `${Math.floor(allItem?.totalTime / 60)} hr${
                                  allItem?.totalTime % 60 !== 0 ? ` ${allItem?.totalTime % 60} min` : ""
                                }`
                              : `${allItem?.totalTime} min`
                          }
                        </p>
                      </div>
                      
                      {/* Date Selection */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {timeSlots?.map((timeSlot) => (
                          <button
                            key={timeSlot.date}
                            onClick={() => handleSelectDate(timeSlot.day, timeSlot.date)}
                            className={`p-4 border-2 rounded-lg text-center transition-colors ${
                              date.day === timeSlot.day
                                ? "border-orange-500 bg-orange-50 text-orange-600"
                                : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                            }`}
                          >
                            <div className="font-medium">{timeSlot.day}</div>
                            <div className="text-sm text-gray-600">{timeSlot.date}</div>
                          </button>
                        ))}
                      </div>
                      
                      {/* Time Selection */}
                      {timeToggle && (
                        <div>
                          <hr className="my-6" />
                          <h3 className="text-lg font-medium mb-4">Available Times</h3>
                          {loading ? (
                            <div className="text-center py-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                              <p className="mt-2 text-orange-500">Please wait</p>
                            </div>
                          ) : time.length === 0 ? (
                            <div className="text-center py-8 text-red-600">
                              ⏳ No time slots available for the selected date. Please choose a different date.
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {time.map((timeSlot, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSelectTime(timeSlot)}
                                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                                    date.time === timeSlot
                                      ? "border-orange-500 bg-orange-50 text-orange-600"
                                      : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                                  }`}
                                >
                                  {timeSlot}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Main Content */}
              <div className="container mx-auto px-4 py-6 lg:py-12">
                <div className="max-w-6xl mx-auto">
                  {/* Mobile: Stack vertically, Desktop: Side by side */}
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    
                    {/* Left Column - Booking Details */}
                    <div className="flex-1 space-y-6">
                      {/* Offer Banner */}
                      <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                        <p className="text-center text-green-800 font-medium text-sm">
                          You {offers[0]?.offerDescription}
                        </p>
                      </div>

                      {/* Booking Information Card */}
                      <div className="bg-white rounded-lg shadow-sm border">
                        {/* Email Section */}
                        <div className="p-4 flex items-center gap-3">
                          <IoIosMail className="text-gray-500 flex-shrink-0" size={24} />
                          <div>
                            <p className="font-medium text-gray-800">Send booking details to</p>
                            <p className="text-sm text-gray-600">{userInfo?.email}</p>
                          </div>
                        </div>

                        <hr className="border-gray-200" />

                        {/* Location Section */}
                        <div className="p-4">
                          <Location />
                        </div>

                        <hr className="border-gray-200" />

                        {/* Time Slot Section */}
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <IoTime className="text-gray-500 flex-shrink-0" size={24} />
                              <div>
                                <p className="font-medium text-gray-800">Service Time</p>
                                <p className="text-sm text-gray-600">
                                  {date.day && date.date && date.time
                                    ? `${date.day}: ${date.date}, ${date.time}`
                                    : "Select time slot"}
                                </p>
                              </div>
                            </div>
                            {timeEditToggle && (
                              <button
                                onClick={() => {
                                  setSlotToggle(true);
                                  setDate({ day: "", date: "", time: "" });
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                          {!timeEditToggle && (
                            <button
                              onClick={handleSlot}
                              className="w-full mt-4 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                            >
                              Select Time Slot
                            </button>
                          )}
                        </div>

                        <hr className="border-gray-200" />

                        {/* Payment Section */}
                        <div className={`p-4 ${!timeEditToggle ? 'opacity-50 pointer-events-none' : ''}`}>
                          <div className="flex items-center gap-3 mb-4">
                            <MdPayments className="text-gray-500 flex-shrink-0" size={24} />
                            <p className="font-medium text-gray-800">Payment Method</p>
                          </div>
                          {timeEditToggle && (
                            <button
                              onClick={() => handlePay(
                                (allItem?.totalPrice + visitationFee + taxFee || 0),
                                allItem,
                                date
                              )}
                              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                            >
                              Proceed to Pay ₹{allItem?.totalPrice + visitationFee + taxFee || 0}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Cancellation Policy */}
                      <div className="bg-white rounded-lg shadow-sm border p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Cancellation Policy</h3>
                        <p className="text-gray-600 mb-3">
                          Free cancellations if done more than 12 hrs before the service or if a professional isn't assigned. A fee will be charged otherwise.
                        </p>
                        <button
                          className="text-orange-500 font-medium underline hover:text-orange-600"
                          onClick={() => setModalOpen(true)}
                        >
                          Read full policy
                        </button>
                      </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="w-full lg:w-96 space-y-6">
                      {/* Service Details */}
                      <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-4 border-b">
                          <h2 className="text-xl font-semibold text-gray-800">
                            {checkOutItem?.serviceTypeName}
                          </h2>
                        </div>
                        
                        <div className="max-h-80 overflow-y-auto">
                          {allItem?.productDetails?.map((item) => (
                            <div key={item?.subService.subServiceId} className="p-4 border-b last:border-b-0">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="font-medium text-gray-800 flex-1 mr-2">
                                  {item?.subService.subServiceName}
                                </h4>
                                <div className="text-right">
                                  <div className="flex items-center text-gray-800 font-medium">
                                    <FaIndianRupeeSign size={14} />
                                    <span className="ml-1">{item?.subService.totalPrice}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center border border-orange-300 rounded-lg overflow-hidden">
                                  <button
                                    onClick={() => handleSubServices(
                                      item.serviceId,
                                      item?.subService.subServiceId,
                                      item?.subService,
                                      (item?.subService.totalPrice / item?.subService.quantity),
                                      (item?.subService.serviceTime / item?.subService.quantity)
                                    )}
                                    className="px-3 py-1 text-orange-500 hover:bg-orange-50 transition-colors"
                                  >
                                    -
                                  </button>
                                  <span className="px-3 py-1 text-orange-500 font-medium min-w-[2rem] text-center">
                                    {item?.subService.quantity}
                                  </span>
                                  <button
                                    onClick={() => handleAddServices(
                                      item.serviceId,
                                      item?.subService.subServiceId,
                                      item?.subService,
                                      (item?.subService.totalPrice / item?.subService.quantity),
                                      (item?.subService.serviceTime / item?.subService.quantity)
                                    )}
                                    className="px-3 py-1 text-orange-500 hover:bg-orange-50 transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-4 border-b">
                          <h3 className="text-lg font-medium text-gray-800">Payment Summary</h3>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          <div className="flex justify-between text-gray-600">
                            <span>Service Total</span>
                            <span>₹{allItem?.totalPrice}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Visitation Fee</span>
                            <span>₹{visitationFee}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Tax & Fees</span>
                            <span>₹{taxFee}</span>
                          </div>
                        </div>
                        
                        <hr className="border-gray-200" />
                        
                        <div className="p-4">
                          <div className="bg-green-100 border border-green-200 rounded-lg p-3 mb-4">
                            <p className="text-center text-green-800 font-medium text-sm">
                              You're saving total ₹60 on this order!
                            </p>
                          </div>
                          
                          <div className="flex justify-between text-lg font-semibold text-gray-800">
                            <span>Total Amount</span>
                            <span>₹{allItem?.totalPrice + visitationFee + taxFee || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancellation Policy Modal */}
              <CancellationPolicyModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default BookingPage