import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import emptySearchImage from "../assets/EmptySearchResult.svg"
import { Link } from "react-router-dom"; // Use react-router-dom instead of react-router
function SearchBar() {
  const searchRef = useRef(null);
  const [showFilter, setFilter] = useState(false);
  const debouncing=useRef(null)
  const [searchLoading,setLoading]=useState(false)
  const [emtySearch,setEmptySearch]=useState(false)
  const [placeholder, setPlaceholder] = useState("Search here...");
  const placeholderOptions = [
    "Electrician...",
    "Plumber...",
    "Carpenter...",
    "AC service...",
    "Full home cleaning..."
  ];
  const [key, setKey] = useState("");
  const [showResult,setShowResult]=useState(false)
  const [searchResults, setSearchResults] = useState([]);
  const {userInfo} = useSelector((state) => state.user);
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
      }, 300); // Pause for 1.5 seconds after typing
    }
  };

  typingInterval = setInterval(typePlaceholder, 100);

  return () => clearInterval(typingInterval);
}, []); // Run only once when the component mounts

// Fetch search results when the user types
  // let's create the memoization for the search bar to cache the memory

useEffect(() => {
  
  if(debouncing.current)
  {
    clearTimeout(debouncing.current);
  }
  if(key.length>0){
    setLoading(true)
  setFilter(true); // Show the filter dropdown when there's input
  }
  else{
    setLoading(false)
    setFilter(false); // Hide the filter dropdown when there's no input
  }

  debouncing.current=setTimeout(()=>{
    if (key) {

      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/global/search?query=${key}`
          );
          if(response.status===200){
            if(response.data.length===0)
            {
              setLoading(false)
              setEmptySearch(true)
            }
            else{
              setLoading(false)
              setEmptySearch(false)
              setFilter(true);
            }
          }
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
  
      fetchSearchResults();
    } else {
      setSearchResults([]);
      
    }
  },600)
}, [key]); 


// Depend on `key` for search results
 // No dependency on `key`

  const handleChange = (e) => {
    setKey(e.target.value);
  };
  const handle_showResult=()=>{
    setShowResult(false)
    setKey("")
  }

console.log(userInfo)
  

  return (
    <div className="relative">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
        <input
          size={50}
          value={key}
          onFocus={()=>setShowResult(true)}
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
      {showFilter &&showResult && (
        <div className="absolute bg-white border-2 w-full rounded-lg mt-2 px-2 py-1">
          {emtySearch?
          <div className="text-gray-500 flex flex-col items-center  text-center py-4">
            <img className="w-56" src={emptySearchImage}/>
              <p className="text-sm font-medium">No results found.</p>
              <p className="text-xs mt-1">Try searching with different keywords.</p>
          </div>
          :
          
          <ul
            style={{ maxHeight: "300px", overflowY: "auto" }}
            className="custom-scrollbar"
          >{searchLoading?<div style={{height:"300px"}} className="flex justify-center items-center">
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
      </div>
          </div>:<>
            {searchResults.length > 0 && (
              <>
                {searchResults.map((item) => (
                  <ul key={item._id}>
                    <li>
                      <Link
                      onClick={handle_showResult}
                        to={`/serviceDetailPage/service_data_get?city=${
                          city || "mumbai"
                        }&categories=${item.serviceType}`}
                        state={{ headLine: `${item?.serviceTypeName}` }}
                        className="font-semibold text-xl "
                      >
                        <span >{item?.serviceTypeName}</span>
                      </Link>
                      <hr className="h-0.5 bg-gray-400 mt-1"></hr>
                      <ul className="my-3 flex flex-col gap-2">
                        {item.services?.map((serviceItem) => (
                          <li
                            className="flex hover:bg-gray-100 px-2 py-2 text-base font-medium text-gray-900"
                            key={serviceItem.serviceName}
                          >
                            <Link
                             onClick={handle_showResult}

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
            </>
}
          </ul>
}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
