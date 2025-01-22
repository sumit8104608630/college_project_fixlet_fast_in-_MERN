import {createAsyncThunk} from "@reduxjs/toolkit"
const apiUrl=import.meta.env.VITE_BACKEND_API_URL

export const get_offers=createAsyncThunk(
    'offer/get_offers',
    async(_,{rejectWithValue})=>{

        try {

        const response = await fetch(`${apiUrl}/offer/get_offers`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials:"include"
        }) ;

        if (!response.ok) {
            const errorData = await response.json(); // Parse error message from server
            throw new Error(errorData.message || 'Failed to fetch service data');
        }

        const data=await response.json();
        const service_data=data.data
        
        return service_data;

        } catch (error) {
            return rejectWithValue(error.message)
        }

    }
)