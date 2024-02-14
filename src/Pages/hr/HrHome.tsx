import React, { useEffect, useState } from "react";
import { axiosHRInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";

const Jobs = () => {

    const navigate = useNavigate()

  interface jobData {
    jobRole: string;
    description: string;
    qualification: string;
    salaryFrom: string;
    salaryTo: string;
    company: string;
    createdAt: Date | number;
  }
  const [jobs, setJobs] = useState<jobData[]>([]);
  const [msg, setMsg] = useState<string>("");

  const HREmail = localStorage.getItem('HREmail')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await axiosHRInstance.get(`/hr/getJobs/${HREmail}`);

        console.log(fetchedData, "fetchedData");

        if (fetchedData.data.status === 201) {
          const data = fetchedData.data;
          console.log(data.jobs, "jobs");

          setJobs(data.jobs);
        } else setMsg("No jobs found");
      } catch (error) {
        console.log(error, "err");
        setMsg("no jobs");
      }
    };
    fetchData();
  }, []);
  console.log(msg, "msg");
  if(!HREmail){
    return (
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
              fontSize: "60px",
              textAlign: "center",
              padding: "20px",
              // border: "1px solid #ccc",
              // borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
          404 ERROR
          </div>
        </div>
    )
  }

  if (msg == "") {
    return (
      <>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "#fff",
            color: "#333",
            borderBottom: '2px solid #333'
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>JobHub</h1>
          </div>
          <div>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={()=>navigate('/hr/job')}
            >
              Create Jobs
            </button>
          </div>
        </nav>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {jobs.map((job, index) => (
  <div
    key={index}
    style={{
      backgroundColor: "#f5f5f5",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px", // Add margin bottom for spacing between job listings
    }}
  >
    <h2 style={{ marginBottom: "10px" }}>{job.jobRole}</h2>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: "14px", marginBottom: "5px" }}>
        Qualification: {job.qualification  }
      </span>
      <span style={{ fontSize: "14px", marginBottom: "5px" }}>
        Company: {job.company}
      </span>
      <span style={{ fontSize: "14px", marginBottom: "5px" }}>
        Posted At: {job.createdAt.toString().split('T')[0]}
      </span>
    </div>
    <button
      style={{
        marginTop: "10px", 
        padding: "8px 16px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    //   onClick={() => handleApply(job)} 
    >
    Manage
    </button>
  </div>
))}

        </div>
      </>
    );
  } else {
    return (
      <>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "#fff",
            color: "#333",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>JobHub</h1>
          </div>
          <div>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={()=>navigate('/hr/job')}

            >
              Create Jobs
            </button>
          </div>
        </nav>
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

export default Jobs;
