import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
import { ContextProvider } from '../component/Context'
import { currentContext } from '../component/Context.jsx';
import { useContext } from 'react';
import  "../index.css"

function LayOut() {
const footerShow=useContext(currentContext)
  

  return (
    <div>
    
      <Header/>
        <div className="custom-dashBoardScroll">
          <Outlet/>
        </div>
     { footerShow.footerShow&&<Footer/> }
      
    </div>
  )
}

export default LayOut