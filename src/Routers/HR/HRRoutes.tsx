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
import ChatPageUser from '../../components/HR/Chat/ChatPageUser'
import ChatHomeUser from '../../components/HR/Chat/ChatHomeUser'
import { io } from 'socket.io-client'
import ShowShortListedUsrers from '../../components/HR/ShowShortListedUsrers'
const socket = io('http://localhost:3000');


function HRRoutes() {

  return (
      <Routes>  
        <Route path={'/login'} element = {<HrLogin/>}/>
        <Route path={'/signup'} element = {<SignUp/>}/>
        <Route path={'/job'} element = {<HRPrivatedRoute component={CreateJob}/>}/>
        <Route path={'/'} element = {<HRPrivatedRoute component={Home}/>}/>
        <Route path={'/profilemanagement'} element = {<HRPrivatedRoute component={ProfileManagement}/>}/>
        <Route path={'/viewJob/:id'} element = {<HRPrivatedRoute component={ViewJob}/>}/>
        <Route path={'/shortListedUsers/:jobId'} element = {<HRPrivatedRoute component={ShowShortListedUsrers}/>}/>
        <Route path="/chatSignin" element={<ChatHomeUser />} />
      <Route path="/chatPage" element={<ChatPageUser socket={socket} />} />
      </Routes>
  )
}

export default HRRoutes
