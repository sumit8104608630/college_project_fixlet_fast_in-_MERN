import React from "react";

const Spinner = () => {
  return (
    <div className='w-full h-screen  fixed top-0 z-20 bg-white'>
    <div className="flex items-center justify-center h-screen ">
      <div className="relative flex flex-col  items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#FF5C00"></stop><stop offset=".3" stop-color="#FF5C00" stop-opacity=".9"></stop><stop offset=".6" stop-color="#FF5C00" stop-opacity=".6"></stop><stop offset=".8" stop-color="#FF5C00" stop-opacity=".3"></stop><stop offset="1" stop-color="#FF5C00" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="12" stroke-linecap="round" stroke-dasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#F97316" stroke-width="12" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
        <div className="mt-2 md:text-base text-xs text-center text-orange-500 font-medium">Please wait</div>
      </div>
    </div>
    </div>
  );
};

export default Spinner;