/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { axiosInstance, axiosUserInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();
  const [pageNumber, setPage] = useState<number>(1);
  const [totalPages, setTotalpages] = useState<number>(1);
  const [jobs, setJobs] = useState<jobData[]>([]);
  const [msg, setMsg] = useState<string>("");

  interface jobData {
    _id: string;
    jobRole: string;
    description: string;
    qualification: [string];
    salaryFrom: string;
    salaryTo: string;
    company: string;
    createdAt: Date | number;
    locations: [string];
  }

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    console.log(pageNumber, typeof pageNumber, "page no.");

    const fetchData = async () => {
      try {
        const fetchedData = await axiosInstance.get(
          `/getJobs?jobsPerPage=5&page=${pageNumber}`
        );

        console.log(fetchedData, "fetchedData");

        if (fetchedData.data.status === 201) {
          const data = fetchedData.data;
          const pages = Math.ceil(data.totalJobs / 5);
          setTotalpages(pages);
          setJobs(data.jobData);
          setMsg("jobs found");
          console.log(jobs, "jobssss");
        } else {
          console.log("elseeee");
          setMsg("");
        }
      } catch (error) {
        console.log(error, "err");
        setMsg("no jobs");
      }
    };
    fetchData();
  }, [pageNumber]);

const handleViewJob = (id : string)=>{
  return (event: React.MouseEvent<HTMLDivElement>) => {
  navigate(`/jobPost/${id}`)

};
}

  console.log(msg, "msg");

  if (msg != "") {
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
          {jobs.map((job, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f5f5f5",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: "20px",
                width: "70%",
                justifyContent: "center",
                alignContent: "center",
                cursor: "pointer"
              }}
              onClick={handleViewJob(job._id)}
            >
              <h2 style={{ marginBottom: "10px" }}>{job.jobRole}</h2>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "14px", marginBottom: "5px" }}>
                  Skill Required:{" "}
                  {job.qualification.map((skill) => `${skill} ,`)}
                </span>
                <span style={{ fontSize: "14px", marginBottom: "5px" }}>
                  {job.locations.map((location) => `${location} ,`)}
                </span>
                <span style={{ fontSize: "14px", marginBottom: "5px" }}>
                  Company: {job.company}
                </span>
                <span style={{ fontSize: "14px", marginBottom: "5px" }}>
                  Posted At: {job.createdAt.toString().split("T")[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
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
              count={totalPages}
              variant="outlined"
              shape="rounded"
              onChange={(e, value) => setPage(value)}
            />
          </Stack>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            className="content"
            style={{
              fontSize: "30px",
              textAlign: "center",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            No jobs found
          </div>
        </div>
      </>
    );
  }
};

export default UserHome;