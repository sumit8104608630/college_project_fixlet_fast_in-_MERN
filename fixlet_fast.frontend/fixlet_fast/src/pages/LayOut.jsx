import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
import { currentContext } from '../component/Context.jsx';
import { useContext } from 'react';
import  "../index.css"


function LayOut() {
const Context=useContext(currentContext)
  

  return (
    <div className=''>
    
      {Context.showHeader && <Header/>}
        <div className="custom-dashBoardScroll  w-full">
          <Outlet/>
        </div>
     { Context.footerShow&&<Footer/> }
      
    </div>
  )
}

export default LayOut