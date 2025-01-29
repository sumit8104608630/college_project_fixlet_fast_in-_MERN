import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { useContext } from 'react';
import { currentContext } from '../component/Context.jsx';
import logo from "../assets/Fixlet_Fast_AI.png"
import { Link } from 'react-router';
import ContactForm from '../component/ContactUs.jsx';
const apiUrl=import.meta.env.VITE_BACKEND_API_URL


function About() {
    const Context=useContext(currentContext);
      const [user_globally,setUser_globally]=useState(0)
      const [totalCity,setCount]=useState(0);
      useEffect(()=>{
        Context.setFooterShow(false)
        return ()=>{
          Context.setFooterShow(true)
        }
      },[Context])

      useEffect(()=>{
        axios.get(`${apiUrl}/global/user_count`).then(response=>response.data).then(data=>{
          setUser_globally(data.data.totalUser)
        })
        axios.get(`${apiUrl}/global/no_of_area`).then(response=>response.data).then(data=>{
          setCount(data.data)
        })
              return ()=>{
              }
            },[])
  
  return (
    <>
    <div className='py-16 bg-gray-100'>
      <div className='w-full justify-center bg-white'>
        <h1 className='text-3xl font-bold text-gray-700 text-center py-5 '>ABOUT US</h1>
      </div>
      <div className='mt-10   px-56'>
        <div className=' flex flex-col rounded gap-5 bg-white px-10 py-10'>
          <p className='px-10 font-medium text-lg text-justify text-gray-700'>At <strong className='text-gray-900'>Fixlet Fast</strong>, we believe that home maintenance should be effortless, reliable, and accessible to everyone. Our platform connects homeowners with skilled professionals, ensuring top-quality service for all your household needs. From appliance repairs to furniture assembly, we offer a wide range of trusted services to keep your home running smoothly.</p>
          <p className='px-10 font-medium text-lg text-justify text-gray-700'>With a commitment to excellence, transparency, and customer satisfaction, we make it easy to book, track, and manage your home maintenance tasks—all in just a few clicks. Experience hassle-free service with Fixlet Fast, where convenience meets reliability!</p>
          <p className='px-10 font-medium text-lg mt-5 text-justify text-gray-700'><strong className='text-xl'>Our Goal:</strong> To provide fast, reliable, and affordable home maintenance services, ensuring every household enjoys convenience, quality, and peace of mind.</p>
          <div className='mt-14 flex  gap-20 w-full justify-center'>
              <p className='flex flex-col items-center'>
                <span className='text-lg text-gray-600 font-bold'>50,000+</span>
                <span className='text-lg font-medium text-gray-700'>Trained Professionals</span>
              </p>
              <p className='flex flex-col items-center'>
                <span className='text-lg text-gray-600 font-bold'>{user_globally}M</span>
                <span className='text-lg font-medium text-gray-700'>Happy Customers</span>
              </p>
              <p className='flex flex-col items-center'>
                <span className='text-lg text-gray-600 font-bold'>{totalCity}</span>
                <span className='text-lg font-medium text-gray-700'>Cities</span>
              </p>
              <p className='flex flex-col items-center'>
                <span className='text-lg text-gray-600 font-bold'>{"4"}</span>
                <span className='text-lg font-medium text-gray-700'>Country</span>
              </p>
          </div>
          <div className='mt-10'>
            <h1 className='text-2xl font-semibold text-center'>Our Team</h1>
            <div className='my-10  flex gap-10 flex-wrap justify-center'>
              <div className='w-max rounded bg-gray-100 py-8 px-20'>
                <div className='flex flex-col gap-2 items-center '>
                  <section>
                <img className='rounded-full w-20' src={"https://avatars.githubusercontent.com/u/114969811?v=4"} />
                  </section>
                <section className='flex flex-col items-center gap-1'>
                <span className='text-xl font-medium text-gray-600'>Sumit Sharma</span>
                <span className='text-base font-normal text-gray-600'>CEO-Co Founder</span>
                </section>
                <p className='flex gap-2'>
                  <span><a target='_blank' href='https://www.linkedin.com/in/sumit-sharma-204842223/'><FaLinkedin size={25} className='text-gray-800'/></a></span>
                  <span><a target='_blank' href='https://github.com/sumit8104608630'><FaSquareGithub size={25} className='text-gray-800'/></a></span>
                  <span><a target='_blank' href='#'><FaInstagramSquare size={25} className='text-gray-800'/></a></span>
                </p>
                </div>
              </div>
              <div className='w-max rounded bg-gray-100 py-8 px-20'>
                <div className='flex flex-col gap-2 items-center '>
                  <section>
                <img className='rounded-full w-20' src={"https://res.cloudinary.com/dcsmp3yjk/image/upload/v1738154039/Screenshot_2025-01-29_180212_bkuxx9.png"} />
                  </section>
                <section className='flex flex-col items-center gap-1'>
                <span className='text-xl font-medium text-gray-600'>Akash Tiwari</span>
                <span className='text-base font-normal text-gray-600'>CEO-Co Founder</span>
                </section>
                <p className='flex gap-2'>
                  <span><a target='_blank' href='#'><FaLinkedin size={25} className='text-gray-800'/></a></span>
                  <span><a target='_blank' href='#'><FaSquareGithub size={25} className='text-gray-800'/></a></span>
                  <span><a target='_blank' href='#'><FaInstagramSquare size={25} className='text-gray-800'/></a></span>
                </p>
                </div>
              </div>
              <div className='w-max rounded bg-gray-100 py-8 px-20'>
                <div className='flex flex-col gap-2 items-center '>
                  <section>
                <img className='rounded-full w-20' src={"https://res.cloudinary.com/dcsmp3yjk/image/upload/v1738154038/Screenshot_2025-01-29_180236_m0gf4n.png"} />
                  </section>
                <section className='flex flex-col items-center gap-1'>
                <span className='text-xl font-medium text-gray-600'>Rajiv Sharma</span>
                <span className='text-base font-normal text-gray-600'>CEO-Co Founder</span>
                </section>
                <p className='flex gap-2'>
                  <span><a target='_blank' href='https://www.linkedin.com/in/devrajiv/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BrGPpDiI0Qc6gPW6SX4b%2BMA%3D%3D'><FaLinkedin size={25} className='text-gray-800'/></a></span>
                  <span><a target='_blank' href='https://github.com/DevRajivSharma'><FaSquareGithub size={25} className='text-gray-800'/></a></span>
                  <span><a target='_blank' href='#'><FaInstagramSquare size={25} className='text-gray-800'/></a></span>
                </p>
                </div>
              </div>
              <div className='w-max rounded bg-gray-100 py-8 px-20'>
                <div className='flex flex-col gap-2 items-center '>
                  <section>
                <img className='rounded-full w-20' src={"https://res.cloudinary.com/dcsmp3yjk/image/upload/v1738154036/Screenshot_2025-01-29_180146_ssji3g.png"} />
                  </section>
                <section className='flex flex-col items-center gap-1'>
                <span className='text-xl font-medium text-gray-600'>Rahul Yadav</span>
                <span className='text-base font-normal text-gray-600'>CEO-Co Founder</span>
                </section>
                <p className='flex gap-2'>
                  <span><a target='_blank' href='https://www.linkedin.com/in/rahulyadav12/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BRtWSZ9MpQzuqlF%2FGtIzhcQ%3D%3D'><FaLinkedin size={25} className='text-gray-800'/></a></span>
                  <span><a target='_blank' href='https://github.com/rahu-lava'><FaSquareGithub size={25} className='text-gray-800'/></a></span>
                  <span><a target='_blank' href='#'><FaInstagramSquare size={25} className='text-gray-800'/></a></span>
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
       <footer>
       <div className='bg-gray-200  xl:block hidden '>
     <div className=' flex justify-between px-40 pt-14 '>
      <div>
          <div className='mb-10'>      
           <img className='w-56' src={logo}/>
         </div>
         <div className='flex flex-col '>
       <div className='flex flex-col px-5 '>
      
       <h1 className='text-xl font-semibold text-gray-700 mb-2'>Company</h1>
       <ul className='flex  gap-3'>
         <li><a target='_blank' href='#' className='text-gray-700 text-lg hover:underline'>Privacy Policy</a></li>
         <li><a target='_blank' href='#' className='text-gray-700 text-lg hover:underline'>Terms & Condition</a></li>
         <li><a target='_blank' href='#' className='text-gray-700 text-lg hover:underline'>Anti-discrimination policy</a></li>
         <li><a target='_blank' href='#' className='text-gray-700 text-lg hover:underline'>Careers</a></li>
       </ul>
       </div>
 
 
       <div className='flex flex-col px-5 py-10'>
       <h1 className='text-xl font-semibold text-gray-700 mb-2'>For customer</h1>
       <ul className='flex  gap-3'>
         <li><Link to={"/feedback"} className='text-gray-700 text-lg hover:underline'>Feed back</Link></li>
         <li><a target='_blank' href='#' className='text-gray-700 text-lg hover:underline'> Customer policy</a></li>
         <li><a target='_blank' href='#' className='text-gray-700 text-lg hover:underline'>Service near you</a></li>
         <li><Link className='text-gray-700 text-lg hover:underline' to={"/contact"}>Contact</Link></li>
       </ul>
       </div>
    </div>
  
 </div>
 <div className='mb-5'>
      <ContactForm/>
    </div>
     </div>
     <hr className='w-full h-0.5 bg-gray-400'></hr>
     <div className='flex justify-center items-center py-5'>
       <span className='text-gray-600'> © Copyright 2024 Urban Company. All rights reserved. | CIN: U74140DL2014PTC274413</span>
     </div>
     </div>
       </footer>
       </>
  )
}

export default About