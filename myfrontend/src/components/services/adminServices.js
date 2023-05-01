 
import client from './baseAPI';

 const fetchAllEmp = () => {
    const token = localStorage.getItem("userToken");
    return client.get("/getAllEmployee",{
        headers: {
            Authorization: "Bearer " + token,
          },
    });
}
const fetchById=(id)=>{
    const token = localStorage.getItem("userToken");
    return client.get(`emp/${id}`,{
        headers: {
            Authorization: "Bearer " + token,
          },
    })
}

const updateById=(id,data)=>{
    const token = localStorage.getItem("userToken");
    return client.patch(`updateEmp/${id}`,data,{
        headers: {
            Authorization: "Bearer " + token,
          },
    })
}
const deleteById=(id)=>{
    const token = localStorage.getItem("userToken");
    return client.delete(`deleteByid/${id}`,{
        headers: {
            Authorization: "Bearer " + token,
          },
    })
}
 
const getUser=()=>{
    const token = localStorage.getItem("userToken");
    return client.get("/employeeDashboard",{
        headers: {
            Authorization: "Bearer " + token,
          },
    })
}
export default {fetchAllEmp,fetchById,updateById,deleteById,getUser};