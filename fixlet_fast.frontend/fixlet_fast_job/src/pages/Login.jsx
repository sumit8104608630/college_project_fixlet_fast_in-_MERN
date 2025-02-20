import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Clear the error message
    setError("");

    // Submit the form data (replace with your login logic)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">Login</h2>
        {error && (
          <div className="text-red-600 bg-red-100 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            to={"/bePartner"}
            className="text-orange-500 hover:underline font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
