const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController'); 
const {login} = require('./controllers/loginController');
const {getUser} = require('./services/getEmployeeDashboard');
const { getAllUsers } = require('./services/getAllUser');
 const { getEmployeeById } = require('./services/fetchempById');
const { updateEmpById } = require('./services/updateEmpById');
const { deleteEmployeeinfo } = require('./services/deleteEmployee');

var cors = require("cors");

var corsOptions ={
    origin:"http://localhost:3000/",
    optionsSuccessStatus:200
};
router.post('/register', [
    body('username',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
    body('designation').notEmpty()

], register);


router.post('/login',cors(corsOptions),[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),

],login);
 
router.get('/employeeDashboard',getUser);

 // fetch all
router.get("/getAllEmployee",getAllUsers);
// fetch by id 
router.get("/emp/:id",getEmployeeById);
// update by id
router.patch("/updateEmp/:id",updateEmpById);
//delete by id
router.delete("/deleteByid/:id",deleteEmployeeinfo);

module.exports = router;