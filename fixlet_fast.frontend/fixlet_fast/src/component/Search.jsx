import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import axios from "axios"
import { useSelector } from "react-redux";
import { Link } from "react-router";
function SearchBar() {
  const searchRef=useRef(null)
  const [showFilter,setFilter]=useState(false);
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
  const {isLoading,userInfo}=useSelector((state)=>state.user);

  const city=userInfo?.city

  useEffect(() => {
    if(key!==""){
      setFilter(true)
    }
    else{
      setFilter(false)
    }
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholderOptions[index]);
      index = (index + 1) % placeholderOptions.length; // Loop through options
    }, 1500); // Update every 1.5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  },[key]);

  const handleChange = (e) => {
    setKey(e.target.value);
  };

  useEffect(()=>{
    axios.get(`http://localhost:8000/global/search?query=${key}`).then((Response)=>{
      setSearchResults(Response.data)
    })
  },[key])

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
      {showFilter&&
      <div className="absolute bg-white border-2 w-full rounded-lg mt-2 px-2 py-1">
        <ul style={{ maxHeight: '300px', overflowY: 'auto' }} className="custom-scrollbar">
          {searchResults.length>0&&<>
          {searchResults?.map((item)=>{
            return(<ul key={item._id}>
              <li>
              <Link 
               to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=${item.serviceType}`} state={{ headLine:  `${item?.serviceTypeName}` }}
              className="font-semibold text-xl "><span>{item?.serviceTypeName}</span></Link>
              <hr className="h-0.5 bg-gray-400 mt-1"></hr>
                <ul className="my-3 flex flex-col gap-2">
                  {item.services?.map((serviceItem)=>{
                    return(<li className="flex hover:bg-gray-100 px-2 py-2 text-base font-medium text-gray-900" key={serviceItem.serviceName}><Link
                      to={`/serviceDetailPage/service_data_get?city=${city||"mumbai"}&categories=${item.serviceType}`} state={{ headLine:  `${item?.serviceTypeName}`, scrollTo:`${serviceItem.servicePartName}` }}
                      className="flex justify-between w-full items-center"><span>{serviceItem.serviceName}</span><img className="w-14" src={serviceItem.serviceImage}/></Link></li>)
                  })
          }</ul>
                
              </li>
              </ul>)
          })

          }</>
          }
        </ul>
      </div>
}
    </div>
  );
}

export default SearchBar;
