import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
// import Home from './Pages/admin/Home'
// import UpdateUser from './Pages/User/ProfileManagement'
import UserManagementTable from './Pages/admin/userManagement'
import HRManagement from './components/Admin/HRManagement'
import AdminHome from './components/Admin/AdminHome'
import AdminLogIn from './Pages/admin/AdminLogIn'

function Admin() {

  return (
   <Router>
      <Routes>  
        <Route path={'/admin/usermanagement'} element = {<UserManagementTable />}/>
        <Route path={'/admin/'} element = {<AdminHome/>}/>
        <Route path={'/admin/login'} element = {<AdminLogIn/>}/>
        <Route path={'/admin/hrmanagement'} element = {<HRManagement/>}/>
      </Routes>
   </Router>
  )
}

export default Admin
