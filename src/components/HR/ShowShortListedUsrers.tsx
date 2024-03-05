import React, { useEffect, useState } from 'react'
import './ShowShortListedUsrers.css'
import { axiosHRInstance } from '../../Utils/axios/axios';
import { useParams } from 'react-router-dom';

interface UserInterface {
    _id?: string;
    fname: string | undefined;
    lname: string;
    email: string;
    password: string;
    isBlocked: boolean;
}
const ShowShortListedUsrers = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
const {jobId } = useParams()
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosHRInstance.get(`/hr/shortListedUsers${jobId}`);
                console.log(response.data);

                if (response.data.status === 201) {
                    const extractedUsers: UserInterface[] = response.data.usersData.map((user: UserInterface) => ({
                        _id: user._id,
                        fname: user.fname,
                        lname: user.lname,
                        email: user.email,
                        password: user.password,
                        isBlocked: user.isBlocked,
                    }));

                    setUsers(extractedUsers);
                    setLoading(false);
                }
            } catch (error) {
                console.log('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
    <>
     <table>
            <thead className="userHead">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="userTableBody">
                {users.map((user: UserInterface) => (
                    <tr key={user._id}>
                        <td>{`${user.fname} ${user.lname}`}</td>
                        <td>{user.email}</td>
                        <td>{user.isBlocked ? 'Blocked' : 'Active'}</td>
                        <td>
                            <button onClick={() => onBlock(user.email, user.isBlocked)}>
                                {user.isBlocked ? 'Unblock' : 'Block'}
                            </button>
                        </td>
                        {/* <td>
                        <button onClick={() => onViewDetails()}>View Details</button>

                        </td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default ShowShortListedUsrers
