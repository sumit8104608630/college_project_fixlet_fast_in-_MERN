import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"
import Loader from "../component/Loader"

const apiUrl=import.meta.env.VITE_BACKEND_API_URL
function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneCode: "+91",
    phoneNumber: "",
    message: "",
  });
  const[loading,setLoading]=useState(false);

  useEffect(() => {
    if (loading) {
      window.document.body.style.overflow = 'hidden'; // Hides the scrollbar
    } else {
      window.document.body.style.overflow = ''; // Restores the scrollbar
    }
    window.scrollTo(0, 0);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    
    try {
     
      const response = await axios.post(`${apiUrl}/global/send_inquire`, formData);
      // Reset form fields after submission
      console.log(response)

      if(response.status===201)
      {
        setLoading(false)
             Swal.fire({
                title: "Message send successfully",
                icon: "success",
                confirmButtonColor: "#f97316", // Black color
                confirmButtonText: "OK",
                draggable: true
              });
      }
      setFormData({
        fullName: "",
        email: "",
        phoneCode: "+91",
        phoneNumber: "",
        message: "",
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
  
<div className="flex justify-center w-full items-center min-h-screen pt-14 px-4">

  {loading&&
<div className="w-full h-screen fixed top-0 z-20 bg-opacity-50 bg-white">
<div className="flex items-center justify-center h-screen">
  <div className="relative flex flex-col items-center">
  <svg
    version="1.1"
    viewBox="0 0 64 64"
    width="2em"
    height="2em"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-spin"
  >
    <circle
      className="stroke-gradient"
      cx="32"
      cy="32"
      r="28"
      fill="none"
      stroke="url(#spinner-gradient)"
      strokeWidth="8"
    />
    <path
      className="stroke-current text-orange-500"
      d="M32,4 A28 28,0,0,0,32,60"
      fill="none"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="spinner-gradient"
        gradientUnits="userSpaceOnUse"
        x1="32"
        y1="0"
        x2="32"
        y2="64"
      >
        <stop offset="0.1" stopColor="currentColor" stopOpacity="0" />
        <stop offset="0.9" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
  </svg>
    <div className="mt-4 md:text-base text-sm text-center text-orange-500 font-medium">
      Please wait
    </div>
  </div>
</div>
</div>
  
  }









      <div className="max-w-6xl w-full flex gap-8 p-8  rounded-lg">
        
        <div className="md:col-span-2 w-full">
          <h1 className="text-3xl font-semibold text-gray-700 mb-6">Contact us</h1>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-800 font-medium block mb-1">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name" 
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
              />
            </div>

            <div>
              <label className="text-gray-800 font-medium block mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address" 
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
              />
            </div>

            <div>
              <label className="text-gray-800 font-medium block mb-1">Enter Phone Number</label>
              <div className="flex border rounded-lg overflow-hidden">
                <select 
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                  className="border-r p-3 bg-gray-100 text-gray-800"
                >
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <input 
                  type="text" 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number" 
                  className="w-full p-3 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-800 font-medium block mb-1">Enter Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter message" 
                rows="4" 
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
              />
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white font-medium py-3 rounded-lg hover:bg-orange-600 transition">
              Submit
            </button>
          </form>
        </div>

        <div>
          <hr className="w-0.5 bg-gray-200 h-full " />
        </div>
        
        <div className="space-y-5">
          <div className="p-5 border rounded-lg">
            <h3 className="font-semibold text-gray-800">Need help?</h3>
            <p className="text-gray-700 text-sm mt-2">
              For immediate help regarding your bookings, log in and visit our Help Center.
            </p>
            <Link to="/helpCenter" className="text-orange-500 font-medium mt-2 inline-block">
              Open Help Center →
            </Link>
          </div>

          <div className="p-5 border rounded-lg">
            <h3 className="font-semibold text-gray-800">Still facing issues?</h3>
            <p className="text-gray-700 text-sm mt-2">
              Send us an email at <span className="font-medium">sss8104608630@gmail.com</span>. 
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h3 className="font-semibold text-gray-800">Media inquiries</h3>
            <p className="text-gray-700 text-sm mt-2">
              Contact us at <span className="font-medium">press@fixlet_fast.com</span>.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h3 className="font-semibold text-gray-800">What is our helpline number?</h3>
            <p className="text-gray-700 text-sm mt-2">
              We have switched to a fast, chat-based support. Visit our Help Center to start a chat.
            </p>
          </div>

          
        </div>

      </div>

    </div>
    
    
  );
}

export default Contact;
