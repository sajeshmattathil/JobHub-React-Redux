import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import SignupHr from './Pages/hr/SignupHr'
import LoginHr from './Pages/hr/LoginHr'
import CreateJobForm from './Pages/hr/CreateJob'
import Jobs from './Pages/hr/jobs'

function HiringManager() {

  return (
   <Router>
      <Routes>  
        <Route path={'/hr/login'} element = {<LoginHr/>}/>
        <Route path={'/hr/signup'} element = {<SignupHr/>}/>
        <Route path={'/hr/job'} element = {<CreateJobForm/>}/>
        <Route path={'/hr'} element = {<Jobs/>}/>
      </Routes>
   </Router>
  )
}

export default HiringManager
