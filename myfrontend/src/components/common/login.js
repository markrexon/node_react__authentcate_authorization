import React, { useEffect, useState } from "react";
import {  Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
 import Swal from 'sweetalert2';
  import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../services/authAction";
import { checkLogin } from "../store/authstore";

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

function Login() {
  const [email, setEmail] = useState("");
const [pass,setPass] =useState(""); 
  
 
 const { userInfo } = useSelector((state) => state.auth)

const dispatch = useDispatch()
  const navigate = useNavigate()

 const handleSubmitLogin=(e)=>{
   e.preventDefault();
   const logindetails ={
    email:email,
    password:pass
   };
    
  dispatch(userLogin(logindetails)).then(res=>{
    console.log(res.payload)
    if(res.payload.role=='admin' ){
   
     navigate("/admin")
     Swal.fire({
      icon: 'success',
      title: `Welcome ${res.payload.role}`, 
    }
      
    )
    }else if(res.payload=='err is not defined'){
      Swal.fire({
        icon: 'error',
        title: 'Employee is InActive!',
        text: 'Something went wrong!',
      }
        
      )
      navigate('/login')
    }
    else if(res.payload.role=='user'){
      navigate("/employee/manageEmployee")
      
      Swal.fire({
        icon: 'success',
        title: `Welcome ${res.payload.role}`,
         
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: `User doesnot Exists ,Please check email and password`,
        toast:"Please check email and password"
         
      })
      navigate("/login")
    }
  }).catch(err=>console.log("err")); 
 
  
}
   useEffect(() => {
   var token=  localStorage.getItem("userToken");
     
  if (token) {
      
      navigate('/admin')
    }
  }, [navigate,userInfo]) 

  return (  
    <>
    
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
          borderRadius: "25px",
        
        }}
      >
      
        <Paper
          className="box"
          elevation={2}
          style={{
            height: "200px",
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

            <Typography variant="h5">Login</Typography>
            </div>
            <form> 
                          <RedBar />
            <TextField   type="text" size="small" onChange={(e)=>{setEmail(e.target.value)}} label={'Email'} id="margin-none" margin="dense"/>
            <RedBar />
            <TextField type="password" size="small" onChange={(e)=>{setPass(e.target.value)}} label={'Password'} id="margin-dense" margin="dense" />
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

    </>
  );
}



export default  Login; 