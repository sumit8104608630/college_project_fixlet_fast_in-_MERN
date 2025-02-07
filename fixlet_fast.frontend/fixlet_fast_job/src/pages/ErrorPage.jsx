import React from 'react'
import { NavLink } from 'react-router'

function ErrorPage() {
  return (
    <div className='flex flex-col gap-8 justify-center  items-center' style={{height:"100vh"}}>
    <h1 className='text-6xl text-gray-700 border-b-2 py-5'>404 Error</h1>
    <li className='list-none text-2xl font-semibold text-gray-700'><NavLink className={"hover:text-blue-700"} to={-1}>Go Back</NavLink></li>
  </div>  
  )
}

export default ErrorPage