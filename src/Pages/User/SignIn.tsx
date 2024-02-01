import React, { useState } from 'react'
import BasicTextFields from '../../components/User/SignIn/Input/BasicTextFields'
import Button from '../../components/User/SignIn/Buttons/Button'
import axiosInstance from '../../Utils/axios/axios'



function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPsw, setConfirm] = useState<string>('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
        axiosInstance.post('/login_submit',{
          email:email,
          password: password,
          confirm: confirmPsw
        })
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

        <BasicTextFields type="email"  className='' setInput={setEmail} inputValue={email} placeholder='Email' />

        <BasicTextFields type="password"  className='' setInput={setPassword} inputValue={password} placeholder='Password' />

        <BasicTextFields type="password"  className='' setInput={setConfirm} inputValue={confirmPsw} placeholder='Confirm' />

        <Button className='' type='submit' style={{ width: '100%', backgroundColor: 'black', color: 'white', }} />

        <p style={{ cursor: "pointer" }}  >Already have a account?</p>
        <p style={{ cursor: "pointer" }}  >Recruiter?</p>


      </form>

    </div>

  </div>


)
}

export default SignIn