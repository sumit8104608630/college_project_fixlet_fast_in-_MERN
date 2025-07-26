import React, { useState, useEffect } from 'react';
import MyImage from "../assets/undraw_secure_login_pdn4 (2).svg";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../app/Actions/user_action.js';

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

function Login() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setError] = useState("");
  
  // Get the authentication state from Redux
  const { userInfo, isLoading } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    
    try {
      const respond = await fetch(`${apiUrl}/user/user_login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const datas = await respond.json();
      console.log(datas);
      
      if (datas.statusCode == 200) {
        dispatch(fetchUser());
        navigate("/");
      }
      
      setData(datas);
      
      if (datas.statusCode == 401 || datas.statusCode == 404) {
        setError(datas.message);
      }
      
    } catch (error) {
      console.log("Error during login:", error);
      setError("Network error. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      console.log("Cleanup function called");
    };
  }, [data]);

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
      <span>Logging In...</span>
    </div>
  );

  return (
    <div className='w-full justify-center flex px-2'>
      <div className='w-full md:w-1/2 shadow-gray-300 bg-gray-50 shadow-lg p-5 rounded-lg mb-36 mt-52'>
        <div className='flex gap-8'>
          <div className='hidden md:block'>
            <img src={MyImage} alt='background image' />
          </div>
          <div className='w-full'>
            <form onSubmit={handleSubmit}>
              <div className='flex gap-1 flex-col mt-3'>
                <label>Email: </label>
                <input
                  value={formData.email}
                  onChange={handleInput}
                  className={`border-2 w-full focus:outline-none rounded-lg border-gray-300 px-5 py-1 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  type="email"
                  placeholder='email@gmail.com'
                  name="email"
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className='flex gap-1 flex-col mt-3'>
                <label>Password: </label>
                <div className={`border-2 bg-white flex px-5 py-1 w-full rounded-lg border-gray-300 ${
                  isLoading ? 'opacity-50' : ''
                }`}>
                  <input
                    value={formData.password}
                    type={toggle ? 'text' : 'password'}
                    className='w-full focus:outline-none rounded-lg'
                    onChange={handleInput}
                    name="password"
                    disabled={isLoading}
                    required
                  />
                  <button 
                    type='button' 
                    className={`text-xl ${isLoading ? 'cursor-not-allowed' : ''}`}
                    onClick={() => setToggle(prev => !prev)}
                    disabled={isLoading}
                  >
                    {toggle ? <IoEye /> : <IoMdEyeOff />}
                  </button>
                </div>
              </div>
              
              {errorMessage !== "" && (
                <p className='flex justify-between mt-2'>
                  <span className='text-red-500 text-xs'>{errorMessage}</span>
                  <Link to={"forgotpassword"}>
                    <span className='text-xs text-red-500'>Forgot password</span>
                  </Link>
                </p>
              )}
              
              <div className='mt-5'>
                <button
                  type='submit'
                  className={`px-5 py-2 text-white font-semibold rounded-lg w-full transition-all duration-200 ${
                    isLoading 
                      ? 'bg-orange-400 cursor-not-allowed opacity-80' 
                      : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner /> : "Log In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;