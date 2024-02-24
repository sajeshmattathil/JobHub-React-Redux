import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosHRInstance } from "../../Utils/axios/axios";
import Modal from './modal';


interface UserData {
    fname: string;
    lname: string;
    email: string;
    educationalQualification: string;
    experience: string;
  }
  
  interface UserInterface {
    resume: string | undefined;
    fname: string;
    lname: string;
    email: string;
    educationalQualification: string;
    experience: string;
    _id: string;
    userData: UserData;
    appliedAt: Date;
  }
const ListJobAndManage: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);


  const { id } = useParams();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosHRInstance.get(`/hr/getJobDetails/${id}`);

        if (response.data.status == 201) {
          const extractedUsers = response.data.jobData.map(
            (user: { _id: string; appliedAt: Date; userData: {
                resume: string;
                educationalQualification: string;
                email: string;
                lname: string;
                fname: string; experience: number; 
}[]; }) => ({
              _id: user._id,
              appliedAt: user.appliedAt,
              fname: user.userData[0].fname,
              lname: user.userData[0].lname,
              email: user.userData[0].email,
              educationalQualification: user.userData[0].educationalQualification,
              experience: user.userData[0].experience,
              resume: user.userData[0].resume,


            })
          );

          setUsers(extractedUsers);
          setLoading(false);
        } else{
          setLoading(false);
          setNotFound(true);
        } 
      } catch (error) {
        console.log("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // const onViewDetails = () => {

  // };

  if (loading) {
    return <div>Loading...</div>;
  }


  const shortListCandidate = async () => {};


  const handleToggleModal = () => {
    setIsOpen(!isOpen);
    console.log(isOpen,'isopen');
    
  };
  if (!notFound)
    return (
      <>
      <div>
        <Modal isOpen={isOpen} onClose={handleToggleModal}>
        <div
          className="signup"
          style={{
            marginTop: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "1vh",
            backgroundColor: "rgb(240, 220, 220)",
            width :'45%',
            margin : '30vh',
            marginLeft : "30%",
            zIndex: '1000',
            position: 'fixed',

          }}
          
        >
          <div
            className="signupForm items-center justify-center"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            }}
          >
          {users.map((user: UserInterface) => (
            <>
           
          <p><span>Name :</span>{`${user.fname} ${user.lname}`}</p>
          <p><span>Education :</span> {user.educationalQualification }</p>
          <p><span>Years of Experience :</span>{user.experience }</p>
          <a href={"https://res.cloudinary.com/dbi1vicyc/image/upload/v1707323738/cld-sample.jpg"}>View Resume</a>

          </>
          )) 
        }
        </div>
        </div>
        </Modal>
      </div>
        <table>
          <thead className="userHead">
            <tr>
              <th>Name</th>
              <th>Email</th>
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
                  <button onClick={() => handleToggleModal()}>View Details</button>
                </td>
                <td>
                  <button onClick={() => shortListCandidate()}>
                    Short List
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </>
    );
   
       
  
  else
    return (
      <>
        <table>
          <thead className="userHead"></thead>
          <tbody className="userTableBody">
            <div
              style={{
                fontSize: "180%",
                fontWeight: "bolder",
                margin: "5%",
                border: "2px solid black",
                padding : '5%',
                borderRadius : '5%',
                backgroundColor : 'white'
              }}
            >
              No candidate applied for this job.
            </div>
          </tbody>
        </table>
      </>
    );

    
};


export default ListJobAndManage;
