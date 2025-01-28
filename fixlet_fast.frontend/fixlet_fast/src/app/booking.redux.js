import {createSlice} from"@reduxjs/toolkit"
import {get_all_booking} from "./Actions/booking_action.js"

//let's create initialState for service

const initialState={
    bookingLoading:true,
    bookingAllData:{},
    bookingError:null,
}

const bookingSlice=createSlice({
    name:"booking",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
                .addCase(get_all_booking.pending,(state)=>{
                    state.bookingLoading=true,
                    state.bookingError=null
                })
                .addCase(get_all_booking.fulfilled,(state,action)=>{
                    state.bookingLoading=false,
                    state.bookingAllData=action.payload;
                    state.bookingError=null
                })
                .addCase(get_all_booking.rejected,(state,action)=>{
                    state.bookingLoading=false
                    state.bookingError=action.payload
                    state.isLogin=false
                    state.userInfo=null})
    }
})

export default bookingSlice.reducer;