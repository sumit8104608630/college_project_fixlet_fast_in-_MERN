import { createSlice } from "@reduxjs/toolkit";
import {fetchCart} from"./Actions/cart_action.js"

// let create the slice for the cart functionality

// first we will create th initialState 
const initialState = {
    cartLoading:true,
    cartItems:[],
    cartError:null,
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.pending,(state)=>{
            state.cartLoading=true;
            state.cartError=null;
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.cartLoading=false;
            state.cartItems=action.payload;
            state.cartError=null
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.cartLoading=false;
            state.cartError=action.payload;
        })
    }
})

export default cartSlice.reducer