import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

function LayOut() {
  return (
    <div>
      <Header/>
      <div className="h-screen   overflow-auto scrollbar-thin scrollbar-none scrollbar-track-gray-200">
  <Outlet  />
</div>
      <Footer/>
    </div>
  )
}

export default LayOut