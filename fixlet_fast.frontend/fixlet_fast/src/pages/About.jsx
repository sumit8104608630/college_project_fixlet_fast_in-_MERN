import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { useContext } from 'react';
import { currentContext } from '../component/Context.jsx';
import logo from "../assets/Fixlet_Fast_AI.png"
import { Link } from 'react-router';
import ContactForm from '../component/ContactUs.jsx';

const apiUrl = import.meta.env.VITE_BACKEND_API_URL

function About() {
  const Context = useContext(currentContext);
  const [user_globally, setUser_globally] = useState(0)
  const [totalCity, setCount] = useState(0);

  useEffect(() => {
    Context.setFooterShow(false)
    return () => {
      Context.setFooterShow(true)
    }
  }, [Context])

  useEffect(() => {
    axios.get(`${apiUrl}/global/user_count`).then(response => response.data).then(data => {
      setUser_globally(data.data.totalUser)
    })
    axios.get(`${apiUrl}/global/no_of_area`).then(response => response.data).then(data => {
      setCount(data.data)
    })
    return () => {
    }
  }, [])

  return (
    <>
      <div className='pb-8 md:py-16 bg-gray-100 min-h-screen'>
        {/* Header Section */}
        <div className='w-full justify-center bg-white'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-700 text-center py-4 md:py-5'>ABOUT US</h1>
        </div>

        {/* Main Content */}
        <div className='mt-6 md:mt-10 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-56'>
          <div className='flex flex-col rounded-lg gap-4 md:gap-5 bg-white px-4 sm:px-6 md:px-10 py-6 md:py-10 shadow-sm'>
            
            {/* About Text */}
            <p className='px-2 sm:px-4 md:px-10 font-medium text-base md:text-lg text-justify text-gray-700 leading-relaxed'>
              At <strong className='text-gray-900'>Fixlet Fast</strong>, we believe that home maintenance should be effortless, reliable, and accessible to everyone. Our platform connects homeowners with skilled professionals, ensuring top-quality service for all your household needs. From appliance repairs to furniture assembly, we offer a wide range of trusted services to keep your home running smoothly.
            </p>
            
            <p className='px-2 sm:px-4 md:px-10 font-medium text-base md:text-lg text-justify text-gray-700 leading-relaxed'>
              With a commitment to excellence, transparency, and customer satisfaction, we make it easy to book, track, and manage your home maintenance tasks—all in just a few clicks. Experience hassle-free service with Fixlet Fast, where convenience meets reliability!
            </p>
            
            <p className='px-2 sm:px-4 md:px-10 font-medium text-base md:text-lg mt-3 md:mt-5 text-justify text-gray-700 leading-relaxed'>
              <strong className='text-lg md:text-xl'>Our Goal:</strong> To provide fast, reliable, and affordable home maintenance services, ensuring every household enjoys convenience, quality, and peace of mind.
            </p>

            {/* Stats Section */}
            <div className='mt-8 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-20 w-full justify-items-center'>
              <div className='flex flex-col items-center text-center'>
                <span className='text-base md:text-lg text-gray-600 font-bold'>50,000+</span>
                <span className='text-sm md:text-lg font-medium text-gray-700'>Trained Professionals</span>
              </div>
              <div className='flex flex-col items-center text-center'>
                <span className='text-base md:text-lg text-gray-600 font-bold'>{user_globally}M</span>
                <span className='text-sm md:text-lg font-medium text-gray-700'>Happy Customers</span>
              </div>
              <div className='flex flex-col items-center text-center'>
                <span className='text-base md:text-lg text-gray-600 font-bold'>{totalCity}</span>
                <span className='text-sm md:text-lg font-medium text-gray-700'>Cities</span>
              </div>
              <div className='flex flex-col items-center text-center'>
                <span className='text-base md:text-lg text-gray-600 font-bold'>4</span>
                <span className='text-sm md:text-lg font-medium text-gray-700'>Countries</span>
              </div>
            </div>

            {/* Team Section */}
            <div className='mt-8 md:mt-10'>
              <h1 className='text-xl md:text-2xl font-semibold text-center mb-6 md:mb-10'>Our Team</h1>
              
              {/* Team Cards Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>
                
                {/* Team Member 1 */}
                <div className='bg-gray-100 rounded-lg py-6 px-4 flex flex-col items-center'>
                  <div className='flex flex-col gap-3 items-center'>
                    <img 
                      className='rounded-full w-16 md:w-20 h-16 md:h-20 object-cover' 
                      src="https://avatars.githubusercontent.com/u/114969811?v=4" 
                      alt="Sumit Sharma"
                    />
                    <div className='flex flex-col items-center gap-1 text-center'>
                      <span className='text-lg md:text-xl font-medium text-gray-600'>Sumit Sharma</span>
                      <span className='text-sm md:text-base font-normal text-gray-600'>CEO-Co Founder</span>
                    </div>
                    <div className='flex gap-2'>
                      <a target='_blank' href='https://www.linkedin.com/in/sumit-sharma-204842223/' className='hover:scale-110 transition-transform'>
                        <FaLinkedin size={20} className='text-gray-800'/>
                      </a>
                      <a target='_blank' href='https://github.com/sumit8104608630' className='hover:scale-110 transition-transform'>
                        <FaSquareGithub size={20} className='text-gray-800'/>
                      </a>
                      <a target='_blank' href='#' className='hover:scale-110 transition-transform'>
                        <FaInstagramSquare size={20} className='text-gray-800'/>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Team Member 2 */}
                <div className='bg-gray-100 rounded-lg py-6 px-4 flex flex-col items-center'>
                  <div className='flex flex-col gap-3 items-center'>
                    <img 
                      className='rounded-full w-16 md:w-20 h-16 md:h-20 object-cover' 
                      src="https://res.cloudinary.com/dcsmp3yjk/image/upload/v1738154039/Screenshot_2025-01-29_180212_bkuxx9.png" 
                      alt="Akash Tiwari"
                    />
                    <div className='flex flex-col items-center gap-1 text-center'>
                      <span className='text-lg md:text-xl font-medium text-gray-600'>Akash Tiwari</span>
                      <span className='text-sm md:text-base font-normal text-gray-600'>CEO-Co Founder</span>
                    </div>
                    <div className='flex gap-2'>
                      <a target='_blank' href='#' className='hover:scale-110 transition-transform'>
                        <FaLinkedin size={20} className='text-gray-800'/>
                      </a>
                      <a target='_blank' href='#' className='hover:scale-110 transition-transform'>
                        <FaSquareGithub size={20} className='text-gray-800'/>
                      </a>
                      <a target='_blank' href='#' className='hover:scale-110 transition-transform'>
                        <FaInstagramSquare size={20} className='text-gray-800'/>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Team Member 3 */}
                <div className='bg-gray-100 rounded-lg py-6 px-4 flex flex-col items-center'>
                  <div className='flex flex-col gap-3 items-center'>
                    <img 
                      className='rounded-full w-16 md:w-20 h-16 md:h-20 object-cover' 
                      src="https://res.cloudinary.com/dcsmp3yjk/image/upload/v1738154038/Screenshot_2025-01-29_180236_m0gf4n.png" 
                      alt="Rajiv Sharma"
                    />
                    <div className='flex flex-col items-center gap-1 text-center'>
                      <span className='text-lg md:text-xl font-medium text-gray-600'>Rajiv Sharma</span>
                      <span className='text-sm md:text-base font-normal text-gray-600'>CEO-Co Founder</span>
                    </div>
                    <div className='flex gap-2'>
                      <a target='_blank' href='https://www.linkedin.com/in/devrajiv/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BrGPpDiI0Qc6gPW6SX4b%2BMA%3D%3D' className='hover:scale-110 transition-transform'>
                        <FaLinkedin size={20} className='text-gray-800'/>
                      </a>
                      <a target='_blank' href='https://github.com/DevRajivSharma' className='hover:scale-110 transition-transform'>
                        <FaSquareGithub size={20} className='text-gray-800'/>
                      </a>
                      <a target='_blank' href='#' className='hover:scale-110 transition-transform'>
                        <FaInstagramSquare size={20} className='text-gray-800'/>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Team Member 4 */}
                <div className='bg-gray-100 rounded-lg py-6 px-4 flex flex-col items-center'>
                  <div className='flex flex-col gap-3 items-center'>
                    <img 
                      className='rounded-full w-16 md:w-20 h-16 md:h-20 object-cover' 
                      src="https://res.cloudinary.com/dcsmp3yjk/image/upload/v1738154036/Screenshot_2025-01-29_180146_ssji3g.png" 
                      alt="Rahul Yadav"
                    />
                    <div className='flex flex-col items-center gap-1 text-center'>
                      <span className='text-lg md:text-xl font-medium text-gray-600'>Rahul Yadav</span>
                      <span className='text-sm md:text-base font-normal text-gray-600'>CEO-Co Founder</span>
                    </div>
                    <div className='flex gap-2'>
                      <a target='_blank' href='https://www.linkedin.com/in/rahulyadav12/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BRtWSZ9MpQzuqlF%2FGtIzhcQ%3D%3D' className='hover:scale-110 transition-transform'>
                        <FaLinkedin size={20} className='text-gray-800'/>
                      </a>
                      <a target='_blank' href='https://github.com/rahu-lava' className='hover:scale-110 transition-transform'>
                        <FaSquareGithub size={20} className='text-gray-800'/>
                      </a>
                      <a target='_blank' href='#' className='hover:scale-110 transition-transform'>
                        <FaInstagramSquare size={20} className='text-gray-800'/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className='bg-gray-200'>
          <div className='flex flex-col lg:flex-row justify-between px-4 sm:px-8 md:px-16 lg:px-40 pt-8 md:pt-14 gap-8 lg:gap-0'>
            
            {/* Logo and Company Info */}
            <div className='flex flex-col items-center lg:items-start'>
              <div className='mb-6 md:mb-10'>
                <img className='w-40 sm:w-48 md:w-56' src={logo} alt="Fixlet Fast Logo"/>
              </div>
              
              <div className='flex flex-col gap-6 md:gap-8 w-full'>
                {/* Company Links */}
                <div className='flex flex-col px-2 sm:px-5'>
                  <h1 className='text-lg md:text-xl font-semibold text-gray-700 mb-3 text-center lg:text-left'>Company</h1>
                  <ul className='flex flex-col sm:flex-row gap-2 sm:gap-3 text-center lg:text-left'>
                    <li><a target='_blank' href='#' className='text-gray-700 text-base md:text-lg hover:underline'>Privacy Policy</a></li>
                    <li><a target='_blank' href='#' className='text-gray-700 text-base md:text-lg hover:underline'>Terms & Condition</a></li>
                    <li><a target='_blank' href='#' className='text-gray-700 text-base md:text-lg hover:underline'>Anti-discrimination policy</a></li>
                    <li><a target='_blank' href='#' className='text-gray-700 text-base md:text-lg hover:underline'>Careers</a></li>
                  </ul>
                </div>

                {/* Customer Links */}
                <div className='flex flex-col px-2 sm:px-5'>
                  <h1 className='text-lg md:text-xl font-semibold text-gray-700 mb-3 text-center lg:text-left'>For Customer</h1>
                  <ul className='flex flex-col sm:flex-row gap-2 sm:gap-3 text-center lg:text-left'>
                    <li><Link to={"/feedback"} className='text-gray-700 text-base md:text-lg hover:underline'>Feedback</Link></li>
                    <li><a target='_blank' href='#' className='text-gray-700 text-base md:text-lg hover:underline'>Customer Policy</a></li>
                    <li><a target='_blank' href='#' className='text-gray-700 text-base md:text-lg hover:underline'>Service Near You</a></li>
                    <li><Link className='text-gray-700 text-base md:text-lg hover:underline' to={"/contact"}>Contact</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className='w-full lg:w-auto lg:mb-5'>
              <ContactForm/>
            </div>
          </div>

          {/* Footer Bottom */}
          <hr className='w-full h-0.5 bg-gray-400 mt-8'/>
          <div className='flex justify-center items-center py-4 md:py-5 px-4'>
            <span className='text-gray-600 text-xs sm:text-sm md:text-base text-center'>
              © Copyright 2024 Urban Company. All rights reserved. | CIN: U74140DL2014PTC274413
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default About