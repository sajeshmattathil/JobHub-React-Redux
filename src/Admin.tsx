import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import LogIn from './Pages/admin/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
// import Home from './Pages/admin/Home'
import UserManagementTable from './Pages/admin/userManagement'

function Admin() {

  return (
   <Router>
      <Routes>  
        <Route path={'/admin'} element = {<UserManagementTable />}/>
        <Route path={'/admin/login'} element = {<LogIn/>}/>

      </Routes>
   </Router>
  )
}

export default Admin
