import Home from './Pages/User/Home'
import LogIn from './Pages/User/Login'
import SignIn from './Pages/User/SignIn'
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'

function App() {

  return (
   <Router>
      <Routes>
        <Route path={'/signup'} element = {<SignIn/>}/>
        <Route path={'/login'} element = {<LogIn/>}/>
        <Route path={'/'} element = {<Home/>}/>
      </Routes>
   </Router>
  )
}

export default App
