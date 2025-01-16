import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL


export const fetchUser=createAsyncThunk(
    'user/fetchUser',
    async (_,{rejectWithValue})=>{
        try{
            const userResponse = await fetch(`${apiUrl}/user/user_info`, {
        method: 'GET',
        credentials: 'include'
      });
            if(!userResponse){
                throw new Error("User not found");
            }
            const userData=await userResponse.json()
            console.log(userData.statusCode)
            return userData.data
        }
        catch(error){
            return rejectWithValue(error.message)
        }
    }
)