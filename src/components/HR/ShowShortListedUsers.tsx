import  { useEffect, useState } from "react";
import "./ShowShortListedUsrersStyle.css";
import { axiosHRInstance } from "../../Utils/axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ShortListedUsersInterface {
  _id: string;
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
  jobId: string;
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
  const [render, setRender] = useState<boolean>(false);


  const { jobId } = useParams();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axiosHRInstance.get(
        `/hr/shortListedUsers/${jobId}`
      );
      if (response.data.status === 200) {
        const extractedUsers: UserInterface[] = response.data.usersData.map(
          (user: UserInterface) => ({
            jobId:user._id,
            _id: user.shortListedUsers._id,
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

  useEffect(() => {
    fetchUsers(); 
  }, []);
  useEffect(() => {
    fetchUsers(); 
  }, [render]);
  
  const handleRemoveFromShortlist = async (email : string,jobId : string)=>{
    try {
      const RemoveFromShortListed = await axiosHRInstance.patch('/hr/removeFromShortListed',{email,jobId})
      if(RemoveFromShortListed.status === 200){
        const filteredUsers = users.filter((user)=>user.email !== email)
        setUsers(filteredUsers)
        toast.success("Removed Succesfully"); 
      console.log(render)
        setRender(!render)
      }  
    } catch (error) {
      console.log('Something went wrong ,try again.');
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if(users.length)
  return (
    <>
      <ToastContainer />
      <h1 style={{ marginLeft: "35%", marginTop: "5%" }}>Short Listed Users</h1>
      <table>
        <thead className="userHead">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>View Resume</th>
            <th></th>
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
              <td style={{fontSize:'200%',cursor:'pointer'}} onClick={()=>handleRemoveFromShortlist(user.email,user.jobId)}><CiCircleRemove /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
  else return(
    <>
    <ToastContainer />
    <h1 style={{ marginLeft: "35%", marginTop: "5%" }}>Short Listed Users</h1>
    <table>
      <h3 style={{ marginLeft: "35%", marginTop: "5%" }}>No users found</h3>
    </table>
  </>
  )
};

export default ShowShortListedUsers;
