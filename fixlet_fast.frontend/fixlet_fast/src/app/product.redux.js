import {createSlice} from"@reduxjs/toolkit"
import {get_all_product} from "./Actions/product_action.js"

//let's create initialState for service

const initialState={
    productLoading:true,
    productData:[],
    productError:null,
}

const productSlice=createSlice({
    name:"product",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
                .addCase(get_all_product.pending,(state)=>{
                    state.productLoading=true,
                    state.productError=null
                })
                .addCase(get_all_product.fulfilled,(state,action)=>{
                    state.productLoading=false,
                    state.productData=action.payload;
                    state.productError=null
                })
                .addCase(get_all_product.rejected,(state,action)=>{
                    state.productLoading=false
                    state.productError=action.payload
                    state.isLogin=false
                    state.userInfo=null})
    }
})

export default productSlice.reducer;