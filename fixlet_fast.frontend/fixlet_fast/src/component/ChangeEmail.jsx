import React ,{useState,useEffect} from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import OtpInput from './OtpInput';
import axios from "axios"

import { Link } from 'react-router'
function ChangeEmail() {
    const [form,setFormData]=useState({
        newEmail:"",
        password:""
    })
    const [buttonToggle,setButtonToggle]=useState(false)
    const [toggle,setToggle]=useState(false);
    const [toggle2,setToggle2]=useState(true)
    const [sendToggle,SetSendToggle]=useState(false)
    const [toggleOtp,setToggleOtp]=useState(false)
    const [changeButton,setChangeButton]=useState(false)
    const onchange=(e)=>{
        e.preventDefault()
        setFormData({...form,[e.target.name]:e.target.value});

    }
    const handlePasswordVerification=async(e)=>{
        e.preventDefault()
        const obj={password:form.password};
        console.log(obj);
        const response=await axios.post("http://localhost:8000/user/check_password",obj,{withCredentials:true})
        if(response.status===201){
            setToggle2(false)

            setToggle(response?.data.data)
            SetSendToggle(true)
        }
        console.log(response);
    }

    
    const handleOtpSend =async (e) => {
        e.preventDefault();
        const obj={
            email:form.newEmail
        }
        // let send the otp
        if(form.newEmail.length>0){
        setButtonToggle(true)
        }
        const response=await fetch(`http://localhost:8000/user/user_otp`,
          {
            method: 'POST',
            body:JSON.stringify(obj),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials:"include"
          },
       
  
        )
  
        const data=await response.json();
        console.log(data)
        if(data.statusCode===200){
          setToggleOtp(true)
        }
       
       // Simulate sending OTP
     
      };

      useEffect(()=>{
        if(form.newEmail.length==0){
          setButtonToggle(false)
          setToggleOtp(false)
        }},[form.newEmail])

    const handelverifyOtp=async(otp)=>{
        const email=form.newEmail;
  
      const obj={
        email:email,
        otp:otp
      }
      const response=await fetch('http://localhost:8000/user/verify_user_otp',{
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
        setChangeButton(true);
        setToggleOtp(false)
        SetSendToggle(false)
     }
    
  
    }
    const handleChangeEmail=async(e)=>{
 e.preventDefault();
 const obj={
    newEmail:form.newEmail,
    password:form.password,
 }
 const response=await axios.post("http://localhost:8000/user/changeEmail",obj,{withCredentials:true});
 console.log(response)
 if(response.data.statusCode===200){
    alert(response.data.message)
 }


    }

  return (
<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

  <div className="w-1/4 flex items-start gap-5 flex-col">
  <Link className='mb-5' to={"/account"}>
        <FaArrowLeftLong className='' size={30}/>
        </Link>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-semibold text-center text-black mb-6">Change Email</h2>

    {/* Password Verification Form */
    toggle2&&
    <form>
      <div className="">
        <label htmlFor="password" className="block text-black font-medium">Enter Password</label>
        <input
        name='password'
        onChange={onchange}
        value={form.password}
          type="password"
          id="password"
          required
          className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
        />
      </div>
 

      
      <button onClick={handlePasswordVerification} type="submit" className="w-full p-2 bg-black text-white rounded hover:bg-gray-800">
        Verify Password
      </button>

    </form>}

    {/* New Email Form */}
    <form>
        
      <div className="">
        <label htmlFor="newEmail" className="block text-black font-medium">New Email</label>
        <input
        name='newEmail'
        disabled={changeButton}
        onChange={onchange}
        value={form.newEmail}
          type="email"
          id="newEmail"
          required
          className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
        />
      </div>

      {  sendToggle&&
        <button onClick={handleOtpSend} type="submit" className="w-full p-2 bg-black mb-3 text-white rounded hover:bg-gray-800">
            
          {buttonToggle?
                "ReSend"
                : "Send OTP"}
      </button>
      }
      {toggleOtp&&
         <div className='pb-2'>
         <OtpInput length={4} email={form.newEmail} onclick={handelverifyOtp} />
         </div>
    }

      {changeButton&&
      <button onClick={handleChangeEmail} type="submit" className="w-full p-2 bg-black text-white rounded hover:bg-gray-800">
        Change Email
      </button>
}
    </form>
  </div>
  </div>
</div>
  )
}

export default ChangeEmail