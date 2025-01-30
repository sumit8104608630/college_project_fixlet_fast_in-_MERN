import React, { useEffect, useState } from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useSelector,useDispatch } from 'react-redux';
import {get_all_booking} from "../app/Actions/booking_action"
import {fetchCart} from "../app/Actions/cart_action.js"
import Loader from "../component/Loader"
import CancelBooking from '../component/CancelBooking';
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';
import { Link } from 'react-router';
import EmptyBooking from "../assets/emptyBooking.svg"
const apiUrl=import.meta.env.VITE_BACKEND_API_URL


function MyBooking() {
    const currDate=new Date()
    const {isLoading,userInfo}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const [bookingData,setBookingData]=useState({});
    const { bookingLoading, bookingAllData, bookingError } = useSelector(state => state.booking);
    const [cancelCart,setCancelCart]=useState(false);
    const [cancelBookId,setBookId]=useState(null)
    useEffect(() => {
        if (cancelCart) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [cancelCart]);
    

    useEffect(()=>{
        dispatch(get_all_booking())
      dispatch(fetchCart())
      return ()=>{
      }
    },[dispatch])
    useEffect(() => {
        if (bookingAllData) {
            setBookingData(bookingAllData)
        }
    },[bookingAllData])


    const handleCancelShow=(bookingId)=>{
        setCancelCart(true)
        setBookId(bookingId)
    }
    
    const handleCancelBooking=async(bookingId)=>{
        console.log(bookingId)
        try {
            setBookingData({...bookingAllData,Entries:bookingAllData.Entries.filter((item)=>item._id!==bookingId),totalAmountPay:bookingAllData.totalAmountPay-bookingAllData.Entries.filter((item)=>item._id==bookingId)[0].totalAmount    })

            await axios.post(`${apiUrl}/book/deleteBooking`,{bookingId},{withCredentials:true});
            setCancelCart(false)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>{bookingLoading&&isLoading?<Loader/>:

    <div className={`pt-20 ${cancelCart&&"overflow-hidden"} w-full`}>
        {cancelCart&&
        <div className='fixed z-20 px-5  justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen '>
            <div className='relative'>
                  <button onClick={()=>setCancelCart(false)} className='bg-white rounded-full p-1 mb-2 absolute right-0  top-0 translate-y-0'><IoCloseOutline size={20}/></button>
            
            <CancelBooking funCancelBooking={handleCancelBooking} bookId={cancelBookId} />
            </div>
        </div>
        }

        

            <div className='px-20 mt-10'>{!Object.hasOwn(bookingData,"Entries") ?
                  <div className='pt-20 w-full h-screen  flex justify-center'>
                  <div className='w-96 flex flex-col items-center'>
                  <img className='w-52' src={EmptyBooking}></img>
                  <h1 className='font-medium text-gray-800 text-lg mt-4'>No Bookings Yet!</h1>
                  <p className='text-center font-normal text-gray-700 mt-2 text-base'>
                    It looks like you haven't made any bookings yet. Explore our wide range of home services and schedule your first appointment today!
                  </p>
                  <Link to={`/`}state={{ headLine: 'Bed Bugs Control' }} className=" mt-2 text-orange-500 font-medium px-5 py-1 hover:bg-gray-50 rounded-lg border-2 text-lg">Explore Services</Link>        
                  </div>
              </div>
                :<>
      {bookingData.Entries?.map((entry, index) => (
        <div key={entry._id} className="mb-10">
          <div className='flex gap-2 items-center mb-1'>
            <span className="text-xl font-semibold ">Booking Date:</span>
            <span className='text-green-500 font-medium'> {new Date(entry.createdAt).toLocaleDateString()}</span>
          </div>
          <div className='flex gap-5 items-center mb-2'>
            <div className='flex items-end gap-1'>
            <span className="text-xl font-semibold ">Arrival Date & Time: </span>
            <span className={`text-green-500 ${currDate>new Date(entry.date)?"text-red-600":"text-green-600"} font-medium`}>
                {
                (()=>{
                    const currentDate=new Date();
                    const arrivalDate=new Date(entry.date);
                    if(currentDate>arrivalDate){
                        const delay = currentDate - arrivalDate; // Difference in milliseconds
                        const days = Math.floor(delay / (1000 * 60 * 60 * 24)); // Convert to days
                        const hours = Math.floor((delay / (1000 * 60 * 60)) % 24); // Convert to hours
                        const minutes = Math.floor((delay / (1000 * 60)) % 60);
                        if(days==0){
                            return `delay By :${hours} hours ${minutes} minutes`;
                        }
                        else{
                            return `delay By :${days} days ${hours} hours ${minutes} minutes`;
                        }
                    }
                    else{
                        return `${new Date(entry.date).toLocaleDateString()}  ${new Date(entry.date).toLocaleTimeString()} `;
                    }

                })()
      }
            </span>
            </div>
       

          </div>
          <table className="  mt-5 w-full bg-white border border-gray-200 ">
            <thead>
                <tr>
                    <th colSpan={5} className='text-end py-3  border px-2 '><div className='flex w-full justify-between pl-5 text-xl text-gray-800  font-medium'><div>{entry.serviceType}</div><div><button onClick={()=>handleCancelShow(entry._id)} className='text-lg mr-5 px-4 py-1 bg-red-600 rounded-full text-white font-medium'>Cancel</button><span className="text-lg font-medium px-4 py-1 rounded-full bg-amber-500 text-white">{entry.status}</span></div></div></th>
                </tr>
              <tr className='text-center '>
            
                <th className="py-3 text-center px-4 border-b  text-sm font-medium text-gray-700">Service Name</th>
                <th className="py-3 text-center px-4 border-b  text-sm font-medium text-gray-700">Sub-Service</th>
                <th className="py-3 text-center px-4 border-b  text-sm font-medium text-gray-700">Quantity</th>
                <th className="py-3 text-center  border-b  text-sm font-medium text-gray-700">Service Time</th>
                <th className="py-3 text-center px-4 border-b  text-sm font-medium text-gray-700">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {entry.products?.map((service) =>
                service?.subService?.map((subService) => (
                  <tr key={subService._id} className="hover:bg-gray-50 text-center">
                    <td className="py-3 text-center px-4 border-b text-sm text-gray-700">{service?.serviceName}</td>
                    <td className="py-3 text-center flex justify-center px-4 border-b text-sm text-gray-700">
                      <div className="flex gap-3 w-1/2 justify-between items-center">
                        <img
                          src={subService.subServiceImage}
                          alt={subService.subServiceName}
                          className="w-12 h-12 object-cover "
                        />
                        <span>{subService.subServiceName}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center px-4 border-b text-sm text-gray-700">{subService.quantity}</td>
                    <td className="py-3 text-center px-4 border-b text-sm text-gray-700">{subService.serviceTime} min</td>
                    <td className="py-3 text-center px-4 border-b text-sm text-gray-700">
                      <span className='flex justify-center items-center'>
                        <FaIndianRupeeSign />{subService.totalPrice}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="py-3 px-4 justify-center text-right font-semibold gap-2 text-gray-700 flex items-center">
                  <span>Total Amount</span>
                  <span className='flex items-center'><FaIndianRupeeSign />{entry.totalAmount}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        
      ))}</>
    }
    </div>



    </div>
}</>
  )
}

export default MyBooking