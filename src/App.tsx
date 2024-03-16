import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import UserRoutes from './Routers/User/UserRoutes.js'
import HRRoutes from './Routers/HR/HRRoutes'
import AdminRoutes from './Routers/Admin/AdminRoutes'
import { io } from 'socket.io-client';

function App() {
  const socket = io("http://localhost:3001");

  return (

   <Router>
      <Routes>
        <Route path={'/*'} element = {<UserRoutes socket={socket}/>}/>
        <Route path={'/hr*'} element = {<HRRoutes socket={socket}/>}/>
        <Route path={'/admin*'} element = {<AdminRoutes/>}/>
      </Routes>
   </Router>

  )
}

export default App
