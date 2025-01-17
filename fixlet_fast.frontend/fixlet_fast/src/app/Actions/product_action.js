import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
const apiUrl=import.meta.env.VITE_BACKEND_API_URL


export const get_all_product=createAsyncThunk(
    'product/get_all_product',
    async({state,city},{rejectWithValue})=>{
        try {
            const response = await fetch(`${apiUrl}/store/get_all_store_data?state=${state}&city=${city}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:"include"
            }) ;
            const data=await response.json();
            return data.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
    )
