import  { useEffect, useState } from "react";
import "./ShowShortListedUsrers.css";
import { axiosHRInstance } from "../../Utils/axios/axios";
import { useNavigate, useParams } from "react-router-dom";

interface ShortListedUsersInterface {
  educationalQualification: string;
  skills: string[];
  resume: string;
  password: string;
  lname: string;
  fname: string;
  email: string;
  isShortListed: boolean;
}

interface UserInterface {
  shortListedUsers: ShortListedUsersInterface;
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
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosHRInstance.get(
          `/hr/shortListedUsers/${jobId}`
        );
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
      <h1 style={{ marginLeft: "35%", marginTop: "5%" }}>Short Listed Users</h1>

      <table>
        <thead className="userHead">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>View Resume</th>
            <th></th>
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
              <td>
                <button onClick={() => navigate(`/hr/chatPage/${user.email}`)}>
                  Send Messsage
                </button>
              </td>
              <td>
                <button onClick={() => navigate(`/hr/videoCall/${user.email}`)}>
                  Video Call
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ShowShortListedUsers;
