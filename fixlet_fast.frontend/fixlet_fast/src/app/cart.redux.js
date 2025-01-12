import { createSlice } from "@reduxjs/toolkit";
import {fetchCart,fetchCheckOut} from"./Actions/cart_action.js"

// let create the slice for the cart functionality

// first we will create th initialState 
const initialState = {
    cartLoading:true,
    cartItems:[],
    checkOutItem:{},
    cartError:null,
    checkOutItemLoading:true,
    checkOutItemError:null,
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.pending,(state)=>{
            state.cartLoading=true;
            state.cartItems=[];
            state.cartError=null;
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.cartLoading=false;
            state.cartItems=action.payload;
            state.cartError=null
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.cartLoading=false;
            state.cartError=[];
            state.cartError=action.payload;
        })
        .addCase(fetchCheckOut.pending,(state)=>{
            state.checkOutItemLoading=true;
            state.checkOutItem=[];
            state.checkOutItemError=null;
        })
        .addCase(fetchCheckOut.fulfilled,(state,action)=>{
            state.checkOutItemLoading=false;
            state.checkOutItem=action.payload;
            state.checkOutItemError=null
        })
        .addCase(fetchCheckOut.rejected,(state,action)=>{
            state.checkOutItemLoading=false;
            state.checkOutItem={};
            state.checkOutItemError=action.payload;
        })
    }
})

export default cartSlice.reducer