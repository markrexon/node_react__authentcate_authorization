import React, { useEffect, useState } from "react";
import {  Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

function Registration() {
 
  const [username, setUsername] = useState("");
const [pass,setPass] =useState("");
const [email,setEmail] =useState("");
const [designation,setDesignation] =useState("");

 
const dispatch = useDispatch()
const navigate = useNavigate()


const handleSubmitLogin=(e)=>{
   e.preventDefault();
   const registerdetails ={
    username:username,
    password:pass,
    email:email,
    designation:designation
   };
   dispatch(registerUser(registerdetails)).then(res=>{
    if(res.payload!=''){
      navigate("/login")
    }
   }).catch(err=>{
    console.log(err)
   })
}
 
  return (
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
            <div style={{backgroundColor:"#22577A",borderRadius:"10px",textAlign:"center",color:"white",padding:"10px",marginBottom:"0 auto ",
            width: "250px",}}>

            <Typography variant="h5">Registration</Typography>
            </div>
            <form> 
             <RedBar />
            <TextField   onChange={(e)=>{setUsername(e.target.value)}} label={'UserName'} id="margin-none" />
            <RedBar />
            <TextField type="password" onChange={(e)=>{setPass(e.target.value)}} label={'Password'} id="margin-dense" margin="dense" />
            <RedBar />
            <TextField onChange={(e)=>{setEmail(e.target.value)}} label={'Email'} id="margin-dense" margin="dense" />
            <RedBar />
            <TextField onChange={(e)=>{setDesignation(e.target.value)}} label={'Designation'} id="margin-dense" margin="dense" />
            <RedBar />
            
            <Button  onClick={handleSubmitLogin}
               
              size="small"
              variant="filled"
              style={{backgroundColor:"#22577A" ,float:"right"}}>Submit</Button>
              </form>

          </Box>
        </Paper>
      </Grid>

    </Box>
  );
} 
 
export default  Registration;