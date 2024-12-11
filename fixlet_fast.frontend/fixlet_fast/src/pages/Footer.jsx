import React from 'react'
import logo from "../assets/Fixlet_Fast_AI.png"
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router'
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import apple from "../assets/apple.webp"
import play from "../assets/Google_Play_Store_badge_EN.svg.png"

function Footer() {
  return (
    <div className='bg-gray-200 mt-10'>
    <div className=' flex flex-col px-56 pt-14 '>
         <div className='mb-10'>      
          <img className='w-56' src={logo}/>
        </div>
        <div className='flex justify-between '>
      <div className='flex flex-col px-5 py-10'>
     
      <h1 className='text-xl font-semibold text-gray-700 mb-5'>Company</h1>
      <ul className='flex flex-col gap-3'>
        <li><Link className='text-gray-700 text-lg hover:underline' to={"/about"}>About us</Link></li>
        <li><a href='#' className='text-gray-700 text-lg hover:underline'>Privacy Policy</a></li>
        <li><a href='#' className='text-gray-700 text-lg hover:underline'>Terms & Condition</a></li>
        <li><a href='#' className='text-gray-700 text-lg hover:underline'>Anti-discrimination policy</a></li>
        <li><a href='#' className='text-gray-700 text-lg hover:underline'>Careers</a></li>
      </ul>
      </div>


      <div className='flex flex-col px-5 py-10'>
      <h1 className='text-xl font-semibold text-gray-700 mb-5'>For customer</h1>
      <ul className='flex flex-col gap-3'>
        <li><a href='#' className='text-gray-700 text-lg hover:underline'>Feed back</a></li>
        <li><a href='#' className='text-gray-700 text-lg hover:underline'> Customer policy</a></li>
        <li><a href='#' className='text-gray-700 text-lg hover:underline'>Service near you</a></li>
        <li><Link className='text-gray-700 text-lg hover:underline' to={"/contact"}>Contact</Link></li>
      </ul>
      </div>


      <div className='flex flex-col px-5 py-10'>
      <h1 className='text-xl font-semibold text-gray-700 mb-5'>For Partner</h1>
      <ul className='flex flex-col gap-3'>
        <li><a href='#' className='text-gray-700 text-lg hover:underline'>Register as professional</a></li>
      </ul>
      </div>

      <div className='flex items-start flex-col  px-5 py-10'>
      <h1 className='text-xl  font-semibold text-gray-700 mb-5'>Social link</h1>
      <ul className='flex flex mb-5 gap-3'>
        <li><a href='#' ><FaInstagram  size={25} className='text-gray-700' /></a></li>
        <li><a href='#' ><FaXTwitter  size={25} className='text-gray-700' /></a></li>
        <li><a href='#' ><CiFacebook   size={25} className='text-gray-700' /></a></li>
        <li><a href='#' ><CiLinkedin   size={25} className='text-gray-700' /></a></li>
      
      </ul>
      <div>
        <ul className='flex flex-col gap-2 items-center'>
          <li><a href='#'><img className='w-28' src={apple}></img></a></li>
          <li><a href='#'><img className='w-24' src={play}></img></a></li>
          </ul>
        </div>
      </div>
</div>
    </div>
    <hr className='w-full h-0.5 bg-gray-400'></hr>
    <div className='flex justify-center items-center py-5'>
      <span className='text-gray-600'> © Copyright 2024 Urban Company. All rights reserved. | CIN: U74140DL2014PTC274413</span>
    </div>
    </div>
  )
}

export default Footer