import Home from './Pages/User/Home'
import LogIn from './Pages/User/Login'
import SignUp from './Pages/User/SignUp'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
function App() {

  return (
   <Router>
      <Routes>
        <Route path={'/signup'} element = {<SignUp/>}/>
        <Route path={'/login'} element = {<LogIn/>}/>
        <Route path={'/'} element = {<Home/>}/>
      </Routes>
   </Router>
  )
}

export default App
