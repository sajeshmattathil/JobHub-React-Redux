import React,{useState} from 'react'
import Input from '../../components/User/SignIn/Input/Input'
import BasicTextFields from './new'



function SignIn() {
const [email,setEmail] = useState <string>('')
const [password,setPassword] = useState <string>('')
const [confirm,setConfirm] = useState <string>('')



  return (
    <div className='flex'>
       <Input type="email" className='px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500' setInput={setEmail} inputValue={email} placeholder='email' />
       <Input type="password" className='px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500' setInput={setPassword} inputValue={password} placeholder='password' />
       <Input type="password" className='' setInput={setConfirm} inputValue={confirm} placeholder='confirm' />
       <BasicTextFields type="password" className='' setInput={setConfirm} inputValue={confirm} placeholder='confirm'/>
    </div>
  )
}

export default SignIn