import React, { useState } from 'react'

import BasicTextFields from '../../components/User/SignIn/Input/BasicTextFields'
import Button from '../../components/User/SignIn/Buttons/Button'
import {axiosInstance} from '../../Utils/axios/axios'
import { useNavigate } from 'react-router-dom'



function LogIn() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if(email.trim() === '' || password.trim() == '') {
            setError('Complete all the fields') 
            return
        } 
        try {
            const response = await axiosInstance.post('/admin/login_submit', {
                email: email,
                password: password
            })
console.log(response.data.message,'response');

            if (response?.data?.status === 201) {
                localStorage.setItem('adminToken', response?.data?.token);
                navigate('/admin')
            }
            else if (response?.data?.status === 400) setError(response?.data?.message)
        } catch (err) {
            console.log('Error happenend in login submit', err);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white', }}>

            <form className='items-center justify-center'
                style={{
                    backgroundColor: "white",
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                }}
                onSubmit={handleSubmit}
            >

                <p style={{ fontFamily: "", fontSize: '30px', marginLeft: '25%',fontWeight : 'bold' }}>Admin Login</p>
                <p  style={{color : 'red',fontSize : '15px',alignItems: 'center',justifyItems : 'center',marginLeft:'27%'}}>{error}</p>

                <BasicTextFields type="email" setError={setError} className='' setInput={setEmail} inputValue={email} placeholder='Email' />

                <BasicTextFields type="password" setError={setError} className='' setInput={setPassword} inputValue={password} placeholder='Password' />

                <Button type={"submit"} className='' style={{ width: '100%', backgroundColor: 'black', color: 'white', }} />
                 <ul className='mt-5 mb-3' style={{fontSize : '20px',fontWeight : 'bold'}}>Password must contain</ul>
                 <ul >Contain at least one lowercase letter.</ul>
                 <ul>Contain at least one uppercase letter.</ul>
                 <ul>Contain at least one digit.</ul>
                 <ul>Be at least 8 characters long.</ul>
            </form>
        </div>
    )
}

export default LogIn