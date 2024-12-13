import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import './index.css'
import {Provider} from "react-redux"
import ServiceDetail from './pages/ServiceDetail.jsx'
import ServiceDetailPage from './pages/ServiceDetailPage.jsx'
import Dashbord from './pages/Dashbord.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import HelpCenter from './pages/HelpCenter.jsx'
import LayOut from './pages/LayOut.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Cart from './pages/Cart.jsx'
import BookingPage from './pages/BookingPage.jsx'
import PaymentHistory from './pages/PaymentHistory.jsx'
import About from './pages/About.jsx'
import Native from './pages/Native.jsx'
import store from './app/store.js'
import Contact from './pages/Contact.jsx'


const route=createBrowserRouter([
  {
    path:"*",
  element:<ErrorPage/>
  },
  {
    path:"/",
    element:<LayOut/>,
    children:[
      {
        path:"",
        element:<Dashbord/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/cart",
        element:<Cart/>
      },
      {
        path:"/helpCenter",
        element:<HelpCenter/>
      },
      {
        path:"/serviceDetail",
        element:<ServiceDetail/>
      },
      {
        path:"/serviceDetailPage/:id",
        element:<ServiceDetailPage/>
      },
      {
        path:"/booking_detail/:id",
        element:<BookingPage/>
      },
      {
        path:"/paymentHistory",
        element:<PaymentHistory/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/store",
        element:<Native/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      
        {
          path:"/booking_page:id",
          element:<Contact/>
        }
      
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={route}>
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
