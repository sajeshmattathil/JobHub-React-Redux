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

        <Route path={'/usermanagement'} element = {<AdminPrivatedRoute component={UserManagement}/>}/>

        <Route path={'/'} element = {<AdminPrivatedRoute component={Home}/>}/>

        <Route path={'/login'} element = {<Login/>}/>

        <Route path={'/hrmanagement'} element = {<AdminPrivatedRoute component={HRManagement}/>}/>

        <Route path={'/subscriptionManagement'} element = {<AdminPrivatedRoute component={Plans}/>}/>

        <Route path={'/createNewPlan'} element = {<AdminPrivatedRoute component={CreateNewPlan}/>}/>

        <Route path={'/editPlan/:planId'} element = {<AdminPrivatedRoute component={EditPlans}/>}/>

      </Routes>

  )
}

export default AdminRoutes
