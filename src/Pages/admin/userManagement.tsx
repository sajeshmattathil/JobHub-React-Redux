import React, { useEffect, useState } from 'react';
import './userManagement.css'
import axiosInstance from '../../Utils/axios/axios';
interface userInterface{
    _id ?: string,
    fname : string | undefined,
    lname : string,
    email : string ,
    password : string,
    isBlocked : boolean
}
const UserManagementTable = () => {
  const [users,setUsers] = useState<userInterface[]>([])


   useEffect( ()=>{
   
        const fetchUsers = async ()=>{

            try {
                const response = await axiosInstance.get('/admin/users')
                console.log(response.data);
               
                if(response.data.status === 201){
                    const extractData : userInterface[] = response?.data?.usersData.map((user : userInterface)=>({
                        id : user._id,
                        fname :user.fname ,
                        lname : user.lname,
                        email : user.email,
                        isBlocked :user.isBlocked
                 }))
               
                 
                   setUsers(extractData)
                }
             
               
                
            } catch (error) {
                console.log(error);    
            } 
   }
   fetchUsers()
},[])
    
    const onBlock = async (email : string)=>{
      try {
       const blockUser = await axiosInstance.put('/admin/blockandunblock_user',{email : email})
       console.log(blockUser);
       
      } catch (error) {
        console.log("Error happened in blocking users",error);  
      }
    }
    const onUnblock = ()=>{
        
    }
    const onViewDetails = ()=>{
        
    }

    return (
        <table>
            <thead className='userHead'>
                <tr >
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className='userTableBody' >
                {users.map((user : userInterface) => (
                    <tr >
                        <td>{`${user.fname} ${user.lname}`}</td>
                        <td>{user.email}</td>
                        <td>{user.isBlocked ?'Blocked' : 'Active'}</td>
                        <td>
                            <button onClick={() => onBlock(user.email)}>Block</button>
                            <button onClick={() => onUnblock()}>Unblock</button>
                            <button onClick={() => onViewDetails()}>View Details</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserManagementTable;
