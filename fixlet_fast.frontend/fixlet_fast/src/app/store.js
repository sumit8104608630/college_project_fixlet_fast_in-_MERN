import {configureStore} from "@reduxjs/toolkit"
import authenticationReducer from "./user.redux"


const store=configureStore({
    reducer:{
        user:authenticationReducer,
    }
})


export default store