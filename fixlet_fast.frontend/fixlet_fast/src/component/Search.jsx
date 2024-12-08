import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
      <input
        type="text"
        placeholder="Search here..."
        className="w-full py-2 px-4 text-sm text-gray-700 rounded-l-lg focus:outline-none "
      />
      <button className="p-2  rounded-r-lg hover:text-orange-500 focus:outline-none">
        <FaSearch
          size={20}
          className="text-gray-400 cursor-pointer hover:text-orange-500 transition duration-300 ease-in-out"
        />
      </button>
    </div>
  );
}

export default SearchBar;
