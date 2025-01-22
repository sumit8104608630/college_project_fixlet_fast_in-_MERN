import {createSlice} from"@reduxjs/toolkit"
import {get_offers} from "./Actions/offers_action"


const initialState={
    offerLoading:true,
    offersData:[],
    offerError:null,
}

const offersSlice=createSlice({
    name:'service',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(get_offers.pending,(state)=>{
            state.offerLoading=true,
            state.offerError=null
        })
        .addCase(get_offers.fulfilled,(state,action)=>{
            state.offerLoading=false,
            state.offersData=action.payload;
            state.offerError=null
        })
        .addCase(get_offers.rejected,(state,action)=>{
            state.offerLoading=false
            state.offerError=action.payload
            state.isLogin=false
            state.userInfo=null
        })
    }
})


export default offersSlice.reducer;