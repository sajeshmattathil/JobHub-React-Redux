import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosHRInstance, axiosUserInstance } from "../../Utils/axios/axios";
import Modal from "./modal";
import ManageJob from "./ManageJobPost";

interface UserData {
  fname: string;
  lname: string;
  email: string;
  educationalQualification: string;
  experience: string;
  resume: string;
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
interface JobInterface {
  _id: string;
  createdBy: string | null;
  jobRole: string;
  description: string;
  qualification: string[];
  locations: string[];
  company: string;
  experience: string;
  salaryScale: string;
  education: string;
  course: string;
  educationalQualification?: string;
  industry: string;
  createdAt: Date | number;
}
const ListJobAndManage: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOp, setIsOp] = useState(false);
  const [manageJob, setManageJob] = useState(false);
  const [jobPostData, setJobPostData] = useState<JobInterface[]>([]);
  const [viewSelectedUsr, setSelectedUser] = useState<UserInterface>();
  const [shortListed,setShortListed] = useState<boolean>(false)

  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosHRInstance.get(`/hr/getJobDetails/${id}`);
        console.log(response, "response");

        if (response.data.status == 201) {
          const extractedUsers = response.data.jobData.map(
            (user: {
              _id: string;
              appliedAt: Date;
              userData: {
                resume: string;
                educationalQualification: string;
                email: string;
                lname: string;
                fname: string;
                experience: number;
              }[];
            }) => ({
              _id: user._id,
              appliedAt: user.appliedAt,
              fname: user.userData[0].fname,
              lname: user.userData[0].lname,
              email: user.userData[0].email,
              educationalQualification:
                user.userData[0].educationalQualification,
              experience: user.userData[0].experience,
              resume: user.userData[0].resume,
            })
          );

          const extractedJobPostData = response.data.jobData.map(
            (data: {
              jobPostData: {
                _id: string;
                jobRole: string;
                description: string;
                qualification: string[];
                locations: string[];
                company: string;
                experience: string;
                salaryScale: string;
                educationalQualification?: string;
                industry: string;
              }[];
            }) => ({
              _id: data.jobPostData[0]._id,
              jobRole: data.jobPostData[0].jobRole,
              description: data.jobPostData[0].description,
              qualification: data.jobPostData[0].qualification,
              locations: data.jobPostData[0].locations,
              company: data.jobPostData[0].company,
              salaryScale: data.jobPostData[0].salaryScale,
              industry: data.jobPostData[0].industry,
              educationalQualification:
                data.jobPostData[0].educationalQualification,
            })
          );
          setJobPostData(extractedJobPostData);
          console.log(extractedUsers, "user");

          setUsers(extractedUsers);
          setLoading(false);
        } else {
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

  //   const shortListCandidate = async () => {};

  const handleToggleModal = async (index: number) => {
    setSelectedUser(users[index]);
    setIsOpen(!isOpen);
    await axiosHRInstance.patch(
      `/hr/updateJobpostHRViewed/${jobPostData[0]._id}`
    );
  };
  const handleToggleManageModal = async (userId: string) => {
    setIsOp(!isOp);
    console.log(userId, "userid");
    try {
      const shortListUser = await axiosHRInstance.patch(
        "/hr/shortListUser",
       { userId,
        jobId :jobPostData[0]._id}
      );
      console.log(shortListUser, "shortlistresult");
      if(shortListUser.data.status === 200) setShortListed(true)

    } catch (error) {
      console.log(error, "error in shortlisting");
    }
  };

  if (!notFound)
    return (
      <>
      <button
          style={{ marginLeft: "68%", marginTop: "" }}
          onClick={() => navigate(`/shortListedUsers/${jobPostData[0]._id}`)}
        >
          Short Listed Users
        </button>
        <button
          style={{ marginLeft: "78%", marginTop: "" }}
          onClick={() => setManageJob((prev) => !prev)}
        >
          Manage Job
        </button>
        {manageJob && <ManageJob jobPostData={jobPostData} />}
        <div>
          <Modal isOpen={isOpen} onClose={handleToggleModal}>
            <div className="">
              <div className="signupForm items-center justify-center">
                {viewSelectedUsr && (
                  <div className="resume-container" key={viewSelectedUsr._id}>
                    <p>
                      <span>Name:</span>{" "}
                      {`${viewSelectedUsr.fname} ${viewSelectedUsr.lname}`}
                    </p>
                    <p>
                      <span>Education:</span>{" "}
                      {viewSelectedUsr.educationalQualification}
                    </p>
                    <p>
                      <span>Years of Experience:</span>{" "}
                      {viewSelectedUsr.experience}
                    </p>
                    <a
                      href={viewSelectedUsr.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-resume-link"
                    >
                      View Resume
                    </a>
                  </div>
                )}
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
            {users.map((user: UserInterface, index: number) => (
              <tr key={user._id}>
                <td>{`${user.fname} ${user.lname}`}</td>
                <td>{user.email}</td>

                <td>
                  <button onClick={() => handleToggleModal(index)}>
                    View Details
                  </button>
                </td>
                <td>
                 {shortListed ? <button onClick={() => handleToggleManageModal(user._id)}>
                    Short List
                  </button>
                :
                'Short Listed'  
                }
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
                padding: "5%",
                borderRadius: "5%",
                backgroundColor: "white",
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
