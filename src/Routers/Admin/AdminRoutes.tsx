import { Route,Routes,} from 'react-router-dom'
import UserManagementTable from '../../Pages/admin/userManagement'
import HRManagement from '../../components/Admin/HRManagement'
import AdminHome from '../../components/Admin/AdminHome'
import AdminLogIn from '../../Pages/admin/AdminLogIn'
import AdminPrivatedRoute from './AdminPrivateRoutes'
import AdminPublicRoute from './AdminPublicRoutes'

function AdminRoutes() {

  return (
      <Routes>  
        <Route path={'usermanagement'} element = {<AdminPrivatedRoute component={UserManagementTable}/>}/>

        <Route path={'/'} element = {<AdminPrivatedRoute component={AdminHome}/>}/>

        <Route path={'/login'} element = {<AdminPublicRoute  component={AdminLogIn}/>}/>

        <Route path={'/hrmanagement'} element = {<AdminPrivatedRoute component={HRManagement}/>}/>

      </Routes>
  )
}

export default AdminRoutes
