import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance, axiosUserInstance } from "../../Utils/axios/axios";
import { CiLocationOn } from "react-icons/ci";
import { IoBagRemoveOutline } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { TiTickOutline } from "react-icons/ti";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Jobs from "../HR/HrHome";

const ViewJobDetails = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [hr, setHR] = useState<HRData | null>(null);
  const [err, setError] = useState<string>("");
  const [shouldRender, setShouldRender] = useState(true);

  const userEmail = localStorage.getItem("userEmail");

  const navigate = useNavigate();

  interface HRData {
    followers: string[];
    _id: string;
    company: string;
    website: string;
    employeesNumber: string;
  }

  interface Job {
    appliedUsers: string[];
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
    createdAt: Date;
    hrObjectId: string;
  }

  const { id } = useParams();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobData = await axiosInstance(`/getJobData/${id}`);

        setJob(jobData?.data?.jobDataFetched[0]);
        setHR(jobData?.data?.jobDataFetched[0]?.jobData[0]);
      } catch (error) {
        console.log(error, "error in catch");
        setError("Something Went Wrong, Try again");
      }
    };
    fetchJobData();
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
          setShouldRender((prev) => !prev);
          console.log(shouldRender);
          console.log(job,'jobssss');
          
        }
      }
    } catch (error) {
      console.log(error, "error in applying job");
      console.log(error.response.data.message);
    }
  };

  const handleFollowHiringManager = async (HRId: string, value: string) => {
    try {
      console.log(HRId, value);
      setShouldRender((prevState) => !prevState);
      console.log(shouldRender, "kdhshkj");

      const followAndUnfollowHR = await axiosUserInstance.patch(
        `/followAndUnfollow/`,
        {
          HRId: HRId,
          value: value,
        }
      );

      console.log(followAndUnfollowHR.data, "followAndUnfollowHR");
    } catch (error) {
      console.log(error, "error in follow unfollow hr");
    }
  };

  return (
    <>
      <div
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
        {job && 
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
                  job.appliedUsers.includes(userEmail) ? (
                    <div
                      style={{
                        color: "green",
                        border: "2px solid green",
                        backgroundColor: "#90EE90",
                        borderRadius: ".5rem",
                        width: "25%",
                        padding: "1%",
                        overflow: "auto",
                      }}
                    >
                      {" "}
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
        }
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
              <h3>About Company</h3>

              <span style={{ fontSize: "17px", marginBottom: "5px" }}>
                {hr.company}
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