 
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
 import fetchAllEmp from '../services/adminServices';
import adminServices from '../services/adminServices';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import Swal from 'sweetalert2';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
      fontSize: 17,
          },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
 
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  
function AdminDashboard() {
  
 const param = useParams(); 
 const navigate = useNavigate();
 let id = param.id;

 const[deleteId,setDeleteId]=React.useState(id);
    const { userInfo } = useSelector((state) => state.auth)

    const[empinfo,setEmpInfo]=React.useState([]);

const deleteHandler=()=>{
  adminServices.deleteById(id).then(res=>{
    if(res.status=="200"){
     
      navigate('/admin');
      Swal.fire({
        icon: 'success',
        title: `Deleted Successfully`, 
      }
        
      )
      console.log("deleted Succesfully")
    }
  }).catch(err=>{
    console.log(err)
  })
}
    React.useEffect(()=>{
        adminServices.fetchAllEmp().then(res=>{
           
            setEmpInfo(res.data.user)
        }).catch(err=>{
            console.log(err)
        })    },[deleteId,id]) 
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
    <Table stickyHeader aria-label="sticky table">

      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Employee Id</StyledTableCell>
          <StyledTableCell align="center">Employee name</StyledTableCell>
          <StyledTableCell align="center">Email </StyledTableCell>
          <StyledTableCell align="center">Status </StyledTableCell>
          <StyledTableCell align="center">Designation</StyledTableCell>
          <StyledTableCell align="center">Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {empinfo.map((row) => (
          <StyledTableRow key={row.name}>
            <StyledTableCell align="center" component="th" scope="row">
              {row.id}
            </StyledTableCell>
            <StyledTableCell align="center">{row.username}</StyledTableCell>
            <StyledTableCell align="center">{row.email}</StyledTableCell>
            <StyledTableCell align="center">{row.status}</StyledTableCell>
            <StyledTableCell align="center">{row.designation}</StyledTableCell>
            <StyledTableCell align="center" >  
            
            <Link to={`/update/${row.id}`}>
            <Button style={{margin:"5px"}} variant="contained" color="warning">Update</Button>
             </Link>
            <Link onClick={deleteHandler} to={`/delete/${row.id}`}>
              <Button style={{margin:"5px"}} variant="contained" color="error">Delete</Button>
              </Link> 
              </StyledTableCell> 
          
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Paper>
  )
}

export default AdminDashboard