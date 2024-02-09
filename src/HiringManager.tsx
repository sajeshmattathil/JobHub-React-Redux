import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import SignupHr from './Pages/hr/SignupHr'
import LoginHr from './Pages/hr/LoginHr'

function HiringManager() {

  return (
   <Router>
      <Routes>  
        <Route path={'/hr/login'} element = {<LoginHr/>}/>
        <Route path={'/hr/signup'} element = {<SignupHr/>}/>

      </Routes>
   </Router>
  )
}

export default HiringManager
