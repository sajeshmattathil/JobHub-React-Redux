import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Utils/axios/axios'

function UpdateUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [education,setEducation] = useState('')
    const[mobile,setMobile] = useState('')
    const [skill,setSkill] = useState('')
    f
    const navigate = useNavigate()

    useEffect(() => {
       
    }, [])
    const handleSubmit = (e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        const token = localStorage.getItem('token');
        console.log(token, 'token')

        axiosInstance.put(`/update`, { Name: name, Email: email, Password: password }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((result) => {
                console.log(result.data.Name)
                navigate('/')
            })
            .catch(err => console.log('Something went wrong', err.message))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit} >
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text " onChange={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setName(e.target.value)} value={name} className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="email " onChange={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value)} value={email} className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Password</label>
                        <input type="password " onChange={(e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)} value={password} className='form-control' />
                    </div>
                    <button type='submit' className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser