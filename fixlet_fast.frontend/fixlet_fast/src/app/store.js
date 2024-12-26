import {configureStore} from "@reduxjs/toolkit"
import authenticationReducer from "./user.redux"
import service_data_ from "./service.redux"

const store=configureStore({
    reducer:{
        user:authenticationReducer,
        service: service_data_
    }
})


export default store