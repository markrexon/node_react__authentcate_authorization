const express = require('express');
const routes = require('./routes');
 const app = express();

 const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}
  
app.use(cors(corsOptions)) 
app.use(express.json());
app.use(routes); 
 app.use((err, req, res, next) => {
  
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(8080,() => console.log('Server is running on port 8080'));