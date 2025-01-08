import React,{useEffect, useState} from 'react'
import { Link } from 'react-router';
import logo from "../assets/Symbol-01.png"
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { fetchUser } from '../app/Actions/user_action';
import Cookies from "js-cookie"
import OtpInput from "../component/OtpInput.jsx"
 

function ChangePassword() {
  const dispatch=useDispatch()
    const [step, setStep] = useState(1); // Steps: 1 = Email Input, 2 = OTP Input, 3 = Change Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formData,setData]=useState({});
    const {isLogin,userInfo,isLoading}=useSelector((state)=>state.user);
const [buttonToggle,setButtonToggle]=useState(false)

    useEffect(()=>{
      dispatch(fetchUser())
    },[dispatch])


    const onChange=(e)=>{
      const {name,value}=e.target;
      setEmail(e.target.value)
      setData({...formData,[name]:value});
    }


    const handleEmailSubmit =async (e) => {
      e.preventDefault();
      // let send the otp
      console.log(formData)
      if(email.length>0){
      setButtonToggle(true)
      }
      const response=await fetch(`http://localhost:8000/user/user_otp`,
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
      //  setStep(2);
      }
     // Simulate sending OTP
   
    };
  
useEffect(()=>{
  if(email.length==0){
    setButtonToggle(false)
  }
},[email])

    const handleOtpSubmit = (e) => {
      e.preventDefault();
      // Simulate OTP verification
      if (otp === "123456") {
        alert("OTP verified!");
        setStep(3);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    }; 
    const handelLogout=()=>{
      axios.post('http://localhost:8000/user/user_logout',{},{
       withCredentials:true
     }).then((response)=>{
       if(response.status===200){
       Cookies.remove('accessToken')
       Cookies.remove('refresh_token')
       dispatch(logout())
       }
       else{
         console.log("logout failed")
       }
     })
   }
    const handlePasswordSubmit = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      alert("Password changed successfully!");
      setStep(1); // Reset form
    };
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
              <NavLink className={({ isActive }) => `relative text-lg text-white ${isActive ? "decoration-solid after:w-full after:left-0 after:translate-x-0" : "after:left-1/2 after:translate-x-[-50%]"} py-2 hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`} to="/about">
                My Booking
                </NavLink>
              </li>
              <li>
              <button className={`relative text-white text-lg after:left-1/2 after:translate-x-[-50%] py-2 hover:text-white after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:rounded after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`}to="/store">
                   Logout-{userInfo?.fullName}
              </button>

              </li>
            </ul>

        </nav >
        <div className="flex items-center justify-center w-full px-4  text-black">
        <div className=" max-w-md p-6 w-full mt-56 bg-white border border-gray-300 rounded shadow-md">
          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <h2 className="text-xl font-semibold mb-4">Enter Your Email</h2>
              <input
                name='email'
                type="email"
                className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={onChange}
                required
              />
              <div className='pb-2'>
              <OtpInput/>
              </div>
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
  
          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Verify OTP
              </button>
            </form>
          )}
  
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit}>
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <input
              name='fullName'
                type="text"
                className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
                placeholder="Enter new password"
                value={fullName}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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