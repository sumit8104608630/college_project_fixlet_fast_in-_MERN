import React,{useEffect, useState} from 'react'
import { Link } from 'react-router';
import logo from "../assets/Symbol-01.png"
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { fetchUser } from '../app/Actions/user_action';
import Cookies from "js-cookie"
import OtpInput from "../component/OtpInput.jsx"
import {logout} from "../app/user.redux"
import  axios  from 'axios';
import { FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import { FaArrowLeftLong } from "react-icons/fa6";
import Swal from "sweetalert2"

const apiUrl=import.meta.env.VITE_BACKEND_API_URL


function ForgotPassword() {
  const dispatch=useDispatch()
  const [errorMessage,setError]=useState(false)
  const {isLogin,userInfo,isLoading}=useSelector((state)=>state.user);
const navigate = useNavigate();

    const [step, setStep] = useState(false); 
const [toggleVerify,setToggleVerify]=useState(false)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formData,setData]=useState({
      email:"",
      fullName:"",
      password:"",
    });
const [buttonToggle,setButtonToggle]=useState(false)
const [toggle,setToggle]=useState(false)

    useEffect(()=>{
      setData({...formData,fullName:userInfo?.fullName||""})
      dispatch(fetchUser())
    },[dispatch,userInfo?.fullName,])


    const onChange=(e)=>{
      e.preventDefault()
      const {name,value}=e.target;
     
      setData({...formData,[name]:value});
    }


    const handleEmailSubmit =async (e) => {
      e.preventDefault();
      // let send the otp
      console.log(formData)
      if(formData.email.length>0){
      setButtonToggle(true)
      }
      const response=await fetch(`${apiUrl}/user/user_otp`,
        {
          method: 'POST',
          body:JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials:"include"
        },
     
     

      )

      const data=await response.json();
      console.log(data)
      if(data.statusCode===200){
                Swal.fire({
                  title: data.message,
                  icon: "success",
                  confirmButtonColor: "#f97316", // Black color
                  confirmButtonText: "OK",
                  draggable: true
                });
        setToggle(true)
      }
     
     // Simulate sending OTP
   
    };
  
useEffect(()=>{
  if(formData.email.length==0){
    setButtonToggle(false)
    setToggle(false)
  }

},[formData.email])

  

    const handlePasswordSubmit = async(e) => {
      e.preventDefault();
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
      if (formData.password !== confirmPassword) {
        setError("password not match");
        return;
      }
      if(!passwordRegex.test(formData.password)){
        setError("Password must be at least 8 characters long, include one number, and one special character.")
        return
      }
      const obj={
        email:formData.email,
        fullName:formData.fullName,
        password:formData.password
      }
      console.log(obj)
     const response =await fetch(`${apiUrl}/user/change_password`,    {
      method: 'POST',
      body:JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:"include"
    },);
     const data=await response.json()
     if(data.statusCode===200){
      alert("Password changed successfully!");
      navigate("/login"); // Reset form
     }
      
    };


    const handelverifyOtp=async(otp)=>{
      setToggle(false)
      setToggleVerify(true);
      const email=formData.email;
      console.log(otp)

    const obj={
      email:email,
      otp:otp
    }
    const response=await fetch(`${apiUrl}/user/verify_user_otp`,{
      method:'POST',
      body:JSON.stringify(obj),
      headers:{
        'Content-Type':'application/json',

      },
      credentials: 'include'
    })
    const responseData=await response.json();
    console.log(responseData)
    if(responseData.statusCode===200 && responseData.success){
      Swal.fire({
        title: responseData.message,
        icon: "success",
        confirmButtonColor: "#f97316", // Black color
        confirmButtonText: "OK",
        draggable: true
      });
       setStep(true);
    }
    if(responseData.statusCode===404 ){
      Swal.fire({
        icon: "error",
        title: responseData.message,
         confirmButtonColor: "#f97316"
      });
    }

  }
  return (
<>{isLoading?<></>:
      <div className='min-h-screen  bg-gray-100 '>
       
        <div className="flex flex-col items-center justify-center w-full px-4  text-gray-700">
           
        <div className=" max-w-md mt-5 p-6 w-full  ">
        <div className='mb-5'>
             <Link to={"/login"}>
                    <FaArrowLeftLong className='' size={30}/>
            </Link>
            </div>
            <div className=' max-w-md p-6 w-full mt-28 bg-white border border-gray-300 rounded shadow-md'>
          {step === false && (
            <form onSubmit={handleEmailSubmit}>
              <h2 className="text-xl font-semibold mb-4">Enter Your Email</h2>
              <input
                name='email'
                type="email"
                className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
                placeholder="Enter your email"
                value={formData.email}
                onChange={onChange}
                required
              />
              {toggle&&
              <div className='pb-2'>
              <OtpInput length={4} email={formData.email} onclick={handelverifyOtp} />
              </div>}
           

              <button
                type="submit"
                className="w-full p-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                {buttonToggle?
                "ReSend"
                : "Send OTP"}
              </button>
            </form>
          )}
  
   
  
          {step === true && (
            <form onSubmit={handlePasswordSubmit}>
              <h2 className="text-xl text-gray-600 font-semibold mb-4">Change Password</h2>

              <input
              name='password'
                type="text"
                className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
                placeholder="Enter new password"
                value={formData.password}
                onChange={onChange}                required
              />
              <input
              name='confirmPassword'
                type="text"
                className="w-full p-2  border border-gray-400 rounded focus:outline-none"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
              />
              {errorMessage&&
              <span className='text-red-500 text-xs'>{errorMessage}</span>

              }
              <button
              
                type="submit"
                className="w-full p-2 mt-4 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Change Password
              </button>
            </form>
          )}
        </div>
        </div>
      </div>
      </div> 
}
      </>       
  )
}

export default ForgotPassword