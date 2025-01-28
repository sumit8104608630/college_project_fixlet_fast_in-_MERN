import {configureStore} from "@reduxjs/toolkit"
import authenticationReducer from "./user.redux"
import service_data_ from "./service.redux"
import cart_data from "./cart.redux.js"
import store_data from "./product.redux.js"
import offers_data from"./offer.redux.js"
import booking_data from "./booking.redux"

const store=configureStore({
    reducer:{
        user:authenticationReducer,
        service: service_data_,
        cart:cart_data,
        store:store_data,
        offers:offers_data,
        booking:booking_data,
    }
})


export default store