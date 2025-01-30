import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { NavLink } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import { fetchUser } from '../app/Actions/user_action';
import axios from 'axios';
import Cookies from "js-cookie"
import {logout} from "../app/user.redux"
import logo from "../assets/Symbol-01.png"
import { FaIndianRupeeSign } from "react-icons/fa6";
import Loader from "../component/Loader"
const apiUrl=import.meta.env.VITE_BACKEND_API_URL



function PaymentHistory() {
  let [offset,setOffset]=useState(0)
  const limit=5;
  const[removeButton,setButton]=useState(false)
  const [paymentData,setPaymentData]=useState({});
  const dispatch=useDispatch()
  const {isLogin,userInfo,isLoading}=useSelector((state)=>state.user);
  const navigate=useNavigate();

  useEffect(()=>{
    axios.get(`${apiUrl}/payment/payment_history`,{withCredentials:true}).then((response)=>response.data).then((data)=>setPaymentData(data.data[0]))
    dispatch(fetchUser)
    dispatch(fetchUser())
  },[dispatch]);

  const handelLogout=(e)=>{
    e.preventDefault()
    axios.post(`${apiUrl}/user/user_logout`,{},{
     withCredentials:true
   }).then((response)=>{
     if(response.status===200){
     Cookies.remove('accessToken')
     Cookies.remove('refresh_token')
     dispatch(logout())
     navigate("/"); // Redirect to the home page

     }
     else{
       console.log("logout failed")
     }
   })
 }


const handleLoadMore = () => {
  setOffset((prevOffset) => prevOffset + limit); // Increase offset
  fetchPaymentHistory();
};


const fetchPaymentHistory = () => {
  offset==0?offset=5:offset=offset+limit
  if(offset>paymentData.Entries.length){
    setButton(true) 
    return
  }
  axios
    .get(`${apiUrl}/payment/payment_history?skip=${offset}&limit=${limit}`, { withCredentials: true })
    .then((response) =>{
setPaymentData({...paymentData,Entries:[...paymentData.Entries,...response.data.data[0].Entries]})
    }
    )
    .catch((error) => {
      console.error('Error fetching more payments:', error)});
};
console.log(userInfo)

  return (
    <>
    {isLoading&&!Object.hasOwn(paymentData,"Entries")?
    <Loader/>:
    <div>
      
      <div className='fixed w-full z-10'>
              <nav className='bg-black flex justify-between px-10 py-1'>
        <div>
            <Link to={"/"}>  
              <img className='w-14' src={logo} alt='logo'></img>
            </Link>
          </div>
          <ul className='flex  items-center text-white text-xl gap-8 font-semibold'>
              <li>
                <NavLink to="/helpCenter" className={({ isActive }) => `relative text-lg text-white ${isActive ? "decoration-solid after:w-full after:left-0 after:translate-x-0" : "after:left-1/2 after:translate-x-[-50%]"} py-2 hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`}>
                  Help center
                </NavLink>
              </li>
              <li>
              <NavLink to={"/myBooking"} className={({ isActive }) => `relative text-lg text-white ${isActive ? "decoration-solid after:w-full after:left-0 after:translate-x-0" : "after:left-1/2 after:translate-x-[-50%]"} py-2 hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`} >
                My Booking
                </NavLink>
              </li>
              <li>
              <button onClick={handelLogout} className={`relative text-white text-lg after:left-1/2 after:translate-x-[-50%] py-2 hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`}to="/store">
                   Logout-{userInfo?.fullName}
              </button>

              </li>
            </ul>

        </nav >
        </div>
        <div className='pt-20'>
          <div className='flex items-center justify-between px-10'>
        <h1 className='text-3xl font-semibold text-gray-800'>Payment History</h1>
        <p className='flex items-center gap-2'><span className='text-lg font-medium text-gray-600'>Total amount</span><span className='flex gap-0.5 text-gray-600 items-center'><FaIndianRupeeSign className='text-gray-600' />{paymentData?.totalAmountPay}</span></p>
        </div>





        <div className='px-20 mt-10'>
  {paymentData.Entries?.map((entry, index) => (
    <div key={index} className="mb-8">
      <div className='flex gap-2 items-center mb-2'>
        <span className="text-xl font-semibold ">Entry {index + 1}</span>
        <span className='text-green-500 font-medium'> {new Date(entry.createdAt).toLocaleDateString()}</span>
      </div>
      <table className=" w-full bg-white border border-gray-200 rounded-lg ">
        <thead>
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
            service?.subService?.map((subService,i) => (
              <tr key={i} className="hover:bg-gray-50 text-center">
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
  
  ))}
</div>







{!removeButton&&<div className='w-full justify-center flex'><button className='border-2 rounded-lg mb-5 hover:bg-gray-100 text-lg font-semibold text-gray-700 px-4 py-2' onClick={handleLoadMore}>Load more</button></div>}



        </div>
    </div>
    }
    </>
  )
}

export default PaymentHistory