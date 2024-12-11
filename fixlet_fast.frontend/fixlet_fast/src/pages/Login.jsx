import React, { useState,useEffect } from 'react';
import MyImage from "../assets/undraw_secure_login_pdn4 (2).svg";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router";
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchUser } from '../app/Actions/user_action.js';

function Login() {



  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get the authentication state from Redux
  const { isLogIn, userInfo, isLoading } = useSelector((state) => state.user);
  const [data,setData]=useState({})
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
console.log(userInfo)
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respond = await fetch('http://localhost:8000/user/user_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const datas = await respond.json();
      console.log(datas)
      setData(datas)

      
    } catch (error) {
      console.log("Error during login:", error);
    }
  };


  const isEmpty=(obj)=>Object.keys(obj).length===0;  
 
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo,navigate]);


useEffect(() => {
  dispatch(fetchUser());
  return () => {
    console.log("Cleanup function called");
  };
}, [data, dispatch]);







  return (
    <div className='    w-max md:w-1/2 shadow-gray-300 bg-gray-50 shadow-lg p-5 rounded-lg mb-36 mt-36 '>
    <div className='flex gap-8'>
      <div className='hidden md:block'>
        <img  src={MyImage} alt='background image' />
      </div>
      <div className='w-full'>
        <form onSubmit={handleSubmit}>
          <div className='flex gap-1 flex-col mt-3'>
            <label>Email: </label>
            <input
              value={formData.email}
              onChange={handleInput}
              className='border-2 w-full focus:outline-none rounded-lg border-gray-300 px-5 py-1'
              type="email"
              placeholder='email@gmail.com'
              name="email"
              
            />
          </div>
          <div className='flex gap-1 flex-col mt-3'>
            <label>Password: </label>
            <div className='border-2 bg-white flex px-5 py-1 w-full rounded-lg border-gray-300'>
              <input
                value={formData.password}
                type={toggle ? 'text' : 'password'}
                className='w-full focus:outline-none rounded-lg'
                onChange={handleInput}
                name="password"
                
              />
              <button type='button' className='text-xl' onClick={() => setToggle(prev => !prev)}>
                {toggle ? <IoEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </div>

          <div className='mt-5'>
            <input
              className='px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg w-full'
              value={"Log In"}
              type='submit'
            />
          </div>
        </form>

      </div>
    </div>
  </div>
  ) 
}

export default Login