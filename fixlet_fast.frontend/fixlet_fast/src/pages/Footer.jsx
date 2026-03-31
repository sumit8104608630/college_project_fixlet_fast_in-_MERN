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
    <div className='bg-gray-100 mt-10 w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8'>
        <div className='mb-12 flex justify-center md:justify-start'>      
          <img className='w-48 md:w-56' src={logo} alt="Fixlet Fast Logo" />
        </div>
        
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-10'>
          <div className='flex flex-col'>
            <h1 className='text-lg font-bold text-gray-800 mb-4'>Company</h1>
            <ul className='flex flex-col gap-2'>
              <li><Link className='text-gray-600 hover:text-orange-500 transition-colors' to={"/about"}>About us</Link></li>
              <li><a href='#' className='text-gray-600 hover:text-orange-500 transition-colors'>Privacy Policy</a></li>
              <li><a href='#' className='text-gray-600 hover:text-orange-500 transition-colors'>Terms & Condition</a></li>
              <li><a href='#' className='text-gray-600 hover:text-orange-500 transition-colors'>Anti-discrimination policy</a></li>
              <li><a target='_blank' rel="noopener noreferrer" href="http://localhost:5174/" className='text-gray-600 hover:text-orange-500 transition-colors'>Careers</a></li>
            </ul>
          </div>

          <div className='flex flex-col'>
            <h1 className='text-lg font-bold text-gray-800 mb-4'>For Customers</h1>
            <ul className='flex flex-col gap-2'>
              <li><Link to={"/feedback"} className='text-gray-600 hover:text-orange-500 transition-colors'>Feedback</Link></li>
              <li><a href='#' className='text-gray-600 hover:text-orange-500 transition-colors'>Customer policy</a></li>
              <li><a href='#' className='text-gray-600 hover:text-orange-500 transition-colors'>Services near you</a></li>
              <li><Link className='text-gray-600 hover:text-orange-500 transition-colors' to={"/contact"}>Contact</Link></li>
            </ul>
          </div>

          <div className='flex flex-col'>
            <h1 className='text-lg font-bold text-gray-800 mb-4'>For Partners</h1>
            <ul className='flex flex-col gap-2'>
              <li><a href='#' className='text-gray-600 hover:text-orange-500 transition-colors'>Register as professional</a></li>
            </ul>
          </div>

          <div className='flex flex-col'>
            <h1 className='text-lg font-bold text-gray-800 mb-4'>Social Links</h1>
            <div className='flex gap-4 mb-6'>
              <a href='#' className='text-gray-600 hover:text-orange-500 transition-colors'><FaInstagram size={24} /></a>
              <a href='#' className='text-gray-600 hover:text-orange-500 transition-colors'><FaXTwitter size={24} /></a>
              <a href='#' className='text-gray-600 hover:text-orange-500 transition-colors'><CiFacebook size={24} /></a>
              <a href='#' className='text-gray-600 hover:text-orange-500 transition-colors'><CiLinkedin size={24} /></a>
            </div>
            <div className='flex flex-col gap-3'>
              <a href='#'><img className='w-28' src={apple} alt="App Store" /></a>
              <a href='#'><img className='w-28' src={play} alt="Play Store" /></a>
            </div>
          </div>
        </div>
        
        <hr className='border-gray-300 mb-6' />
        
        <div className='text-center'>
          <p className='text-gray-500 text-sm'>
            © {new Date().getFullYear()} Fixlet Fast. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer