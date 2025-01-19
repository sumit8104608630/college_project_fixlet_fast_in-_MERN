import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
import { currentContext } from '../component/Context.jsx';
import { useContext } from 'react';
import  "../index.css"


function LayOut() {
const footerShow=useContext(currentContext)
  

  return (
    <div className=''>
    
      <Header/>
        <div className="custom-dashBoardScroll  pb-16 w-full">
          <Outlet/>
        </div>
     { footerShow.footerShow&&<Footer/> }
      
    </div>
  )
}

export default LayOut