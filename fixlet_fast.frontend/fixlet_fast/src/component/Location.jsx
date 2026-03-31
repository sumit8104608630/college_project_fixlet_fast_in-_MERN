import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
//import axios from 'axios';
import locationImage from "../assets/staticPhotp/locate.svg"
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../app/Actions/user_action.js';
import { currentContext } from '../component/Context.jsx';
import { Country, State, City } from "country-state-city"
import { useContext } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const apiUrl = import.meta.env.VITE_BACKEND_API_URL

function Location(props) {
  const { userInfo } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [location, setCompleteLocation] = useState("")
  const dispatch = useDispatch();
  const [not_in_area, setNotInArea] = useState(false);
  const Show = useContext(currentContext)
  
  // Loading states for different buttons
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const [countryCode, setCountryCode] = useState("")

  const handleToggle = () => {
    setToggle(true)
  }

  // Loading Spinner Component
  const LoadingSpinner = ({ size = "w-4 h-4" }) => (
    <div className={`animate-spin rounded-full ${size} border-2 border-current border-t-transparent`}></div>
  );

  const handleCurrentLocation = async () => {
    setIsLocationLoading(true);
    
    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const obj = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        }
        
        const fetchData = await fetch(`${apiUrl}/user/storeAddress`, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        })
        
        const data = await fetchData.json()
        
        if (data.success) {
          setCompleteLocation(data.data)
          setNotInArea(false)
          setToggle(false)
        } else {
          setNotInArea(true)
          console.warn("Location out of service area:", data.message)
        }
      } catch (error) {
        console.error("Error fetching location from backend:", error);
        alert("Server error: Unable to save your location. Please try entering it manually.");
      } finally {
        setIsLocationLoading(false);
      }
    }, (error) => {
      setIsLocationLoading(false);
      let errorMsg = "Unable to get your location.";
      if (error.code === 1) errorMsg = "Location permission denied. Please allow location access in your browser settings.";
      if (error.code === 2) errorMsg = "Position unavailable. Please try again or enter manually.";
      if (error.code === 3) errorMsg = "Location request timed out. Please try again.";
      
      alert(errorMsg);
    }, geoOptions)
  }

  const setCountry = (e) => {
    const selectedCountry = JSON.parse(e.target.value); // Parse the JSON string back into an object
    setFormData({ ...formData, country: selectedCountry.name }); // Set country code in formData
    setCountryCode(selectedCountry.code) // Access both name and code
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    try {
      // API call to store the address
      const data = await fetch(`${apiUrl}/user/store_custom_address`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })

      const response = await data.json()
      console.log(response)
      setCompleteLocation(response.data)

      if (response.data) {
        setToggle2(false)
        setNotInArea(false)
      } else {
        setToggle2(false);
        setNotInArea(!response.success)
        setToggle(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save address. Please try again.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  useEffect(() => {
    if (location) {
      console.log(location);
      dispatch(fetchUser());
    }
    return () => {
      //un mount the component
    }
  }, [location, dispatch]);

  const handleStateChange = (selectedState) => {
    setFormData({ ...formData, state: selectedState, city: "" });
  };

  const handleCityChange = (selectedCity) => {
    setFormData({ ...formData, city: selectedCity });
  };

  const country = Country.getAllCountries();
  const states = State.getStatesOfCountry(countryCode);
  const cities = State.getStatesOfCountry(countryCode)
    .filter((state) => state.name === formData.state)
    .map((state) => City.getCitiesOfState(state.countryCode, state.isoCode));

  return (
    <>
      {!Show.showAddress && (
        <>
          <div className='md:block hidden w-full max-w-[250px] lg:max-w-[350px]'>
            <button onClick={handleToggle} className='bg-white flex items-center px-3 py-2 rounded-xl shadow-sm border border-gray-100 hover:border-orange-200 transition-all w-full'>
              <FaLocationDot className='text-orange-500 shrink-0' size={18} />
              <span className='text-gray-600 text-xs lg:text-sm truncate px-2 text-left flex-1'>
                {location || userInfo?.location || "Select Location"}
              </span>
              <FaLocationCrosshairs size={18} className='text-gray-400 shrink-0 hover:text-orange-500 transition-colors' />
            </button>
          </div>

          <button
            onClick={handleToggle}
            className='flex flex-col md:hidden cursor-pointer max-w-[120px]'>
            <div className='flex items-center gap-1'>
              <FaLocationDot className='text-orange-500 shrink-0' size={12} />
              <p className='text-[10px] font-bold text-gray-800 truncate'>
                {userInfo?.city ? userInfo.city.charAt(0).toUpperCase() + userInfo.city.slice(1) : "Select City"}
              </p>
              <IoIosArrowDown size={10} className="text-gray-500" />
            </div>
            <p className='text-[8px] text-gray-500 truncate pl-4'>{userInfo?.location}</p>
          </button>
        </>
      )}

      {Show.showAddress && (
        <>
          <div className='w-full md:block hidden'>
            <div className='flex w-full items-center justify-between gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100'>
              <div className='flex items-center gap-3 overflow-hidden'>
                <FaLocationDot className='text-orange-500 shrink-0' size={22} />
                <span className='text-gray-700 text-sm font-medium truncate'>
                  {location ? location : userInfo?.location || "No location set"}
                </span>
              </div>
              <button
                onClick={handleToggle}
                className='shrink-0 px-4 py-1.5 text-sm bg-white text-orange-600 rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors font-semibold shadow-sm'>
                Change
              </button>
            </div>
          </div>
          <div className='flex items-center md:hidden justify-between w-full px-2 py-1 bg-orange-50 rounded-lg'>
            <div className='flex items-center gap-2 overflow-hidden'>
              <FaLocationDot className='text-orange-500 shrink-0' size={14} />
              <p className='text-[10px] text-gray-700 truncate'>{userInfo?.location || "Select location"}</p>
            </div>
            <button onClick={handleToggle} className='shrink-0 text-[10px] font-bold text-orange-600 px-2 py-1 ml-2 bg-white rounded-md border border-orange-100'>Edit</button>
          </div>
        </>
      )}

      {toggle && (
        <div className='fixed z-50 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
          <div className='bg-white rounded-3xl shadow-2xl w-full max-w-md relative p-6'>
            <button onClick={() => setToggle(false)} className='absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors'>
              <IoCloseOutline size={24} />
            </button>

            <h3 className='text-xl font-bold text-gray-800 mb-6'>Select Location</h3>

            <button 
              onClick={handleCurrentLocation} 
              disabled={isLocationLoading}
              className='w-full flex items-center justify-center gap-3 py-3 px-4 bg-orange-50 text-orange-600 font-bold rounded-2xl hover:bg-orange-100 transition-all border border-orange-100 disabled:opacity-50'
            >
              {isLocationLoading ? (
                <LoadingSpinner size="w-5 h-5" />
              ) : (
                <FaLocationCrosshairs size={20} />
              )}
              Use Current Location
            </button>

            <div className='relative my-8'>
              <div className='absolute inset-0 flex items-center'><div className='w-full border-t border-gray-100'></div></div>
              <div className='relative flex justify-center text-sm'><span className='px-2 bg-white text-gray-400'>or set manually</span></div>
            </div>

            <button 
              onClick={() => setToggle2(true)} 
              className='w-full py-3 px-4 bg-gray-800 text-white font-bold rounded-2xl hover:bg-gray-900 transition-all shadow-lg'
            >
              Enter Address Details
            </button>

            <div className='mt-8 pt-6 border-t border-gray-50'>
              <div className='flex items-start gap-3'>
                <FaLocationDot className='text-gray-400 shrink-0' size={20} />
                <div>
                  <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>Current Selection</p>
                  <p className='text-sm text-gray-600 leading-relaxed'>
                    {location || userInfo?.location || "No location selected"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {toggle2 && (
        <div className='fixed z-[60] inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto'>
          <div className='bg-white rounded-3xl shadow-2xl w-full max-w-lg relative p-8 my-auto'>
            <button onClick={() => setToggle2(false)} className='absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors'>
              <IoCloseOutline size={24} />
            </button>

            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Address Details</h2>
            
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-xs font-bold text-gray-500 uppercase mb-1 ml-1'>Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={(e) => setCountry(e)}
                  className='w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all'
                >
                  <option value="">Select Country</option>
                  {country.map((c) => (
                    <option key={c.isoCode} value={JSON.stringify({name: c.name, code: c.isoCode})}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-bold text-gray-500 uppercase mb-1 ml-1'>State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className='w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all'
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.isoCode} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='block text-xs font-bold text-gray-500 uppercase mb-1 ml-1'>City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className='w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all'
                  >
                    <option value="">Select City</option>
                    {cities.flat().map((city) => (
                      <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-bold text-gray-500 uppercase mb-1 ml-1'>Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House No, Street, Area"
                  className='w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all'
                />
              </div>

              <div>
                <label className='block text-xs font-bold text-gray-500 uppercase mb-1 ml-1'>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all'
                />
              </div>

              <button 
                type="submit"
                disabled={isFormSubmitting}
                className='w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 mt-4 disabled:opacity-50'
              >
                {isFormSubmitting ? <LoadingSpinner size="w-6 h-6" /> : 'Save Address'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Location