import React,{useState} from 'react'

import BasicTextFields from '../../components/User/SignIn/Input/BasicTextFields'
import Button from '../../components/User/SignIn/Buttons/Button'



function LogIn() {
const [email,setEmail] = useState <string>('')
const [password,setPassword] = useState <string>('')

console.log(email,password,confirm)

  return (
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' , }}>
    
  <form className='items-center justify-center' style={{ backgroundColor: "white", padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', }}>
  <p style={{fontFamily:"",fontSize:'30px',marginLeft:'25%'}}>User Login</p>
    <BasicTextFields type="email" className='px-4 py-2 rounded-lg border border-gray-300' setInput={setEmail} inputValue={email} placeholder='Email' />
    <BasicTextFields type="password" className='' setInput={setPassword} inputValue={password} placeholder='Password' />
    <Button className='' style ={ { width: '100%',backgroundColor: 'black', color: 'white' ,}}  />
    <p style={{cursor:"pointer"}}  >Create a new account</p>
  </form>
</div>

  )
}

export default LogIn