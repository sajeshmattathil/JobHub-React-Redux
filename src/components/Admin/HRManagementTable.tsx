import React, { useEffect, useState } from 'react';
import { axiosAdminInstance } from '../../Utils/axios/axios';
import { Pagination, Stack } from '@mui/material';

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
    const [pageNumberApprovalTable, setPageApprovalTable] = useState<number>(1);
    const [totalPagesApprovalTable, setTotalpagesApprovalTable] = useState<number>(1);
    const [pageNumberHRTable, setPageHRTable] = useState<number>(1);
    const [totalPagesHRTable, setTotalpagesHRTable] = useState<number>(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosAdminInstance.get(`/admin/hiringmanagers?jobsPerPage=5&page=${pageNumberApprovalTable}`);
                console.log(response.data);

                if (response.data.status === 201) {
                    const data = response.data;
                    const pages = Math.ceil(data.totalJobs / 5);
                    setTotalpagesApprovalTable(pages);

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
    }, [pageNumberApprovalTable]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosAdminInstance.get(`/admin/hiringmanagersApproved?jobsPerPage=5&page=${pageNumberHRTable}`);
                console.log(response.data);

                if (response.data.status === 201) {
                    const extractedHRs: HRInterface[] = response.data.HRData.filter((HR: HRInterface) => HR.isApproved === true );
                    const data = response.data;
                    const pages = Math.ceil(data.totalJobs / 5);
                    setTotalpagesHRTable(pages);

                    setHR(extractedHRs);
                   
                    setLoading(false);
                    setReload(false)
                }
            } catch (error) {
                console.log('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [pageNumberHRTable,reload]);

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
        <div>
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
        <div
          className="pagination"
          style={{
            margin: "3%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={totalPagesHRTable}
              variant="outlined"
              shape="rounded"
              onChange={(e, value) => setPageHRTable(value)}
            />
          </Stack>
        </div>
        </div>
        <div>
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

        <div
          className="pagination"
          style={{
            margin: "3%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={totalPagesApprovalTable}
              variant="outlined"
              shape="rounded"
              onChange={(e, value) => setPageApprovalTable(value)}
            />
          </Stack>
        </div>
        </div>

        </>
       
    );
};

export default HRManagementTable;
