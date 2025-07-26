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
        setCompleteLocation(data.data)
        
        if (data.data) {
          setNotInArea(false)
          setToggle(false)
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Failed to get location. Please try again.");
      } finally {
        setIsLocationLoading(false);
      }
    }, () => {
      setIsLocationLoading(false);
      alert("Unable to get your location please allow the Location")
    })
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
      {!Show.showAddress &&
        <>
          <div className='md:block hidden'>
            <button onClick={handleToggle} className='bg-white flex items-center px-2 py-2 rounded-lg'>
              <FaLocationDot className='text-gray-500' size={20} />
              {/* Replace <p> with <span> to avoid invalid nesting */}
              <span className='text-gray-600 text-sm w-96 text-ellipsis overflow-hidden whitespace-nowrap px-2'>
                {location || userInfo?.location}
              </span>
              <FaLocationCrosshairs size={20} className='text-gray-500' />
            </button>
          </div>

          <button
            onClick={handleToggle}
            className='flex flex-col md:hidden cursor-pointer'>
            <div><p className='overflow-hidden w-40 text-ellipsis whitespace-nowrap'>{userInfo?.location}</p></div>
            <div className='flex items-center gap-2'><span className=''>{userInfo?.city.charAt(0).toUpperCase() + userInfo?.city.slice(1)}</span><span><IoIosArrowDown /></span></div>
          </button>
        </>
      }

      {Show.showAddress &&
        <>
          <div className='w-full md:block hidden'>
            <div className='flex w-full items-center justify-between'>
              <div className='flex items-center gap-2'>
                <FaLocationDot className='text-gray-600' size={25} />
                <span className='text-gray-600 text-sm w-96 text-ellipsis px-2'>
                  {location ? location : userInfo?.location}
                </span>
              </div>
              <div>
                <button
                  onClick={handleToggle}
                  className='px-5 py-2 bg-gray-100 rounded-lg border-2 border-gray-400 hover:bg-gray-200 font-semibold'>
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className='flex items-center md:hidden justify-between px-2'>
            <p className='text-xs px-0.5'>{userInfo?.location}</p>
            <button onClick={handleToggle} className='text-orange-500 cursor-pointer border-2 px-2 py-1 rounded-lg border-gray-400'>Edit</button>
          </div>
        </>
      }

      {toggle &&
        <>
          <div className='fixed z-20 justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen'>
            <div className='relative h-max'>
              <button onClick={() => { setToggle(false) }} className='bg-white rounded-full p-1 mb-2 absolute -top-10 right-0 translate-y-0'><IoCloseOutline size={20} /></button>

              <div className='bg-white flex flex-col md:w-96 w-80 p-5 rounded'>
                <div className=''>
                  <button 
                    onClick={handleCurrentLocation} 
                    disabled={isLocationLoading}
                    className={`w-full flex gap-2 items-center font-semibold py-2 px-1 rounded transition-all duration-200 ${
                      isLocationLoading 
                        ? 'text-orange-400 cursor-not-allowed opacity-70' 
                        : 'text-orange-500 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    {isLocationLoading ? (
                      <>
                        <LoadingSpinner size="w-5 h-5" />
                        <span>Getting Location...</span>
                      </>
                    ) : (
                      <>
                        <FaLocationCrosshairs size={20} className='text-orange-500' />
                        <span>Current Location</span>
                      </>
                    )}
                  </button>
                </div>

                <div className=''>
                  <button 
                    onClick={() => setToggle2(true)} 
                    disabled={isLocationLoading}
                    className={`w-full text-center gap-2 font-semibold text-white py-2 rounded mt-5 transition-all duration-200 ${
                      isLocationLoading 
                        ? 'bg-orange-400 cursor-not-allowed opacity-70' 
                        : 'bg-orange-500 hover:bg-orange-600'
                    }`}
                  >
                    Set Your Location
                  </button>
                </div>

                <hr className='w-full h-0.5 bg-gray-400 my-3'></hr>
                <div className='flex items-center'>
                  {not_in_area ?
                    <div className='flex flex-col gap-5 mt-5 items-center justify-center w-full'>
                      <div className=''><img className='w-72' src={locationImage}></img></div>
                      <div className="text-center text-gray-700 font-medium p-4">
                        <span className='text-lg'>We're not there yet, but we'll arrive soon. Thanks for your patience!</span>
                      </div>
                    </div> :
                    <>
                      <FaLocationDot className='text-gray-500' size={25} />
                      <p className='text-gray-600 text-sm w-full px-2'>{location ? location : userInfo.location}</p>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>

          {toggle2 &&
            <div className='absolute overflow-auto md:px-2 px-5 z-30 py-10 justify-center items-center bg-opacity-50 left-0 top-0 bg-black flex w-full h-screen'>
              <div className='relative h-full'>
                <button onClick={() => setToggle2(false)} className='bg-white rounded-full p-1 mb-2 absolute -top-0 right-0 translate-y-0'><IoCloseOutline size={20} /></button>

                <div className="max-w-lg mx-auto mt-10 w-full bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">
                    Address Form
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={(e) => setCountry(e)}
                        disabled={isFormSubmitting}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          isFormSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <option value="">Select Country</option>
                        {country.flat().map((country) => (
                          <option key={country.name}
                            value={JSON.stringify({ name: country.name, code: country.isoCode })} // Encode as a JSON string
                          >
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='flex gap-2'>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          State
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={(e) => handleStateChange(e.target.value)}
                          disabled={isFormSubmitting}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                            isFormSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state.isoCode} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          City
                        </label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={(e) => handleCityChange(e.target.value)}
                          disabled={isFormSubmitting}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                            isFormSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <option value="">Select City</option>
                          {cities.flat().map((city) => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Pin Code
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        disabled={isFormSubmitting}
                        placeholder="Enter your pin code"
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          isFormSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={isFormSubmitting}
                        placeholder="Enter your address like street, Road etc.."
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          isFormSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isFormSubmitting}
                      className={`w-full py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 ${
                        isFormSubmitting
                          ? 'bg-orange-400 text-white cursor-not-allowed opacity-80'
                          : 'border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-gray-600 hover:bg-orange-600'
                      }`}
                    >
                      {isFormSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <LoadingSpinner />
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          }
        </>
      }
    </>
  )
}

export default Location