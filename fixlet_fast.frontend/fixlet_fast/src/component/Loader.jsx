import React from "react";

const Spinner = () => {
  return (
    <div className='w-full h-screen  fixed top-0 z-20 bg-white'>
    <div className="flex items-center justify-center h-screen ">
      <div className="relative flex flex-col items-center">
        <svg
          version="1.1"
          viewBox="0 0 64 64"
          width="3em"
          height="3em"
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
        <div className="mt-2 text-center text-orange-500 font-medium">Please wait</div>
      </div>
    </div>
    </div>
  );
};

export default Spinner;
