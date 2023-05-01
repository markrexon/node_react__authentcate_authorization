import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit' 

 const backendURL = 'http://localhost:8080'

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
   

    try {
       
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${backendURL}/login`,
        { email, password },
        config
      ) 
      localStorage.setItem('userToken', data.token)
      console.log(data);
      return data
    } catch (error) {
     
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ username, email, password,designation }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } =  await axios.post(
        `${backendURL}/register`,
        { username, email, password ,designation},
        config
      )
      console.log(data)
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)