import {createAsyncThunk} from "@reduxjs/toolkit"

// let create the fetchCart functionality

export const fetchCart=createAsyncThunk(async(_,{rejectWithValue})=>{
    try {
        
        const response=await fetch(`http://localhost:8000/cart/get_all_services_cart`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
            credentials:"include"
        });
        const data=await response.json();
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData.message || "Failed to fetch cart");
          }
        if(!data){
            return []
        }
        return data.data;

    } 
    catch (error) {
        console.log(error)
        return rejectWithValue(error.message)
    }
})