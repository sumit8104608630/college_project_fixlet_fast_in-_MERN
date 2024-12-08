import {createSlice} from "@reduxjs/toolkit"
// all action which is used for user login register and logout
import {fetchUser} from "./Actions/user_action.js"



const initialState={
    isLogin:false,
    userInfo:null,
    isLoading:true,
    error:null
}

export const authenticationSlice=createSlice({
    name:"authentication",
    initialState,
    reducers:{
        logout:(state)=>{
            state.isLoading=false;
            state.isLogin=false;
            state.userInfo=null;
            state.error=null;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.isLoading=true
            state.error=null;
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.isLogin=true
            state.userInfo=action.payload
            state.isLoading=false
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
            state.isLogin=false
            state.userInfo=null
        })
    }
})


export const {logout} =authenticationSlice.actions;

export default authenticationSlice.reducer;