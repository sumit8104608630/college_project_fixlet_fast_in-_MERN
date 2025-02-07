import React from "react";
import "../index.css"
function Home(){

    return(<>
    <main className="md:px-30">
     <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-16 bg-white">
      {/* Left Content */}
      <div className="text-center md:text-left max-w-lg">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
          Empowered people, <br className="hidden md:block" /> empowering people.
        </h1>
        <p className="mt-4 text-gray-700 text-lg">
          Be part of a global community delivering services to millions of homes
          and serving millions of professionals.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-6 py-2 rounded-lg font-semibold">
            View open positions
          </button>
          <button className="border hover:bg-gray-100 cursor-pointer border-gray-300 px-6 py-2 rounded-lg font-semibold">
            Inside UC
          </button>
        </div>
      </div>

      {/* Right Side - Image Grid */}   
      <div className="mt-12 md:mt-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="w-24 sm:w-32 h-40 md:h-56 flex items-center overflow-hidden">
          <img
            src="https://res.cloudinary.com/dcsmp3yjk/image/upload/v1738154036/Screenshot_2025-01-29_180146_ssji3g.png"
            alt="Person 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-24 sm:w-32 h-32 md:h-40 flex items-center overflow-hidden">
          <img
            src="https://res.cloudinary.com/dcsmp3yjk/image/upload/v1738154039/Screenshot_2025-01-29_180212_bkuxx9.png"
            alt="Person 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-24 sm:w-32 h-40 md:h-56 flex items-center overflow-hidden">
          <img
            src="https://avatars.githubusercontent.com/u/114969811?v="
            alt="Person 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-24 sm:w-32 h-32 md:h-40 flex items-center overflow-hidden">
          <img
            src="https://res.cloudinary.com/dcsmp3yjk/image/upload/v1738154038/Screenshot_2025-01-29_180236_m0gf4n.png"
            alt="Person 4"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-24 sm:w-32 h-40 md:h-56 flex items-center overflow-hidden">
          <img
            src="https://res.cloudinary.com/dcsmp3yjk/image/upload/v1738154036/Screenshot_2025-01-29_180146_ssji3g.png"
            alt="Person 5"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-24 sm:w-32 h-32 md:h-40 flex items-center overflow-hidden">
          <img
            src="https://res.cloudinary.com/dcsmp3yjk/image/upload/v1738154036/Screenshot_2025-01-29_180146_ssji3g.png"
            alt="Person 6"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    </main>
    </>)
}

export default Home