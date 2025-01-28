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
import Store from './pages/Store.jsx'
import store from './app/store.js'
import Contact from './pages/Contact.jsx'
import { ContextProvider } from './component/Context.jsx'
import Account from './component/Account.jsx'
import ChangePassword from './component/ChangePassword.jsx'
import ChangeEmail from './component/ChangeEmail.jsx'
import ForgotPassword from './component/ForgotPassword.jsx'
import Feedback from './pages/Feedback.jsx'
import MyBooking from './pages/MyBooking.jsx'


const route=createBrowserRouter([
  {
    path:"*",
  element:<ErrorPage/>,
  },
  {
    path:"/login/forgotpassword",
    element:<ForgotPassword/>
  },
  {
    path: "/helpCenter",
    element: <HelpCenter />,
  },
  {
    path: "/account",
    element: <Account />,
    
  },
   {
    path:"/paymentHistory",
    element:<PaymentHistory/>
  },

  {
    path: "/changePassword",
    element: <ChangePassword/>,
  },
  {
    path: "/changeEmail",
    element: <ChangeEmail/>,
  }
,
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
        path:"/serviceDetailPage/:service_name",
        element:<ServiceDetailPage/>
      },
      {
        path:"/check_out",
        element:<BookingPage/>
      },
      {
        path:"/myBooking",
        element:<MyBooking/>
      },
   
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/store/:store",
        element:<Store/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      
      {
        path:"/booking_page:id",
        element:<Contact/>
      },
      {
        path:"/feedback",
        element:<Feedback/>
      }
      
    ]
  },

])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <Provider store={store}>
    <RouterProvider router={route}>
    </RouterProvider>
    </Provider>
    </ContextProvider>
  </StrictMode>,
)
