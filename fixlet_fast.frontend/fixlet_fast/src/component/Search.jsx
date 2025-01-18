import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

function SearchBar() {
  const [placeholder, setPlaceholder] = useState("Search here...");
  const placeholderOptions = [
    "Electrician...",
    "Plumber...",
    "Carpenter...",
    "AC service...",
    "Full cleaning..."
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setPlaceholder(placeholderOptions[index]);
      index = (index + 1) % placeholderOptions.length; // Loop through options
    }, 1500); // Update every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
      <input
        type="text"
        placeholder={`Search ${placeholder}`}
        className="w-full py-1 placeholder-gray-600 px-4 text-sm text-gray-700 rounded-l-lg focus:outline-none"
      />
      <button className="p-2 rounded-r-lg hover:text-orange-500 focus:outline-none">
        <FaSearch
          size={20}
          className="text-gray-400 cursor-pointer hover:text-orange-500 transition duration-300 ease-in-out"
        />
      </button>
    </div>
  );
}

export default SearchBar;
