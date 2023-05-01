import { Box, Container, FormLabel, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import adminServices from '../services/adminServices'
import { useSelector } from 'react-redux';  

 

function EmployeeDashboard() {
  const [userInfo,setUserInfo] =useState([]);
  const { userdetails } = useSelector((state) => state.auth)

  useEffect(()=>{
    adminServices.getUser().then(res=>{
      if(res.status=="200"){
        console.log(userInfo)
         setUserInfo([res.data.user])
      }
       
    }).catch(err=>{
      console.log(err)
    })
  },[userdetails])
  return (
    <Container maxWidth="sm">
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
          <Typography style={{margin:"15px",textAlign:"center"}} variant='h4'>Employee Profile</Typography>
        {Array.isArray(userInfo)
        ? userInfo.map(element => {
            return (
              <Box sx={{ lineHeight:"3em",textAlign:"initial",
                   borderRadius:"20px",boxShadow: 4,padding:"10px",margin:"20px",width:"400px",height:"200px" }} >
                
               <Typography variant="h5" style={{display:"inline"}} mt={2}>User Name    :</Typography>
              <Typography  style={{fontSize:"20px",display:"inline"}}>{element.username}</Typography>
             <br/>
              <Typography variant="h5" style={{display:"inline"}}>Email     :     </Typography>
              <Typography style={{fontSize:"20px",display:"inline"}}>{element.email}</Typography>
             <br/>
              <Typography variant="h5" style={{display:"inline"}}>Designation    :</Typography>
              <Typography style={{fontSize:"20px",display:"inline"}}>{element.designation}</Typography>
              <br/>
              </Box>
            );
          })
        : null}
       

  
</Stack>
</Container>
  )
}

export default EmployeeDashboard