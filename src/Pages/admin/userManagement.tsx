import React, { useEffect, useState } from 'react';
import './userManagement.css';
import axiosInstance from '../../Utils/axios/axios';
import { Navbar } from '@material-tailwind/react';

interface UserInterface {
    _id?: string;
    fname: string | undefined;
    lname: string;
    email: string;
    password: string;
    isBlocked: boolean;
}

const UserManagementTable: React.FC = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/admin/users');
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

    const onBlock = async (email: string, isBlocked: boolean) => {
        try {
            console.log('Blocking user:', email);
            const response = await axiosInstance.put('/admin/blockandunblock', { email , isBlocked });
            console.log('Block user response:', response);

            if (response.data.status === 201) {
                const updatedUsers = users.map((user) => {
                    if (user.email === email) {
                        return { ...user, isBlocked: !isBlocked };
                    }
                    return user;
                });

                setUsers(updatedUsers);
            }
        } catch (error) {
            console.log('Error blocking user:', error);
        }
    };

    // const onViewDetails = () => {
       
    // };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Navbar children={'jjj'} placeholder={'undefined'}/>
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
       
    );
};

export default UserManagementTable;
