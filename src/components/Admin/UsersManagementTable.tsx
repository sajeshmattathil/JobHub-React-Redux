import  { useEffect, useState } from 'react';
import './userManagementCss.css';
import { axiosAdminInstance } from '../../Utils/axios/axios';

interface UserInterface {
    _id?: string;
    fname: string ;
    lname: string;
    email: string;
    password: string;
    isBlocked: boolean;
}

const UsersManagementTable: React.FC = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosAdminInstance.get('/admin/users');
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
                console.log('Error fetching users:');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const onBlock = async (email: string, isBlocked: boolean) => {
        try {
            const response = await axiosAdminInstance.patch('/admin/blockandunblock', { email , isBlocked });
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
            console.log('Error blocking user:');
        }
    };

    // const onViewDetails = () => {
       
    // };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
         <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)', width: 'calc(100% - 200px)' }}>

            <div style={{border:'2px solid grey',margin:'5%',borderRadius:'20px'}}>
            <h2 style={{marginLeft:'3%',marginTop :'3%'}}>Manage your users here</h2>

         <table  style={{marginBottom:'5%'}}>
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
                        <td>{`${user.fname || ''} ${user.lname || ''}`}</td>
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
        </div>
        </div>
        </>
       
    );
};

export default UsersManagementTable;
