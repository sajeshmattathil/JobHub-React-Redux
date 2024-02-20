import React, { useEffect, useState } from 'react';
import { axiosAdminInstance } from '../../Utils/axios/axios';

interface HRInterface {
    _id?: string;
    name: string | undefined;
    email: string;
    password: string;
    isBlocked ?: boolean;
    isApproved ?: boolean 
}

const HRManagementTable: React.FC = () => {
    const [approvalPendingHRs,setRequestPendigHRs] = useState<HRInterface[]>([]);
    const [HRs, setHR] = useState<HRInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [reload, setReload] = useState<boolean>(false);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosAdminInstance.get('/admin/hiringmanagers');
                console.log(response.data);

                if (response.data.status === 201) {
                    const extractedHRs: HRInterface[] = response.data.HRData.filter((HR: HRInterface) => HR.isApproved === true );
                       

                    setHR(extractedHRs);
                    const requestPendingHRs: HRInterface[] = response.data.HRData.filter((HR: HRInterface) => HR.isApproved === false );

                    setRequestPendigHRs(requestPendingHRs);
                    setLoading(false);
                    setReload(false)
                }
            } catch (error) {
                console.log('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [reload]);

    const onBlock = async (email: string, isBlocked: boolean | undefined) => {
        try {
            console.log('Blocking user:', email);
            const response = await axiosAdminInstance.patch('/admin/hrblockandunblock', { email , isBlocked });
            console.log('Block user response:', response);

            if (response.data.status === 201) {
                console.log(HRs);
                
                const updatedHR = HRs.map((HR) => {
                    if (HR.email === email) {
                        console.log(HR,'hrrrr');
                        
                        return { ...HR, isBlocked: !isBlocked };
                    }
                    return HR;
                });

                setHR(updatedHR);
            }
        } catch (error) {
            console.log('Error blocking user:', error);
        }
    };

    const onApprove = async (email: string) => {
        try {
            console.log('Blocking user:', email);
            const response = await axiosAdminInstance.patch('/admin/hrapprove', { email});
            console.log('Approve HR response:', response);

            if (response.data.status === 201) {
                const updatedHR = approvalPendingHRs.filter((HR) => HR.email !== email);

                setRequestPendigHRs(updatedHR);
                setReload(true)
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
        <h2 style={{marginLeft:'15%'}}>Manage Approval Requests of Hiring Managers</h2>
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
                {approvalPendingHRs.length ? approvalPendingHRs.map((HR: HRInterface) => (
                    <tr key={HR._id}>
                        <td>{`${HR.name} `}</td>
                        <td>{HR.email}</td>
                        <td>{HR.isApproved ? 'Approved' : ' Not Approved'}</td>
                        <td>
                            <button onClick={() => onApprove(HR.email)}>
                                {HR.isApproved ? 'Decline' : 'Approve'}
                            </button>
                        </td>
                        {/* <td>
                        <button onClick={() => onViewDetails()}>View Details</button>

                        </td> */}
                    </tr>
                )) : <div style={{margin : '30%',width : '400px',paddingLeft : '30%',fontWeight:'bolder'}}>{'No Hiring Managers found'}</div>  }
            </tbody>
        </table>

        <h2 style={{marginLeft:'15%',marginTop :'15%'}}>Manage Hiring Managers</h2>
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
                {HRs.length ? HRs.map((HR: HRInterface) => (
                    <tr key={HR._id}>
                        <td>{`${HR.name} `}</td>
                        <td>{HR.email}</td>
                        <td>{HR.isBlocked ? 'Active' : 'Blocked'}</td>
                        <td>
                            <button onClick={() => onBlock(HR.email, HR.isBlocked)}>
                                {HR.isBlocked ? 'Block' : 'Unblock'}
                            </button>
                        </td>
                        {/* <td>
                        <button onClick={() => onViewDetails()}>View Details</button>

                        </td> */}
                    </tr>
                )) : <div style={{margin : '30%',width : '400px',paddingLeft : '30%',fontWeight:'bolder'}}>{'No Hiring Managers found'}</div>  }
            </tbody>
        </table>
        </>
       
    );
};

export default HRManagementTable;
