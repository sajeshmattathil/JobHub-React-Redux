import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import UserRoutes from './Routers/User/UserRoutes.js'
import HRRoutes from './Routers/HR/HRRoutes'
import AdminRoutes from './Routers/Admin/AdminRoutes'


function App() {

  return (
   <Router>
      <Routes>
        <Route path={'/*'} element = {<UserRoutes/>}/>
        <Route path={'/hr*'} element = {<HRRoutes/>}/>
        <Route path={'/admin*'} element = {<AdminRoutes/>}/>
      </Routes>
   </Router>
  )
}

export default App
