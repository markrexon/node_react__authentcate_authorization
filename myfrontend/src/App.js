import './App.css';
import Login from './components/common/login';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Registration from './components/common/register';
import RootLayout from './components/RootLayout';
import ManageEmployee from './components/admin/ManageEmployee';
import AdminLayout from './components/admin/AdminLayout'; 
import EmployeeLayout from './components/employee/EmployeeLayout';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import ProtectedRoutes from './components/common/privateRoute';
import EditEmployee from './components/admin/EditEmployee';
import AdminDashboard from './components/admin/AdminDashboard';


function App() {
  return (


    <BrowserRouter>
      <Routes>
 
        <Route path="/" element={<RootLayout />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />

        </Route>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/admin" element={<AdminLayout />} >
            <Route path="manageEmployee" element={<ManageEmployee />} />
         
          </Route>
          <Route path="update/:id" element={<EditEmployee/>}/>
          <Route path="delete/:id" element={<AdminDashboard/>}/>
          
          <Route path="/employee" element={<EmployeeLayout />} >
            <Route path="manageEmployee" element={<EmployeeDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
