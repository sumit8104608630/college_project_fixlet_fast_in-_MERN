import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

function LayOut() {
  return (
    <div>
      <Header/>
      <div style={{
        
        overflow: "auto",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE and Edge
      }} className="flex overflow-auto scrollbar-none">
  <Outlet />
</div>
      <Footer/>
    </div>
  )
}

export default LayOut