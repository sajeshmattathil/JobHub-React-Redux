import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosHRInstance } from "../../Utils/axios/axios";
import Modal from "./modal";
import ManageJob from "./ManageJobPost";

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
interface JobInterface {
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

  const { id } = useParams();
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
          console.log(extractedJobPostData, "jobpostdata");

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

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleToggleManageModal = () => {
    setIsOp(!isOp);
  };

  if (!notFound)
    return (
      <>
        <button onClick={() => setManageJob((prev) => !prev)}>click me</button>
        {manageJob && <ManageJob jobPostData={jobPostData} />}
        <div>
          <Modal isOpen={isOpen} onClose={handleToggleModal}>
            <div className="">
              <div className="signupForm items-center justify-center">
                {users.map((user: UserInterface) => (
                  <>
                    <p>
                      <span>Name :</span>
                      {`${user.fname} ${user.lname}`}
                    </p>
                    <p>
                      <span>Education :</span> {user.educationalQualification}
                    </p>
                    <p>
                      <span>Years of Experience :</span>
                      {user.experience}
                    </p>
                    <a
                      href={
                        "https://res.cloudinary.com/dbi1vicyc/image/upload/v1707323738/cld-sample.jpg"
                      }
                    >
                      View Resume
                    </a>
                  </>
                ))}
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
                  <button onClick={() => handleToggleModal()}>
                    View Details
                  </button>
                </td>
                <td>
                  <button onClick={() => handleToggleManageModal()}>
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
