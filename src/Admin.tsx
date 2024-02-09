import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import LogIn from './Pages/admin/Login'
// import Home from './Pages/admin/Home'
import UpdateUser from './Pages/User/profileManagement'
import ProfileManagement from './Pages/User/profileManagement'

function Admin() {

  return (
   <Router>
      <Routes>  
        <Route path={'/admin'} element = {<ProfileManagement />}/>
        <Route path={'/admin/login'} element = {<LogIn/>}/>
        <Route path={'/admin/profileManagement'} element = {<UpdateUser/>}/>
      </Routes>
   </Router>
  )
}

export default Admin
