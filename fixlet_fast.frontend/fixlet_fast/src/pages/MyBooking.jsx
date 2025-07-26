import React, { useEffect, useState } from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoArrowBack, IoCloseOutline } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { get_all_booking } from "../app/Actions/booking_action"
import { fetchCart } from "../app/Actions/cart_action.js"
import Loader from "../component/Loader"
import CancelBooking from '../component/CancelBooking';
import { Link } from 'react-router';
import EmptyBooking from "../assets/emptyBooking.svg"
import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_API_URL

function MyBooking() {
    const currDate = new Date()
    const { isLoading, userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState({});
    const { bookingLoading, bookingAllData, bookingError } = useSelector(state => state.booking);
    const [cancelCart, setCancelCart] = useState(false);
    const [cancelBookId, setBookId] = useState(null)

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

    useEffect(() => {
        dispatch(get_all_booking())
        dispatch(fetchCart())
        return () => {
        }
    }, [dispatch])

    useEffect(() => {
        if (bookingAllData) {
            setBookingData(bookingAllData)
        }
    }, [bookingAllData])

    const handleCancelShow = (bookingId) => {
        setCancelCart(true)
        setBookId(bookingId)
    }

    const handleCancelBooking = async (bookingId) => {
        console.log(bookingId)
        try {
            setBookingData({
                ...bookingAllData,
                Entries: bookingAllData.Entries.filter((item) => item._id !== bookingId),
                totalAmountPay: bookingAllData.totalAmountPay - bookingAllData.Entries.filter((item) => item._id == bookingId)[0].totalAmount
            })

            await axios.post(`${apiUrl}/book/deleteBooking`, { bookingId }, { withCredentials: true });
            setCancelCart(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGoBack = () => {
        navigate(-1); // Go back to previous page
    }

    return (
        <>
            {bookingLoading && isLoading ? <Loader /> :
                <div className={`pt-16 sm:pt-20 ${cancelCart && "overflow-hidden"} w-full min-h-screen bg-gray-50`}>
                    {/* Back Button Header */}
                    <div className=' w-full top-0  md:hidden fixed bg-white shadow-sm border-b z-10'>
                        <div className='px-4 sm:px-6 lg:px-20 py-4'>
                            <div className='flex items-center gap-4'>
                                <button 
                                    onClick={handleGoBack}
                                    className='flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100'
                                >
                                    <IoArrowBack size={25} />
                                </button>
                                <h1 className='text-xl sm:text-2xl font-semibold text-gray-800'>My Bookings</h1>
                            </div>
                        </div>
                    </div>

                    {/* Cancel Modal */}
                    {cancelCart &&
                        <div className='fixed z-20 px-4 sm:px-5 justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen'>
                            <div className='relative w-full max-w-md'>
                                <button 
                                    onClick={() => setCancelCart(false)} 
                                    className='bg-white rounded-full p-2 mb-2 absolute -right-2 -top-2 z-30 shadow-lg'
                                >
                                    <IoCloseOutline size={20} />
                                </button>
                                <CancelBooking funCancelBooking={handleCancelBooking} bookId={cancelBookId} />
                            </div>
                        </div>
                    }

                    {/* Main Content */}
                    <div className='px-4 sm:px-6 lg:px-20 py-6 sm:py-10'>
                        {!Object.hasOwn(bookingData, "Entries") && !bookingLoading ?
                            <div className='pt-10 sm:pt-20 w-full min-h-[60vh] flex justify-center items-center'>
                                <div className='w-full max-w-md flex flex-col items-center px-4'>
                                    <img className='w-40 sm:w-52' src={EmptyBooking} alt="No bookings" />
                                    <h1 className='font-medium text-gray-800 text-lg sm:text-xl mt-4 text-center'>No Bookings Yet!</h1>
                                    <p className='text-center font-normal text-gray-700 mt-2 text-sm sm:text-base leading-relaxed'>
                                        It looks like you haven't made any bookings yet. Explore our wide range of home services and schedule your first appointment today!
                                    </p>
                                    <Link 
                                        to={`/`} 
                                        state={{ headLine: 'Bed Bugs Control' }} 
                                        className="mt-4 text-orange-500 font-medium px-6 py-2 hover:bg-orange-50 rounded-lg border-2 border-orange-500 text-base sm:text-lg transition-colors"
                                    >
                                        Explore Services
                                    </Link>
                                </div>
                            </div>
                            :
                            <div className='space-y-6 sm:space-y-10'>
                                {bookingData.Entries?.map((entry, index) => (
                                    <div key={entry._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                                        {/* Booking Header */}
                                        <div className='p-4 sm:p-6 bg-gray-50 border-b'>
                                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                                                <div>
                                                    <div className='flex flex-wrap gap-2 items-center mb-2'>
                                                        <span className="text-sm sm:text-base font-semibold text-gray-700">Booking Date:</span>
                                                        <span className='text-green-600 font-medium text-sm sm:text-base'>
                                                            {new Date(entry.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className='flex flex-wrap gap-2 items-center'>
                                                        <span className="text-sm sm:text-base font-semibold text-gray-700">Arrival:</span>
                                                        <span className={`font-medium text-sm sm:text-base ${currDate > new Date(entry.date) ? "text-red-600" : "text-green-600"}`}>
                                                            {
                                                                (() => {
                                                                    const currentDate = new Date();
                                                                    const arrivalDate = new Date(entry.date);
                                                                    if (currentDate > arrivalDate) {
                                                                        const delay = currentDate - arrivalDate;
                                                                        const days = Math.floor(delay / (1000 * 60 * 60 * 24));
                                                                        const hours = Math.floor((delay / (1000 * 60 * 60)) % 24);
                                                                        const minutes = Math.floor((delay / (1000 * 60)) % 60);
                                                                        if (days == 0) {
                                                                            return `Delayed: ${hours}h ${minutes}m`;
                                                                        } else {
                                                                            return `Delayed: ${days}d ${hours}h`;
                                                                        }
                                                                    } else {
                                                                        return `${new Date(entry.date).toLocaleDateString()} ${new Date(entry.date).toLocaleTimeString()}`;
                                                                    }
                                                                })()
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col sm:flex-row gap-2 sm:items-center'>
                                                    <button 
                                                        onClick={() => handleCancelShow(entry._id)} 
                                                        className='text-sm px-4 py-2 bg-red-600 rounded-full text-white font-medium hover:bg-red-700 transition-colors'
                                                    >
                                                        Cancel
                                                    </button>
                                                    <span className="text-sm px-4 py-2 rounded-full bg-amber-500 text-white font-medium text-center">
                                                        {entry.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Service Type Header */}
                                        <div className='px-4 sm:px-6 py-3 bg-blue-50 border-b'>
                                            <h3 className='text-lg sm:text-xl font-semibold text-gray-800'>{entry.serviceType}</h3>
                                        </div>

                                        {/* Mobile Card View */}
                                        <div className='block sm:hidden'>
                                            {entry.products?.map((service) =>
                                                service?.subService?.map((subService) => (
                                                    <div key={subService._id} className="p-4 border-b last:border-b-0">
                                                        <div className='flex gap-3 mb-3'>
                                                            <img
                                                                src={subService.subServiceImage}
                                                                alt={subService.subServiceName}
                                                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                                            />
                                                            <div className='flex-1 min-w-0'>
                                                                <h4 className='font-medium text-gray-800 mb-1'>{service?.serviceName}</h4>
                                                                <p className='text-gray-600 text-sm truncate'>{subService.subServiceName}</p>
                                                            </div>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-2 text-sm'>
                                                            <div>
                                                                <span className='text-gray-500 block'>Quantity</span>
                                                                <span className='font-medium'>{subService.quantity}</span>
                                                            </div>
                                                            <div>
                                                                <span className='text-gray-500 block'>Time</span>
                                                                <span className='font-medium'>{subService.serviceTime} min</span>
                                                            </div>
                                                            <div>
                                                                <span className='text-gray-500 block'>Price</span>
                                                                <span className='font-medium flex items-center'>
                                                                    <FaIndianRupeeSign className='mr-1' />
                                                                    {subService.totalPrice}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        {/* Desktop Table View */}
                                        <div className='hidden sm:block overflow-x-auto'>
                                            <table className="w-full">
                                                <thead>
                                                    <tr className='bg-gray-50'>
                                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Service</th>
                                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Sub-Service</th>
                                                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-b">Qty</th>
                                                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-b">Time</th>
                                                        <th className="py-3 px-4 text-right text-sm font-medium text-gray-700 border-b">Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {entry.products?.map((service) =>
                                                        service?.subService?.map((subService) => (
                                                            <tr key={subService._id} className="hover:bg-gray-50">
                                                                <td className="py-3 px-4 border-b text-sm text-gray-700">{service?.serviceName}</td>
                                                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                                                    <div className="flex items-center gap-3">
                                                                        <img
                                                                            src={subService.subServiceImage}
                                                                            alt={subService.subServiceName}
                                                                            className="w-12 h-12 object-cover rounded"
                                                                        />
                                                                        <span>{subService.subServiceName}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-4 border-b text-sm text-gray-700 text-center">{subService.quantity}</td>
                                                                <td className="py-3 px-4 border-b text-sm text-gray-700 text-center">{subService.serviceTime} min</td>
                                                                <td className="py-3 px-4 border-b text-sm text-gray-700 text-right">
                                                                    <span className='flex justify-end items-center'>
                                                                        <FaIndianRupeeSign className='mr-1' />
                                                                        {subService.totalPrice}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Total Amount Footer */}
                                        <div className='px-4 sm:px-6 py-4 bg-gray-50 border-t'>
                                            <div className='flex justify-between items-center'>
                                                <span className='font-semibold text-gray-700'>Total Amount</span>
                                                <span className='flex items-center font-semibold text-lg text-gray-800'>
                                                    <FaIndianRupeeSign className='mr-1' />
                                                    {entry.totalAmount}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default MyBooking