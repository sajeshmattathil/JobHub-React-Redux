import { Route,Routes,} from 'react-router-dom'
import HRManagement from '../../components/Admin/HRManagementTable'
import AdminPrivatedRoute from './AdminPrivateRoutes'
import Login from '../../Pages/admin/Login'
import Home from '../../Pages/admin/Home'
import UserManagement from '../../Pages/admin/UserManagement'

function AdminRoutes() {

  return (

      <Routes>  

        <Route path={'/usermanagement'} element = {<AdminPrivatedRoute component={UserManagement}/>}/>

        <Route path={'/'} element = {<AdminPrivatedRoute component={Home}/>}/>

        <Route path={'/login'} element = {<Login/>}/>

        <Route path={'/hrmanagement'} element = {<AdminPrivatedRoute component={HRManagement}/>}/>

      </Routes>

  )
}

export default AdminRoutes
