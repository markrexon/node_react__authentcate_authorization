import {createSlice} from '@reduxjs/toolkit';
 import  userLogin  from '../services/adminServices';
import { registerUser } from '../services/authAction';
 

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken, 
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {checkLogin:(state)=>{
    const token = localStorage.getItem('userToken')
    state.userToken=token;
  },
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
      console.log("clear")
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
    
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { checkLogin,logout, setCredentials } = authSlice.actions

export default authSlice.reducer;