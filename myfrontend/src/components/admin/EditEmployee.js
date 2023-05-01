 
import MainNavigation from '../common/navbar'
import React, { useEffect, useState } from "react";
import {  Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { registerUser } from "../services/authAction";
import adminServices from "../services/adminServices";
function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}
function EditEmployee() {
  const adminLink = [{
    'title':'AdminDashboard',
    'path':"/admin"
  },
 ]; 
 const property=[{
  "color":"success",
  "icon":"MyAdmin"
}];
 const param = useParams();
 let id = param.id;
 const navigate = useNavigate();
 const [username, setUsername] = useState(""); 
const [email,setEmail] =useState("");
const [designation,setDesignation] =useState("");
const [status,setStatus] =useState(""); 

 
const handleSubmitLogin=(e)=>{
  e.preventDefault();
  const updateDetails ={
   username:username,
   email:email,
   designation:designation,
   status:status, 
  };
  console.log(updateDetails);
  adminServices.updateById(id,updateDetails).then(res=>{
    if(res.status=='200'){
      navigate('/admin');
      console.log("updated successfully")
    }
  }).catch(err=>console.log("error"))

}
useEffect(()=>{
  if(id){
    adminServices.fetchById(id).then(res=>{
       
     if(res.data.user){

      setUsername(res.data.user.username);
      setEmail(res.data.user.email);
      setDesignation(res.data.user.designation);
      setStatus(res.data.user.status);
     }
    }).catch(err=>console.log(err))
  }
 },[id])
 const Goback=()=>{
navigate("/admin")
 }
  return (
  <>
    <MainNavigation details={property} links={adminLink}/>
     <Button onClick={Goback} style={{margin:"10px 20px",backgroundColor:"#2E7D32"}} variant='contained'>Back</Button>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    
    >
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{
          width: "300px",
          borderRadius: "20px",
        
        }}
      >
      
        <Paper
          className="box"
          elevation={2}
          style={{
             
            width: "230px",
            padding: "30px 30px 90px 30px",
            borderRadius: "20px",
            color:"white"
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <div style={{backgroundColor:"#2E7D32",borderRadius:"10px",textAlign:"center",color:"white",padding:"10px",marginBottom:"0 auto ",
            width: "250px",}}>

            <Typography variant="h5">Update Employee Record</Typography>
            </div>
            <form> 
             <RedBar />
            <TextField  value={username} onChange={(e)=>{setUsername(e.target.value)}} label={"username"}  />
            <RedBar />
            <TextField value={email} onChange={(e)=>{setEmail(e.target.value)}} label={'Email'}   margin="dense" />
            <RedBar />
            <TextField value={designation} onChange={(e)=>{setDesignation(e.target.value)}} label={'Designation'} id="margin-dense" margin="dense" />
            <RedBar />
            <TextField value={status} onChange={(e)=>{setStatus(e.target.value)}} label={'Status'} id="margin-dense" margin="dense" />
            <RedBar />
            
            <Button  
               onClick={handleSubmitLogin}
              size="small"
              variant="filled"
              style={{backgroundColor:"#2E7D32" ,float:"right"}}>Update</Button>
              </form>

          </Box>
        </Paper>
      </Grid>

    </Box>
  </>
  )
}

export default EditEmployee