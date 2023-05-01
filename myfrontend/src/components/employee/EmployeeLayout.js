import React from 'react'
import MainNavigation from '../common/navbar'
import { Outlet } from 'react-router-dom'

function EmployeeLayout() { 
    const empLink = [{
      'title':'EmployeeInfo',
      'path':"/employee"
    },
   ];
   const property=[{
    "color":"warning",
    "icon":"MyEmp"
  }];
  return (
    <>
    <MainNavigation details={property} links={empLink}/>
    <Outlet/>
    </>
  )
}

export default EmployeeLayout