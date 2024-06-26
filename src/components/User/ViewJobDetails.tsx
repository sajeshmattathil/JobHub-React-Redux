import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance, axiosUserInstance } from "../../Utils/axios/axios";
import { CiLocationOn } from "react-icons/ci";
import { IoBagRemoveOutline } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { TiTickOutline } from "react-icons/ti";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { BsSend } from "react-icons/bs";
// import Jobs from "../HR/HrHome";

const ViewJobDetails = () => {
  interface AppliedJob {
    isHRViewed: boolean;
    isReplayed: boolean;
    isShortlisted: boolean;
  }

  const [job, setJob] = useState<Job | null>(null);
  const [hr, setHR] = useState<HRData | null>(null);
  const [appliedJob, setAppliedJob] = useState<AppliedJob>({
    isHRViewed: false,
    isReplayed: false,
    isShortlisted: false,
  });
  const [isApplied, setIsApplied] = useState<string>("");
  const [shouldRender, setShouldRender] = useState<string | null>(null);
  // const [isApplied, setIsApplied] = useState<string>("");

  const userEmail = localStorage.getItem("userEmail");

  // const checkApplied = job?.appliedUsers.filter(
  //   (user) => user.email === userEmail
  // );
  // if (checkApplied?.length) isApplied = checkApplied[0].email;
  // if(checkApplied?.length) setIsApplied(checkApplied[0].email)

  const navigate = useNavigate();

  interface HRData {
    email: string;
    name: string;
    followers: string[];
    _id: string;
    company: string;
    website: string;
    employeesNumber: string;
  }
  interface AppliedArray {
    email: string;
    isShortListed: boolean;
  }

  interface Job {
    appliedUsers: AppliedArray[];
    industry: string;
    educationalQualification: string;
    experience: string;
    _id: string;
    jobRole: string;
    description: string;
    qualification: string[];
    jobType: string;
    locations: string[];
    company: string;
    salaryFrom: string;
    salaryTo: string;
    salaryPackage :{min:string,max:string};
    createdAt: Date;
    hrObjectId: string;
  }

  const { id } = useParams();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobData = await axiosInstance(`/getJobData/${id}`);
        setJob(jobData?.data?.jobDataFetched[0]);

        // console.log(job,'job?.appliedUsers')

        const checkApplied =
          jobData?.data?.jobDataFetched[0]?.appliedUsers.filter(
            (user: { email: string | null }) => user.email === userEmail
          );
        console.log(checkApplied, "checkApplied");
        if (checkApplied?.length) {
          setIsApplied(checkApplied[0].email);
        }

        setHR(jobData?.data?.jobDataFetched[0]?.jobData[0]);
        setAppliedJob(jobData?.data?.jobDataFetched[0]?.appliedData[0]);
      } catch (error) {
        console.log("Something Went Wrong, Try again");
      }
    };
    fetchJobData();
    setShouldRender(null);

    return () => {
      setAppliedJob({
        isHRViewed: false,
        isReplayed: false,
        isShortlisted: false,
      });
      setJob(null);
    };
  }, [id, shouldRender]);

  const handleApplyJob = async () => {
    try {
      if (job && hr) {
        const applyJob = await axiosUserInstance.post("/applyJob", {
          jobId: job._id,
          hrId: hr._id,
          appliedAt: Date.now(),
        });
        if (applyJob.data.status === 201) {
          console.log("applied succesfully");
          setAppliedJob(applyJob.data.appliedJob);
          setShouldRender("yes");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const handleFollowHiringManager = async (HRId: string, value: string) => {
    try {
      // setShouldRender((prevState) => !prevState);
      console.log(hr);
      const followAndUnfollowHR = await axiosUserInstance.patch(
        `/followAndUnfollow/`,
        {
          HRId: HRId,
          value: value,
        }
      );

      console.log(followAndUnfollowHR.data, "followAndUnfollowHR");

      if (followAndUnfollowHR.status === 200 && hr) {
        if (value === "follow+" && userEmail && hr) {
          const updatedHR: HRData = {
            ...hr,
            followers: [...hr.followers, userEmail],
          };
          setHR(updatedHR);
        } else {
          const updatedFollowers =
            hr.followers.filter((user) => user !== userEmail) || [];
          const updatedHR: HRData = { ...hr, followers: updatedFollowers };
          setHR(updatedHR);
        }
      }
    } catch (error) {
      console.log("error in follow unfollow hr");
    }
  };

  const handleSendMessage = async (email: string) => {
    try {
      const verifyUserSubscribed = await axiosUserInstance.get("/getUser");
      if (verifyUserSubscribed?.data?.user?.subscription?.isSubscribed)
        navigate(`/chatPage/${email}`);
      else {
        navigate("/subscriptionPlans");
      }
    } catch (error) {
      console.log("error in sending message");
    }
  };

  return (
    <>
      <div
        className="jobContainer"
        style={{
          display: "flex",
          gap: "20px",
          margin: "5%",
          borderRadius: "2px solid black",
          backgroundColor: "",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {job && (
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
              width: "70%",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <h2 style={{ marginBottom: "10px", marginTop: "4vh" }}>
              {job.jobRole}
            </h2>
            <span style={{ fontSize: "17px", marginBottom: "5px" }}>
              {job.company}
            </span>
            <div style={{ fontSize: "17px", marginBottom: "5px" }}>
              <span>
                <IoBagRemoveOutline />
              </span>{" "}
              {job.experience} yrs
            </div>
           { <div style={{ fontSize: "17px", marginBottom: "5px" }}>
              <span>
                <IoBagRemoveOutline />
              </span>{" "}
              {job?.salaryPackage?.min}-{job?.salaryPackage?.max} LPA
            </div>}
            <div style={{ fontSize: "17px", marginBottom: "5px" }}>
              <span>
                <CiLocationOn />
              </span>{" "}
              {job.locations.map((location: string) => `${location} ,`)}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "17px",
                  marginBottom: "15px",
                  marginTop: "2vh",
                }}
              >
                Skill Required:{" "}
                {job.qualification.map((skill: string) => `${skill} ,`)}
              </span>
              <span style={{ fontSize: "15px", marginBottom: "5px" }}>
                Posted At: {job.createdAt.toString().split("T")[0]}
              </span>
              <div style={{ height: "5vh" }}></div>

              <h5>Job Desciption</h5>
              <div style={{ fontSize: "17px", marginBottom: "5px" }}>
                {job.description}
              </div>
              <div style={{ height: "10vh" }}></div>
              <h1></h1>
              <span style={{ fontSize: "17px", marginBottom: "5px" }}>
                Education: {job.educationalQualification}
              </span>
              <div style={{ fontSize: "17px", marginBottom: "5px" }}>
                Industry Type: {job.industry}
              </div>
              <div
                style={{
                  marginLeft: "30%",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {userEmail ? (
                  isApplied ? (
                    <div
                      style={{
                        color: "green",
                        border: "2px solid green",
                        borderRadius: ".5rem",
                        maxWidth: "100px",
                        padding: "1%",
                        overflow: "auto",
                      }}
                    >
                      <TiTickOutline /> Applied
                    </div>
                  ) : (
                    <Button variant="outlined" onClick={handleApplyJob}>
                      Apply
                    </Button>
                  )
                ) : (
                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      onClick={() => navigate("/signup")}
                    >
                      Register
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  </Stack>
                )}
              </div>
            </div>
          </div>
        )}

        {isApplied.trim() && (
          <div
            className="apply"
            style={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
              display: "flex", // Ensure flex properties work properly
              justifyContent: "center",
              alignItems: "center", // Align items vertically
            }}
          >
            <Timeline position="left">
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color={appliedJob ? "success" : "primary"} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={{ flex: 1 }}>
                  <div style={{ maxWidth: "100px" }}>Job applied</div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot
                    color={appliedJob.isHRViewed ? "success" : "primary"}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={{ flex: 1 }}>
                <div style={{ maxWidth: "60px" }}> HR viewed application</div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot
                    color={appliedJob.isShortlisted ? "success" : "primary"}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={{ flex: 1 }}>
                <div style={{ maxWidth: "60px" }}>Shortlisted</div>
                
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot
                    color={appliedJob.isReplayed ? "success" : "primary"}
                  />
                </TimelineSeparator>
                <TimelineContent style={{ flex: 1 }}>
                <div style={{ maxWidth: "60px" }}>Get response</div>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        )}
      </div>

      <div
        className="aboutCompany"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin: "5%",
          borderRadius: "2px solid black",
          backgroundColor: "",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {hr && (
          <div
            className="outer"
            style={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
              width: "70%",
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
            }}
          >
            <div className="inner" style={{ width: "80%" }}>
              <h3>About Hiring Manager</h3>

              <span style={{ fontSize: "17px", marginBottom: "5px" }}>
                
                Working at {hr.company}
              </span>
              <div style={{ fontSize: "17px", marginBottom: "5px" }}>
                <span>
                  <CiGlobe />
                </span>{" "}
                {hr.website}
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "15px", marginBottom: "5px" }}>
                  <FaPeopleGroup />
                  <span></span> {hr.employeesNumber} employees
                </span>
              </div>
              <div>
                <BsSend />{" "}
                <span style={{ padding: "2%", fontSize: "1rem" }}>
                  {hr.name}(Hiring Manager)
                </span>
                <span
                  style={{
                    marginRight: "1%",
                  }}
                >
                  {userEmail?.trim() && (
                    <button
                      style={{
                        border: "2px solid black",
                        borderRadius: ".5rem",
                        padding: "1%",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSendMessage(hr.email)}
                    >
                      Send Message
                    </button>
                  )}
                </span>
              </div>
            </div>
            <div>
              {userEmail && (
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleFollowHiringManager(
                      hr._id,
                      hr.followers.includes(userEmail) ? "Unfollow" : "follow+"
                    )
                  }
                >
                  {hr.followers.includes(userEmail) ? "Unfollow" : "follow+"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewJobDetails;
