import React, { useEffect, useState } from "react";
import "./ShowShortListedUsrers.css";
import { axiosHRInstance } from "../../Utils/axios/axios";
import { useNavigate, useParams } from "react-router-dom";

interface UserInterface {
  shortListedUsers: any;
  resume: string;
  skills: string[];
  educationalQualification: string;
  _id?: string;
  fname: string | undefined;
  lname: string;
  email: string;
  password: string;
  isBlocked: boolean;
}
const ShowShortListedUsers = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const { jobId } = useParams();
  console.log(jobId, "jobIdddd");
const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosHRInstance.get(
          `/hr/shortListedUsers/${jobId}`
        );
        console.log(response.data, "res----dataaa>>>>>");
        if (response.data.status === 200) {
          const extractedUsers: UserInterface[] = response.data.usersData.map(
            (user: UserInterface) => ({
              _id: user._id,
              fname: user.shortListedUsers.fname,
              lname: user.shortListedUsers.lname,
              email: user.shortListedUsers.email,
              password: user.shortListedUsers.password,
              resume: user.shortListedUsers.resume,
              skills: user.shortListedUsers.skills,
              educationalQualification:
                user.shortListedUsers.educationalQualification,
            })
          );

          setUsers(extractedUsers);
          console.log(users, "users");

          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [jobId]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <h1 style={{marginLeft : '35%',marginTop : '5%'}}>Short Listed Users</h1>

      <table>
        <thead className="userHead">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>View Resume</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="userTableBody">
          {users.map((user: UserInterface) => (
            <tr key={user._id}>
              <td>{`${user.fname} ${user.lname}`}</td>
              <td>{user.email}</td>
              <td>
              <a
                      href={user.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-resume-link"
                    >
                      View Resume
                    </a>
              </td>
              <td><button onClick={()=>navigate(`/hr/chatPage/${user.email}`)}>Send Messsage</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ShowShortListedUsers;
