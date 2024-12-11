import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

function LayOut() {
  return (
    <div>
      <Header/>
     <div className='flex '> <Outlet/> </div>
      <Footer/>
    </div>
  )
}

export default LayOut