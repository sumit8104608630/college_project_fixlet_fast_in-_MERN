import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import emptySearchImage from "../assets/EmptySearchResult.svg"
import { Link } from "react-router-dom"; // Use react-router-dom instead of react-router
function SearchBar() {
  const searchRef = useRef(null);
  const [showFilter, setFilter] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search here...");
  const placeholderOptions = [
    "Electrician...",
    "Plumber...",
    "Carpenter...",
    "AC service...",
    "Full home cleaning..."
  ];
  const [key, setKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { isLoading, userInfo } = useSelector((state) => state.user);

  const city = userInfo?.city;



// Typing animation for the placeholder
useEffect(() => {
  let currentOptionIndex = 0;
  let currentCharIndex = 0;
  let typingInterval;

  const typePlaceholder = () => {
    if (currentCharIndex <= placeholderOptions[currentOptionIndex].length) {
      setPlaceholder(
        placeholderOptions[currentOptionIndex].slice(0, currentCharIndex)
      );
      currentCharIndex++;
    } else {
      clearInterval(typingInterval);
      setTimeout(() => {
        currentCharIndex = 0;
        currentOptionIndex =
          (currentOptionIndex + 1) % placeholderOptions.length;
        typingInterval = setInterval(typePlaceholder, 100);
      }, 1500); // Pause for 1.5 seconds after typing
    }
  };

  typingInterval = setInterval(typePlaceholder, 100);

  return () => clearInterval(typingInterval);
}, []); // Run only once when the component mounts

// Fetch search results when the user types
useEffect(() => {
  if (key) {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/global/search?query=${key}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
    setFilter(true); // Show the filter dropdown when there's input
  } else {
    setSearchResults([]);
    setFilter(false); // Hide the filter dropdown when the input is cleared
  }
}, [key]); // Depend on `key` for search results
 // No dependency on `key`

  const handleChange = (e) => {
    setKey(e.target.value);
  };


  return (
    <div className="relative">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
        <input
          size={50}
          value={key}
          onChange={(e) => handleChange(e)}
          type="text"
          ref={searchRef}
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
      {showFilter && (
        <div className="absolute bg-white border-2 w-full rounded-lg mt-2 px-2 py-1">
          {searchResults.length===0?
          <div className="text-gray-500 flex flex-col items-center  text-center py-4">
            <img className="w-56" src={emptySearchImage}/>
              <p className="text-sm font-medium">No results found.</p>
              <p className="text-xs mt-1">Try searching with different keywords.</p>
          </div>
          :
          <ul
            style={{ maxHeight: "300px", overflowY: "auto" }}
            className="custom-scrollbar"
          >
            {searchResults.length > 0 && (
              <>
                {searchResults.map((item) => (
                  <ul key={item._id}>
                    <li>
                      <Link
                        to={`/serviceDetailPage/service_data_get?city=${
                          city || "mumbai"
                        }&categories=${item.serviceType}`}
                        state={{ headLine: `${item?.serviceTypeName}` }}
                        className="font-semibold text-xl "
                      >
                        <span>{item?.serviceTypeName}</span>
                      </Link>
                      <hr className="h-0.5 bg-gray-400 mt-1"></hr>
                      <ul className="my-3 flex flex-col gap-2">
                        {item.services?.map((serviceItem) => (
                          <li
                            className="flex hover:bg-gray-100 px-2 py-2 text-base font-medium text-gray-900"
                            key={serviceItem.serviceName}
                          >
                            <Link
                              to={`/serviceDetailPage/service_data_get?city=${
                                city || "mumbai"
                              }&categories=${item.serviceType}`}
                              state={{
                                headLine: `${item?.serviceTypeName}`,
                                scrollTo: `${serviceItem.servicePartName}`
                              }}
                              className="flex justify-between w-full items-center"
                            >
                              <span>{serviceItem.serviceName}</span>
                              <img
                                className="w-14"
                                src={serviceItem.serviceImage}
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                ))}
              </>
            )}
          </ul>
}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
