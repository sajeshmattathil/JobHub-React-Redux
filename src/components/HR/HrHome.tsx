import  { useEffect, useState } from "react";
import { axiosHRInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const HrHome = () => {

    const navigate = useNavigate()

  interface jobData {
    _id: string;
    jobRole: string;
    description: string;
    qualification: [string];
    locations : [string];
    salaryFrom: string;
    salaryTo: string;
    company: string;
    createdAt: Date | number;
    jobType : string
  }
  const [pageNumber, setPage] = useState<number>(1);
  const [totalPages,setTotalpages] = useState<number>(1)
  const [jobs, setJobs] = useState<jobData[]>([]);
  const [msg, setMsg] = useState<string>("");

  const HREmail = localStorage.getItem('HREmail')

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const fetchedData = await axiosHRInstance.get(`/hr/getJobs/${HREmail}?jobsPerPage=3&page=${pageNumber}`);


        if (fetchedData.data.status === 201) {
          const data = fetchedData.data;
          console.log(data.jobs, "jobs");

          const pages  =Math.ceil(data.totalPages / 5);
          setTotalpages(pages)
          setJobs(data.jobs);
        } else setMsg("No jobs found");
      } catch (error) {
        console.log(error, "err");
        setMsg("no jobs");
      }
    };
    fetchData();
  }, [pageNumber]);
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
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {jobs.map((job, index) => (
  <div
    key={index}
    style={{
      backgroundColor: "#f5f5f5",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px", 
      cursor : 'pointer'
    }}
onClick={()=>navigate(`/hr/viewJob/${job._id}`)}
  >
    <h2 style={{ marginBottom: "10px" }}>{job.jobRole}</h2>

    <span style={{ fontSize: "20px", marginBottom: "5px" ,fontWeight:'bold' }}>
      {job.company}
      </span>

     

    <div style={{ display: "flex", flexDirection: "column" }}>
      
    <span style={{ fontSize: "20px", marginBottom: "5px" , }}>
      {job.jobType}
      </span>

      <span style={{ fontSize: "14px", marginBottom: "5px" }}>
        Skills Required: {job.qualification.map((skill) => `${skill} ,`) }
      </span>

      <span style={{ fontSize: "14px", marginBottom: "5px" }}>
        {job.locations.map((location) => `${location} ,`) }
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
              onChange={(_e, value) => setPage(value)}
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

export default HrHome;
