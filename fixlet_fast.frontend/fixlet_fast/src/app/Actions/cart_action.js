import {createAsyncThunk} from "@reduxjs/toolkit"
const apiUrl = import.meta.env.VITE_BACKEND_API_URL

// let create the fetchCart functionality

export const fetchCart=createAsyncThunk(
    "cart/fetchCart",
    async(_,{rejectWithValue})=>{
    try {
        const response=await fetch(`${apiUrl}/cart/get_all_services_cart`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
            credentials:"include"
        });
        const data=await response.json();
        if(response.status==401){
            return []
        }
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData.message || "Failed to fetch cart");
          }
        if(!data.data){
            return []
        }
        return data.data;

    } 
    catch (error) {
        return rejectWithValue(error.message)
    }
})

export const fetchCheckOut=createAsyncThunk(
    // let create the fetchCheckOut functionality
    "cart/cartCheckOut",
    async({state,city,categories},{rejectWithValue})=>{
        try {
            const response=await fetch(`${apiUrl}/cart/cart_checkout_filter?state=${state}&city=${city}&categories=${categories}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                },
                credentials:"include"
            } )
            const data=await response.json();
            if(!data.statusCode===200){
                return rejectWithValue(data.data || "Failed to fetch cart");
            }
            if(data?.statusCode===404){
                return false
            }
            return data.data[0];
    }
        catch (error) {
            console.log(error)
        }
    

    }
)