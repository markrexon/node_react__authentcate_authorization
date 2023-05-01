import React from 'react'
 import { Outlet } from 'react-router-dom'
import BaseNavigation from './baseAppBar'

function RootLayout() {
  return (
    <>
    <BaseNavigation/>
    <Outlet/>
    </> 
    
    )
}

export default RootLayout