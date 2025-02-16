import React, { useState } from "react";
import {Country,State,City} from "country-state-city"


function Register  ()  {

const [Countries,setCountries]=useState(Country.getAllCountries())


  const [formData, setFormData] = useState({
    fullName: "",
    profilePhoto: null,
    email: "",
    phoneCode: "+91",
    phoneNumber: "",
    password: "",
    specialized: [],
    jobType: "",
    AadhaarCardNumber: "",
    address: {
      country: "",
      state: "",
      city: "",
      additionalDetails: "",
    },
  });


 
  const phoneCodes = ["+91", "+1", "+44", "+61", "+81"]; // Add more as needed
  const specialties = [
    "Electrician",
    "Plumber",
    "Carpenter",
    "Painter",
    "AC Technician",
    "Decorative",
  ]; // Add more as needed

  const countries =Countries; // Example, can be dynamic
  const states = {
    India: ["Delhi", "Mumbai", "Kolkata"],
    USA: ["California", "Texas", "New York"],
    UK: ["London", "Manchester", "Bristol"],
    Australia: ["Sydney", "Melbourne", "Brisbane"],
  };
  const cities = {
    Delhi: ["South Delhi", "North Delhi", "East Delhi"],
    Mumbai: ["South Mumbai", "Bandra", "Andheri"],
    // Add more cities here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePhoto: e.target.files[0],
    }));
  };

  const handleSpecializedChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      specialized: checked
        ? [...prevData.specialized, value]
        : prevData.specialized.filter((specialty) => specialty !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add form submission logic here
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center my-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white border-2 border-gray-100 shadow-2xl p-6 rounded-lg "
      >
        <h2 className="text-3xl font-semibold text-center text-orange-500 mb-4">Register</h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Profile Photo */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Profile Photo</label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Phone Code and Phone Number */}
        <div className="flex space-x-2 mb-4">
          <div className="w-1/3">
            <label className="block text-gray-800 font-medium mb-2">Phone Code</label>
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {phoneCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
          <div className="w-2/3">
            <label className="block text-gray-800 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Specialized */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Specialized</label>
          <div className="flex flex-wrap">
            {specialties.map((specialty) => (
              <label key={specialty} className="flex items-center space-x-2 mb-2 mr-4">
                <input
                  type="checkbox"
                  value={specialty}
                  checked={formData.specialized.includes(specialty)}
                  onChange={handleSpecializedChange}
                  className="form-checkbox text-orange-500"
                />
                <span className="text-gray-700">{specialty}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="" disabled>
              Select Job Type
            </option>
            <option value="fullTime">Full-Time (12 Hours)</option>
            <option value="partTime">Part-Time (8 Hours)</option>
          </select>
        </div>

        {/* Aadhaar Card Number */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Aadhaar Card Number</label>
          <input
            type="text"
            name="AadhaarCardNumber"
            value={formData.AadhaarCardNumber}
            onChange={handleInputChange}
            required
            minLength={12}
            maxLength={12}
            pattern="^[0-9]{12}$"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Address Section */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Address</label>
          <div className="grid grid-cols-3 gap-4">
            {/* Country Dropdown */}
            <div className="w-full">
              <label className="block text-gray-800 font-medium mb-2">Country</label>
              <select
                name="country"
                value={formData.address.country}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="" disabled>
                  Select Country
                </option>
                {countries.map((country) => (
          <option key={country.isoCode} value={{ name: country.name, isoCode: country.isoCode }}>
          {country.name}
        </option>
                ))}
              </select>
            </div>

            {/* State Dropdown */}
            <div className="w-full">
              <label className="block text-gray-800 font-medium mb-2">State</label>
              <select
                name="state"
                value={formData.address.state}
                onChange={handleAddressChange}
                disabled={!formData.address.country}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="" disabled>
                  Select State
                </option>
                {formData.address.country &&
                  states[formData.address.country]?.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="w-full">
              <label className="block text-gray-800 font-medium mb-2">City</label>
              <select
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                disabled={!formData.address.state}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="" disabled>
                  Select City
                </option>
                {formData.address.state &&
                  cities[formData.address.state]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Additional Address Details */}
          <div className="mt-4">
            <label className="block text-gray-800 font-medium mb-2">Additional Address Details</label>
            <textarea
              name="additionalDetails"
              value={formData.address.additionalDetails}
              onChange={handleAddressChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
