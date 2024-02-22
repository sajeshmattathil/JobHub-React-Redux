import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../Utils/axios/axios";
import { CiLocationOn } from "react-icons/ci";
import { IoBagRemoveOutline } from "react-icons/io5";

const ViewJobDetails = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [err, setError] = useState<string>("");

  interface Job {
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
  console.log(id, "id");

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobData = await axiosInstance(`/getJobData/${id}`);
        console.log(jobData, "jobData");
        setJob(jobData.data.jobDataFetched[0]);
      } catch (error) {
        console.log(error, "error in catch");
        setError("Something Went Wrong, Try again");
      }
    };
    fetchJobData();
  }, [id]);
  console.log(job, "job-----", err);

  return (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewJobDetails;
