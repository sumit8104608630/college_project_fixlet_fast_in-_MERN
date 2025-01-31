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
import { useNavigate } from 'react-router';
import Swal from "sweetalert2"
const apiUrl=import.meta.env.VITE_BACKEND_API_URL


function ChangePassword() {
  const dispatch=useDispatch()
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
          title:"OTP send successfully!",
          icon: "success",
          confirmButtonColor: "#000000", // Black color
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
    const handlePasswordSubmit = async(e) => {
      e.preventDefault();
      if (formData.password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
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
     const data= response
     console.log(data)
     if (data.status === 200) {
      Swal.fire({
        title: "Password changed successfully!",
        icon: "success",
        confirmButtonColor: "#000000", // Black color
        confirmButtonText: "OK",
        draggable: true
      });
      
    
      setData({...formData,email:"",fullName:"",password:"",})
        setStep(false);
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
        confirmButtonColor: "#000000", // Black color
        confirmButtonText: "OK",
        draggable: true
      });
      
       setStep(true);
    }

  }
  return (
<>{isLoading?<></>:
      <div className='min-h-screen  bg-gray-100 '>
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
              <NavLink className={({ isActive }) => `relative text-lg text-white ${isActive ? "decoration-solid after:w-full after:left-0 after:translate-x-0" : "after:left-1/2 after:translate-x-[-50%]"} py-2 hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`} to="/myBooking">
                My Booking
                </NavLink>
              </li>
              <li>
              <button onClick={handelLogout} className={`relative text-white text-lg after:left-1/2 after:translate-x-[-50%] py-2 hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`}to="/store">
                   Logout-{formData.fullName||userInfo?.fullName}
              </button>

              </li>
            </ul>

        </nav >
        <div className="flex items-center justify-center w-full px-4  text-black">
        <div className=" max-w-md p-6 w-full mt-56 bg-white border border-gray-300 rounded shadow-md">
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
                className="w-full p-2 bg-black text-white rounded hover:bg-gray-800"
              >
                {buttonToggle?
                "ReSend"
                : "Send OTP"}
              </button>
            </form>
          )}
  
   
  
          {step === true && (
            <form onSubmit={handlePasswordSubmit}>
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <input
              
              name='fullName'
                type="text"
                className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
                placeholder=""
                value={formData.fullName}
                onChange={onChange}
                required
              />
              <input
              name='password'
                type="password"
                className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
                placeholder="Enter new password"
                value={formData.password}
                onChange={onChange}  required
              />
              <input
              name='confirmPassword'
                type="password"
                className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
              />
              <button
              
                type="submit"
                className="w-full p-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Change Password
              </button>
            </form>
          )}
        </div>
      </div>
      </div> 
}
      </>       
  )
}

export default ChangePassword