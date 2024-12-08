import React ,{useState} from 'react'
import {IoMdEyeOff}from "react-icons/io"
import { IoEye } from "react-icons/io5";
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router';



function Register() {



  const [toggle,setToggle]=useState(false);
  const [toggle2,setToggle2]=useState(false);
  const navigate=useNavigate()
  const [confirmPasswordInput,setConfirmPassword]=useState("")
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
      const response=await fetch('http://localhost:8000/user/user_register',{
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
  
  
  console.log(formData)




  return (
    <div className='w-2/3 md:w-1/3 shadow-gray-300 bg-gray-50 shadow-lg p-5 rounded-lg mt-36 mb-28 ' >
      <div className='flex justify-center text-gray-700 text-2xl font-semibold'><span>Register</span></div>
      <form onSubmit={handelSubmit}>
        <div className='flex gap-1 flex-col mt-3'>
          <label>Username : </label>
          <input value={formData.userName} onChange={handelInput} className='border-2 focus:outline-none rounded-lg border-gray-300 px-5 py-1 '  type="text" placeholder='Full Name' name="fullName" required/>
        </div>
        <div className='flex gap-1 flex-col mt-3'>
          <label>Email : </label>
          <input value={formData.email} onChange={handelInput} className='border-2 focus:outline-none rounded-lg border-gray-300 px-5 py-1 ' type="email" placeholder='email@gmail.com' name="email" required/>
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
        <div className='mt-5 '>
          <input  className='px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg w-full' value={"Register"} type='submit'/>
        </div>
      </form>
    </div>
  )
}

export default Register