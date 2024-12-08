import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


export const fetchUser=createAsyncThunk(
    'user/fetchUser',
    async (_,{rejectWithValue})=>{
        try{
            const userResponse = await fetch("http://localhost:8000/user/user_info", {
        method: 'GET',
       // credentials: 'include'
      });
            if(!userResponse){
                throw new Error("User not found");
            }
            return userResponse.data;
        }
        catch(error){
            return rejectWithValue(error.message)
        }
    }
)