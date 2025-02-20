import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import './index.css'
import ErrorPage from './pages/ErrorPage.jsx'
import Home from './pages/Home.jsx'
import App from './App.jsx'
import LayOut from './pages/LayOut.jsx'
import BePartner from './pages/BePartnner.jsx'
import Register from "./pages/Register.jsx"
import JobNotify from './pages/JobNotify.jsx'
import Login from './pages/Login.jsx'

const route=createBrowserRouter([
  {
    path: '*',
    element: <ErrorPage/>,
  },
  {
    path: '/',
    element:<LayOut/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/bePartner",
        element:<Register/>
      },
      {
        path:"/jobNotify",
        element:<JobNotify/>
      },
      {
        path:"/login",
        element:<Login/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}>
    <App />
    </RouterProvider>
  </StrictMode>,
)
