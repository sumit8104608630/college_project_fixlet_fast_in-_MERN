import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
import { ContextProvider } from '../component/Context'
function LayOut() {

  


  return (
    <div>
    <ContextProvider>
      <Header/>
        <div className="">
          <Outlet/>
        </div>
      <Footer/>
    </ContextProvider>
      
    </div>
  )
}

export default LayOut