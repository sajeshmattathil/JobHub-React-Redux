import { Route,Routes,} from 'react-router-dom'
import HRManagement from '../../Pages/admin/HRManagement'
import AdminPrivatedRoute from './AdminPrivateRoutes'
import Login from '../../Pages/admin/Login'
import Home from '../../Pages/admin/Home'
import UserManagement from '../../Pages/admin/userManagement'
// import SubscriptionManagement from '../../components/Admin/SubscriptionManagement'
import CreateNewPlan from '../../components/Admin/CreateNewPlan'
import EditPlans from '../../components/Admin/EditPlans'
import Plans from '../../Pages/admin/Plans'

function AdminRoutes() {

  return (

      <Routes>  

        <Route path={'/usermanagement'} element = {<UserManagement/>}/>

        <Route path={'/'} element = {<Home/>}/>

        <Route path={'/login'} element = {<Login/>}/>

        <Route path={'/hrmanagement'} element = {< HRManagement/>}/>

        <Route path={'/subscriptionManagement'} element = {< Plans/>}/>

        <Route path={'/createNewPlan'} element = {<CreateNewPlan/>}/>

        <Route path={'/editPlan/:planId'} element = {<EditPlans/>}/>

      </Routes>

  )
}

export default AdminRoutes
