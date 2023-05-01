import { configureStore } from "@reduxjs/toolkit";
  import  authslice from './authstore'  
 
const store =configureStore({
  reducer: {
    auth: authslice, 
    
  }, 
 
});

export default store;