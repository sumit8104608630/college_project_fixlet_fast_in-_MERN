import {createSlice} from"@reduxjs/toolkit"
import {fetchService} from "./Actions/service_action.js"

//let's create initialState for service

const initialState={
    loading:true,
    services_data:[],
    error:null,
}

// let's create slice for the service
const serviceSlice=createSlice({
    name:'service',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchService.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchService.fulfilled,(state,action)=>{
            state.loading=false,
            state.services_data=action.payload;
            state.error=null
        })
        .addCase(fetchService.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.isLogin=false
            state.userInfo=null
        })
    }
})

// export the redux

export default serviceSlice.reducer;