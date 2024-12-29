import { createSlice } from "@reduxjs/toolkit";
import {fetchCart} from"./Actions/cart_action.js"

// let create the slice for the cart functionality

// first we will create th initialState 
const initialState = {
    isLoading:true,
    cartItems:[],
    error:null,
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.pending,(state)=>{
            state.isLoading=true;
            state.error=null;
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload;
            state.error=null
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
    }
})

export default cartSlice.reducer