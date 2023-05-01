import React from 'react'
import MainNavigation from '../common/navbar'
import { Outlet } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'; 
import { Container, Paper, Typography } from '@mui/material';
function AdminLayout() {
 

  const adminLink = [{
    'title':'AdminDashboard',
    'path':"/admin"
  },
 ];
const property=[{
  "color":"success",
  "icon":"MyAdmin"
}];
  return (
    <>
    <MainNavigation details={property} links={adminLink}/>
    <Outlet/>
   <br/>
    
<Container fixed>
<Paper  style={{padding:"5px",margin:"5px auto"}} elevation={2} >
<Typography style={{marginLeft:"10px"}} variant="h6">Manage Employee Details</Typography>

</Paper>
     <AdminDashboard/>
     </Container>
    </>
  )
}

export default AdminLayout