    import {createAsyncThunk} from "@reduxjs/toolkit"
    const apiUrl=import.meta.env.VITE_BACKEND_API_URL
    // let create action thunk for the fetching service for the frontend

    export const fetchService =createAsyncThunk(
        'service/fetchService',
        async({state,city,categories},{rejectWithValue})=>{

            try {

            const response = await fetch(`${apiUrl}/service/service_data_get?state=${state}&city=${city}&categories=${categories}`,{
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