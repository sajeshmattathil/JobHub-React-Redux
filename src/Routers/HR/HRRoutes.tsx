import { Route,Routes,} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import SignupHr from '../../Pages/hr/SignupHr'
import CreateJobForm from '../../Pages/hr/CreateJob'
import HrHome from '../../Pages/hr/HrHome'
import LoginHr from '../../Pages/hr/HrLogin'

function HRRoutes() {

  return (
      <Routes>  
        <Route path={'/login'} element = {<LoginHr/>}/>
        <Route path={'/signup'} element = {<SignupHr/>}/>
        <Route path={'/job'} element = {<CreateJobForm/>}/>
        <Route path={'/'} element = {<HrHome/>}/>
      </Routes>
  )
}

export default HRRoutes
