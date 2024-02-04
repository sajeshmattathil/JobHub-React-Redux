import React, { useState } from 'react'

import BasicTextFields from '../../components/User/SignIn/Input/BasicTextFields'
import Button from '../../components/User/SignIn/Buttons/Button'
import axiosInstance from '../../Utils/axios/axios'
import { useNavigate } from 'react-router-dom'



function LogIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState('')

const navigate = useNavigate()
// interface res {
//   status : number,
//   message : string ,
//   userData : string
// }

async  function handleSubmit(event : React.FormEvent){
     event.preventDefault()
     try{
        const response   =  await axiosInstance.post('/login_submit',{
          email : email,
          password : password
         })
       
         if(response?.data?.status === 201) {
          localStorage.setItem('token', response.data.token);
          navigate('/')
         } 
         else if (response?.data?.status === 400) setError(response?.data?.message)
     }catch(err){
         console.log('Error happenend in login submit',err);  
     }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white', }}>

      <form className='items-center justify-center' 
        style={{ backgroundColor: "white",
                padding: '20px', 
                borderRadius: '8px', 
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', }}
        onSubmit={handleSubmit}
       >
       
        <p style={{ fontFamily: "", fontSize: '30px', marginLeft: '25%' }}>User Login</p>
        <p style={{  }}>{error}</p>

       
        <BasicTextFields type="email" setError={setError} className='px-4 py-2 rounded-lg border border-gray-300' setInput={setEmail} inputValue={email} placeholder='Email' />
       
        <BasicTextFields type="password" setError={setError} className='' setInput={setPassword} inputValue={password} placeholder='Password' />
       
        <Button type={"submit"} className='' style={{ width: '100%', backgroundColor: 'black', color: 'white', }} />
       
        <p style={{ cursor: "pointer" }}  >Create a new account</p>
      
      </form>

      <button onClick={async ()=>{
        const token = localStorage.getItem('token')
        const response =await axiosInstance.get('/sample',{headers: {
          Authorization: `Bearer ${token}`
      }
    }
        )
        console.log(response,'response');
        
      }}>click me </button>
    </div>

  )
}

export default LogIn