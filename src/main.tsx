import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Admin from './Admin.tsx'
import HiringManager from './HiringManager.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Admin/>
    <HiringManager/>
  </React.StrictMode>,
)
