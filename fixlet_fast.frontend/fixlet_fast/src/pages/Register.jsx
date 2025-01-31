import React ,{useEffect, useRef, useState} from 'react'
import {IoMdEyeOff}from "react-icons/io"
import { IoEye } from "react-icons/io5";
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router';
import OtpInput from "../component/OtpInput"
const apiUrl=import.meta.env.VITE_BACKEND_API_URL
import Swal from "sweetalert2"


function Register() {



  const [toggle,setToggle]=useState(false);
  const [toggle2,setToggle2]=useState(false);
  const navigate=useNavigate()
  const [sendOtp,setSendOtp]=useState(false);
  const [otpInput,setOtpInput]=useState(false);
  const [verified, setVerified]=useState(false);
  const [errorMessage,setError]=useState("");
  const emailInput=useRef(null)
  const [confirmPasswordInput,setConfirmPassword]=useState()
  const [formData,setFormData]=useState({
    fullName:"",
    email:"",
    password:"",
  })



  const handelSubmit=async (e)=>{
    e.preventDefault()
    if(formData.password!=confirmPasswordInput){
      alert("password not match")
      return
    }
    if(formData.password.length<8 && confirmPasswordInput.length<8){
      alert("password must be 8 character")
      return
    }
    try{
      const response=await fetch(`${apiUrl}/user/user_register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
        credentials: 'include'
      })
      const data=await response.json()
      console.log(data)
      navigate("/login")
    }catch(err){
      console.log(err)
    }
  
  }
  const handelInput=(e)=>{
    e.preventDefault()
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
  }
  
  const confirmPassword=(e)=>{
    setConfirmPassword(e.target.value)
  }
  useEffect(()=>{
    window.scrollTo(0,0)
    if(formData.email.length>0){
      //console.log("yes")
      setError(false)
      setSendOtp(true)
    }else{
      setSendOtp(false)
      setOtpInput(false)

    }

  },[formData.email])



  
  const email=formData.email
  console.log(email)
  

  

  const handelSendOtp=async(email)=>{
    try {
      console.log(email)
      const obj={
        email:email
      }
      const response = await fetch(`${apiUrl}/user/user_otp`,{
        method: 'POST',
        body:JSON.stringify(obj),
        headers:{
          'Content-Type':'application/json',
        },
        credentials: 'include'

      })
      if(response.status===201){
        Swal.fire({
          title: "OTP send successfully!",
          icon: "success",
          confirmButtonColor: "#f97316", // Black color
          confirmButtonText: "OK",
          draggable: true
        });
        setOtpInput(true);
      }

      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }
    const handelverifyOtp=async(otp)=>{
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
        title: "OTP verify successfully!",
        icon: "success",
        confirmButtonColor: "#f97316", // Black color
        confirmButtonText: "OK",
        draggable: true
      });
      setVerified(responseData.success);
    }
    if(responseData.statusCode===404 ){
      Swal.fire({
        icon: "error",
        title: responseData.message,
         confirmButtonColor: "#f97316"
      });
      setVerified(false);
    }

  }
const handleEmailVerifiedMessage=()=>{
  setError("Please verify email")
  emailInput.current.focus()
}



  return (
    <div className='flex justify-center w-full'>
    <div className='w-2/3  md:w-1/3 shadow-gray-300 bg-gray-50 shadow-lg p-5 rounded-lg mt-36 mb-28 ' >
      <div className='flex justify-center text-gray-700 text-2xl font-semibold'><span>Sign Up</span></div>
      <form onSubmit={handelSubmit}>
        <div className='flex gap-1 flex-col mt-3'>
          <label>Username : </label>
          <input value={formData.userName} onChange={handelInput} className='border-2 focus:outline-none rounded-lg border-gray-300 px-5 py-1 '  type="text" placeholder='Full Name' name="fullName" required/>
        </div>
        <div className='flex gap-1 flex-col mt-3'>
          <label>Email : </label>
          <div className='flex gap-3'>
          <input value={formData.email} ref={emailInput} disabled={verified} onChange={handelInput} className='border-2 w-full focus:outline-none rounded-lg border-gray-300 px-5 py-1 ' type="email" placeholder='email@gmail.com' name="email" required/>
          {sendOtp&&<>
          {!verified?
          <button onClick={()=>handelSendOtp(formData.email)} className='w-1/4 font-semibold hover:bg-orange-600 text-white rounded-lg bg-orange-500'> Send OTP</button>:<button onClick={()=>setVerified(false)} className='w-1/2 font-semibold hover:bg-orange-600 text-white rounded-lg bg-orange-500'><span>Change mail</span></button>}</>}
          </div>
          {errorMessage&&<span className='text-red-500 text-xs font-medium'>{errorMessage}</span>}
        </div>

        <div className='flex w-full gap-1 flex-col mt-3'>
          {otpInput && !verified?
          <OtpInput length={4} email={formData.email} onclick={handelverifyOtp}/>
         :<div> </div>}


        </div>



        
        <div className='flex gap-1 flex-col mt-3 '>
          <label>PassWord : </label>
          <div className='border-2 bg-white flex px-5 py-1 w-full rounded-lg border-gray-300'>
          <input min={8} value={formData.password} onChange={handelInput} className='  focus:outline-none rounded-lg w-full'   type={toggle ? "text" : "password"} name="password" required/>
          <button type='button' className='text-xl text-center ' onClick={()=>setToggle(prev=>!prev)}>{toggle?<IoEye />:<IoMdEyeOff />}</button>
          </div>
        </div>
        <div className='flex gap-1 flex-col mt-3 '>
        <label>Confirm PassWord : </label>
        <div className='border-2 bg-white flex px-5 py-1 w-full rounded-lg border-gray-300'>
          <input min={8} onChange={confirmPassword} className='  focus:outline-none rounded-lg w-full'   type={toggle2 ? "text" : "password"} name="confirmPassword" value={confirmPasswordInput} required/>
          <button type='button' className='text-xl text-center ' onClick={()=>setToggle2(prev=>!prev)}>{toggle2?<IoEye />:<IoMdEyeOff />}</button>
          </div>
        </div>
        <div className='mt-5 relative'>
          {
            !verified&&<div onClick={handleEmailVerifiedMessage} className='w-full bg-gray-100 rounded-lg bg-opacity-50 h-full absolute'></div>}
          <input  className='px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg w-full' value={"Register"} type='submit'/>
          

        </div>
      </form>
    </div>
    </div>
  )
}

export default Register