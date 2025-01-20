import React from "react";

const Spinner = () => {
  return (
    <div className="w-full h-screen fixed top-0 z-20 bg-white">
      <div className="flex items-center justify-center h-screen">
        <div className="relative flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className="w-16 h-16 md:w-20 md:h-20"
          >
            <radialGradient id="a12" cx="0.66" fx="0.66" cy="0.3125" fy="0.3125" gradientTransform="scale(1.5)">
              <stop offset="0" stopColor="#FF5C00" />
              <stop offset="0.3" stopColor="#FF5C00" stopOpacity="0.9" />
              <stop offset="0.6" stopColor="#FF5C00" stopOpacity="0.6" />
              <stop offset="0.8" stopColor="#FF5C00" stopOpacity="0.3" />
              <stop offset="1" stopColor="#FF5C00" stopOpacity="0" />
            </radialGradient>
            <circle
              transformOrigin="center"
              fill="none"
              stroke="url(#a12)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray="200 1000"
              strokeDashoffset="0"
              cx="100"
              cy="100"
              r="70"
            >
              <animateTransform
                type="rotate"
                attributeName="transform"
                calcMode="spline"
                dur="1s"
                values="360;0"
                keyTimes="0;1"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              transformOrigin="center"
              fill="none"
              opacity="0.2"
              stroke="#F97316"
              strokeWidth="12"
              strokeLinecap="round"
              cx="100"
              cy="100"
              r="70"
            />
          </svg>
          <div className="mt-4 md:text-base text-sm text-center text-orange-500 font-medium">
            Please wait
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
