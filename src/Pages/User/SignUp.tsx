import React, { useState } from 'react'
import BasicTextFields from '../../components/User/SignIn/Input/BasicTextFields'
import Button from '../../components/User/SignIn/Buttons/Button'
import axiosInstance from '../../Utils/axios/axios'
import { useNavigate } from 'react-router-dom'
import generateOtp from '../../Utils/OtpGenerator/otpGenerator'

function SignUp() {
  const [fname, setFname] = useState<string>('')
  const [lname, setLname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPsw, setConfirm] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  const [enteredOtp,setEnteredOtp] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    try {
      if (password !== confirmPsw) {
        setError('Password must match each other')
        return
      }

      if (email.trim() === '' || password.trim() == '') {
        setError('Complete all the fields')
        return
      }
      const otp = generateOtp()
      const createdAt  = Date.now()

      const response = await axiosInstance.post('/signup_submit', {
       fname : fname,
       lname : lname,
        email: email,
        password: password,
        confirm: confirmPsw,
        otp : otp,
        createdAt :createdAt
      })
      console.log(response, '<<<<<<<<<')
      if (response.data.status === 500) setError(response?.data?.message)
      if (response.data.status === 400) setError(response?.data?.message)
      if (response.data.status === 409) setError(response?.data?.message)

      
      if (response?.data?.status === 201) {
        setError('')
       if(otp) setOtp(otp)
      }
      // navigate('/login')
    } catch (error) {
      console.log('error found in signup submit', error)
      setError('User already exists')
    }

  }
  const handleOtp = async ()=>{
    try {
      if(enteredOtp.trim().length === 6){
       const response = await axiosInstance.post('/verifyOtp',{
          otp : enteredOtp,
          userId : email
        })
        console.log(response,'response');
        
        if(response.data.status === 201) navigate('/login')
        if(response.data.status === 401) setError(response.data.message)
        if(response.data.status === 500) setError(response.data.message)
        if(response.data.status === 404) setError(response.data.message)

         setOtp('') 
      }else{
        setError('Enter correct OTP')
      }
    } catch (error) {
      console.log(error);
      setError('Something went wrong try again')
      setOtp('') 

      
    }
  }


  const handleExistingUser = (): void => {
    navigate('/login')
  }
  if(otp.trim() ===''){
    return (
      <div>
  
        <div className='signup' style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'white',
        }}
        >
  
          <form className='signupForm items-center justify-center' style={{
            backgroundColor: "white",
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
            onSubmit={handleSubmit}
          >
  
            <p style={{ fontFamily: "", fontSize: '30px', marginLeft: '25%', fontWeight: 'bold' }}>User Sign Up</p>
            <p style={{ color: 'red', fontSize: '15px', alignItems: 'center', justifyItems: 'center', marginLeft: '27%' }}>{error}</p>
           
            <BasicTextFields type="text" className='' setInput={setFname} setError={setError} inputValue={fname} placeholder='First Name' />
           
            <BasicTextFields type="text" className='' setInput={setLname} setError={setError} inputValue={lname} placeholder='Last Name' />

            <BasicTextFields type="email" className='' setInput={setEmail} setError={setError} inputValue={email} placeholder='Email' />
  
            <BasicTextFields type="password" className='' setInput={setPassword} setError={setError} inputValue={password} placeholder='Password' />
  
            <BasicTextFields type="password" className='' setInput={setConfirm} setError={setError} inputValue={confirmPsw} placeholder='Confirm' />
  
            <Button className='' type='submit' style={{ width: '100%', backgroundColor: 'black', color: 'white', }} />
  
            <p style={{ cursor: "pointer" }} onClick={handleExistingUser} >Already have a account?</p>
            <p style={{ cursor: "pointer" }}  >Recruiter?</p>
  
  
          </form>
  
        </div>
  
      </div>
  
    )
  }else{
    return(
      <div>
              <div className='otp' style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'white',
        }}>
          <div className="otpInner items-center justify-center " style={{
            backgroundColor: "white",
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}>
            <p style={{fontWeight : 'bold'}}>Enter your OTP</p>
            <p style={{ color: 'red', fontSize: '15px', alignItems: 'center', justifyItems: 'center', marginLeft: '27%' }}>{error}</p>

              <span>
              <input type="text" style={{
                border : 'solid black 2px',
                borderRadius : '.5rem',
                margin : '1rem'}} 

                onChange={(e)=>{
                  setEnteredOtp(e.target.value)
                  setError('')
                }}/>

              <button  style={{
                    borderRadius : '.5rem',
                    color:'white',
                    backgroundColor : 'black',
                    border : 'none'

              }}
              onClick={handleOtp}
              >Submit</button>
                </span>  
            <p >Resend OTP</p>

          </div>

        </div>
      </div>
    )
  }
  
}

export default SignUp