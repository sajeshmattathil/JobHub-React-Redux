import React, { useState } from 'react'
import BasicTextFields from '../../components/User/SignIn/Input/BasicTextFields'
import Button from '../../components/User/SignIn/Buttons/Button'
import axiosInstance from '../../Utils/axios/axios'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPsw, setConfirm] = useState<string>('')
  const [error,setError] = useState('')
  const navigate = useNavigate()
 async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  
    try{
       const response = await axiosInstance.post('/signup_submit',{
                email:email,
                password: password,
                confirm: confirmPsw
       })
          console.log(response,'<<<<<<<<<')
          if(response.data.status === 500) setError(response.data.message)
      navigate('/login')
    }catch(error){
      console.log('error found in signup submit',error)
      setError('Something went wrong')
    }
       
  }

  const handleExistingUser = () : void =>{
    navigate('/login')
  }
return (
  <div>

    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'white',
    }}
    >

      <form className='items-center justify-center' style={{
        backgroundColor: "white",
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      }}
        onSubmit={handleSubmit}
      >


        <p style={{ fontFamily: "", fontSize: '30px', marginLeft: '25%' }}>User Sign Up</p>
        <p>{error}</p>

        <BasicTextFields type="email"  className='' setInput={setEmail } setError = {setError} inputValue={email} placeholder='Email' />

        <BasicTextFields type="password"  className='' setInput={setPassword} setError = {setError} inputValue={password} placeholder='Password' />

        <BasicTextFields type="password"  className='' setInput={setConfirm} setError = {setError} inputValue={confirmPsw} placeholder='Confirm' />

        <Button className='' type='submit' style={{ width: '100%', backgroundColor: 'black', color: 'white', }} />

        <p style={{ cursor: "pointer" }} onClick={handleExistingUser} >Already have a account?</p>
        <p style={{ cursor: "pointer" }}  >Recruiter?</p>


      </form>

    </div>

  </div>


)
}

export default SignIn