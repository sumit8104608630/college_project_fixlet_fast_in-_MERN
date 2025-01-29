import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
const apiUrl=import.meta.env.VITE_BACKEND_API_URL

export const get_all_booking=createAsyncThunk(
    'booking/get_all_booking',
    async(_,{rejectWithValue})=>{
        try {
            const response=await axios.get(`${apiUrl}/book/get_allBooking`,{withCredentials:true})
            return response.data[0]
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message)

        }
    }
)