import Home from './Pages/User/Home'
import LoginNew from './Pages/User/LoginNew'
import SignUp from './Pages/User/SignUp'


import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
function App() {

  return (
   <Router>
      <Routes>
        <Route path={'/signup'} element = {<SignUp/>}/>
        <Route path={'/login'} element = {<LoginNew/>}/>
        <Route path={'/'} element = {<Home/>}/>
      </Routes>
   </Router>
  )
}

export default App
