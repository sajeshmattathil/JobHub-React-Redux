import { Route,Routes,} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import CreateJob from '../../Pages/hr/CreateJob'
import SignUp from '../../Pages/hr/SignUp'
import HrLogin from '../../Pages/hr/HrLogin'
import Home from '../../Pages/hr/Home'

function HRRoutes() {

  return (
      <Routes>  
        <Route path={'/login'} element = {<HrLogin/>}/>
        <Route path={'/signup'} element = {<SignUp/>}/>
        <Route path={'/job'} element = {<CreateJob/>}/>
        <Route path={'/'} element = {<Home/>}/>
      </Routes>
  )
}

export default HRRoutes
