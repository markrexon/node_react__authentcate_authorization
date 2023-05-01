
import React from 'react';
import { useSelector } from 'react-redux';

import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  const user=localStorage.getItem('userToken')
   const userInfo = useSelector((state) => state.auth.userToken)
  if(userInfo){
    console.log(userInfo);

    return true
  } else {
    return false
  }
}

const  ProtectedRoutes=(props) =>{

  const auth=useAuth()

  return auth?<Outlet/>: <Navigate to="/login"/>
}

export default ProtectedRoutes;