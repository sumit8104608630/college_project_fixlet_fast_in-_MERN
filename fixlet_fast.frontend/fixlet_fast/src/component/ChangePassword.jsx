import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import logo from "../assets/Symbol-01.png"
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../app/Actions/user_action';
import Cookies from "js-cookie"
import OtpInput from "../component/OtpInput.jsx"
import { logout } from "../app/user.redux"
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from "sweetalert2"

const apiUrl = import.meta.env.VITE_BACKEND_API_URL

function ChangePassword() {
  const dispatch = useDispatch()
  const { isLogin, userInfo, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [step, setStep] = useState(false);
  const [toggleVerify, setToggleVerify] = useState(false)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setData] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  const [buttonToggle, setButtonToggle] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setData({ ...formData, fullName: userInfo?.fullName || "" })
    dispatch(fetchUser())
  }, [dispatch, userInfo?.fullName,])

  const onChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setData({ ...formData, [name]: value });
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.length > 0) {
      setButtonToggle(true)
    }
    const response = await fetch(`${apiUrl}/user/user_otp`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    })

    const data = await response.json();
    if (data.statusCode === 200) {
      Swal.fire({
        title: "OTP sent successfully!",
        icon: "success",
        confirmButtonColor: "#000000",
        confirmButtonText: "OK",
        draggable: true
      });
      setToggle(true)
    }
  };

  useEffect(() => {
    if (formData.email.length == 0) {
      setButtonToggle(false)
      setToggle(false)
    }
  }, [formData.email])

  const handelLogout = (e) => {
    e.preventDefault()
    axios.post(`${apiUrl}/user/user_logout`, {}, {
      withCredentials: true
    }).then((response) => {
      if (response.status === 200) {
        Cookies.remove('accessToken')
        Cookies.remove('refresh_token')
        dispatch(logout())
        navigate("/");
      } else {
        console.log("logout failed")
      }
    })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match.",
        icon: "error",
        confirmButtonColor: "#000000",
        confirmButtonText: "OK",
        draggable: true
      });
      return;
    }
    
    const obj = {
      email: formData.email,
      fullName: formData.fullName,
      password: formData.password
    }
    
    const response = await fetch(`${apiUrl}/user/change_password`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    });
    
    if (response.status === 200) {
      Swal.fire({
        title: "Password changed successfully!",
        icon: "success",
        confirmButtonColor: "#000000",
        confirmButtonText: "OK",
        draggable: true
      });
      setData({ ...formData, email: "", fullName: "", password: "" })
      setStep(false);
      setConfirmPassword("");
    }
  };

  const handelverifyOtp = async (otp) => {
    setToggle(false)
    setToggleVerify(true);
    const email = formData.email;

    const obj = {
      email: email,
      otp: otp
    }
    
    const response = await fetch(`${apiUrl}/user/verify_user_otp`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    
    const responseData = await response.json();
    if (responseData.statusCode === 200 && responseData.success) {
      Swal.fire({
        title: responseData.message,
        icon: "success",
        confirmButtonColor: "#000000",
        confirmButtonText: "OK",
        draggable: true
      });
      setStep(true);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Enhanced Navigation */}
      <nav className='bg-black shadow-lg relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <div className='flex-shrink-0'>
              <Link to={"/"} className='block'>
                <img className='h-10 w-auto sm:h-12' src={logo} alt='logo' />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:block'>
              <ul className='flex items-center space-x-8'>
                <li>
                  <NavLink 
                    to="/helpCenter" 
                    className={({ isActive }) => 
                      `relative px-3 py-2 text-sm lg:text-base font-medium text-white transition-colors duration-200 hover:text-gray-300 ${
                        isActive ? "after:w-full after:left-0" : "after:left-1/2 after:translate-x-[-50%]"
                      } after:content-[''] after:absolute after:bottom-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`
                    }
                  >
                    Help Center
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/myBooking"
                    className={({ isActive }) => 
                      `relative px-3 py-2 text-sm lg:text-base font-medium text-white transition-colors duration-200 hover:text-gray-300 ${
                        isActive ? "after:w-full after:left-0" : "after:left-1/2 after:translate-x-[-50%]"
                      } after:content-[''] after:absolute after:bottom-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:translate-x-0 hover:after:w-full`
                    }
                  >
                    My Booking
                  </NavLink>
                </li>
                <li>
                  <button 
                    onClick={handelLogout} 
                    className="relative px-3 py-2 text-sm lg:text-base font-medium text-white transition-colors duration-200 hover:text-gray-300 after:content-[''] after:absolute after:bottom-0 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full after:left-1/2 after:translate-x-[-50%] hover:after:left-0 hover:after:translate-x-0"
                  >
                    <span className="hidden sm:inline">Logout - </span>
                    <span className="truncate max-w-32">{formData.fullName || userInfo?.fullName}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Mobile menu button */}
            <div className='md:hidden'>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              >
                <svg className='h-6 w-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                  {isMenuOpen ? (
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  ) : (
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className='md:hidden absolute top-16 left-0 right-0 bg-black shadow-lg z-50'>
              <div className='px-2 pt-2 pb-3 space-y-1 border-t border-gray-700'>
                <NavLink
                  to="/helpCenter"
                  className={({ isActive }) => 
                    `block px-3 py-2 text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 rounded-md ${
                      isActive ? 'bg-gray-700' : ''
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Help Center
                </NavLink>
                <NavLink
                  to="/myBooking"
                  className={({ isActive }) => 
                    `block px-3 py-2 text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 rounded-md ${
                      isActive ? 'bg-gray-700' : ''
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Booking
                </NavLink>
                <button
                  onClick={(e) => {
                    handelLogout(e);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  Logout - {formData.fullName || userInfo?.fullName}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 border border-gray-200">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                  !step ? 'bg-black text-white' : 'bg-green-500 text-white'
                }`}>
                  {!step ? '1' : '✓'}
                </div>
                <div className={`h-1 w-16 rounded ${step ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                  step ? 'bg-black text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  2
                </div>
              </div>
          
            </div>

            {/* Step 1: Email Verification */}
            {!step && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                  <p className="text-gray-600 text-sm">Enter your email address to receive an OTP</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name='email'
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={onChange}
                      required
                    />
                  </div>

                  {toggle && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Enter OTP
                      </label>
                      <OtpInput length={4} email={formData.email} onclick={handelverifyOtp} />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 font-semibold text-sm"
                >
                  {buttonToggle ? "Resend OTP" : "Send OTP"}
                </button>
              </form>
            )}

            {/* Step 2: Change Password */}
            {step && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Change Password</h2>
                  <p className="text-gray-600 text-sm">Create a new secure password</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name='fullName'
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-gray-900"
                      value={formData.fullName}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      id="password"
                      name='password'
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                      placeholder="Enter new password"
                      value={formData.password}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name='confirmPassword'
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 font-semibold text-sm"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Security Tip:</strong> Choose a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword