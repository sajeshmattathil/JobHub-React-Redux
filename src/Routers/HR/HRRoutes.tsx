import { Route,Routes,} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import CreateJob from '../../Pages/hr/CreateJob'
import SignUp from '../../Pages/hr/SignUp'
import HrLogin from '../../Pages/hr/HrLogin'
import Home from '../../Pages/hr/Home'
import ProfileManagement from '../../Pages/hr/ProfileManagement'
import HRPrivatedRoute from './HRPrivateRoutes'
import ViewJob from '../../Pages/hr/ViewJob'

function HRRoutes() {

  return (
      <Routes>  
        <Route path={'/login'} element = {<HrLogin/>}/>
        <Route path={'/signup'} element = {<SignUp/>}/>
        <Route path={'/job'} element = {<HRPrivatedRoute component={CreateJob}/>}/>
        {/* <Route path={'/'} element = {<HRPrivatedRoute component={Home}/>}/> */}
        <Route path={'/'} element = {<HRPrivatedRoute component={Home}/>}/>

        <Route path={'/profilemanagement'} element = {<HRPrivatedRoute component={ProfileManagement}/>}/>
        <Route path={'/viewJob/:id'} element = {<HRPrivatedRoute component={ViewJob}/>}/>
      </Routes>
  )
}

export default HRRoutes
