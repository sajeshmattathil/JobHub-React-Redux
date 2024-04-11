/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { axiosInstance, axiosUserInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SearchValue {
  option: string;
  value: string;
}
const UserHome = ({
  searchData,
  sortData,
}: {
  searchData: SearchValue | null;
  sortData: string;
}) => {
  const navigate = useNavigate();
  const [pageNumber, setPage] = useState<number>(1);
  const [totalPages, setTotalpages] = useState<number>(1);
  const [jobs, setJobs] = useState<jobData[]>([]);
  const [jobsCopy, setJobsCopy] = useState<jobData[]>([]);

  const [msg, setMsg] = useState<string>("");

  interface jobData {
    salaryScale: string;
    _id: string;
    jobRole: string;

    description: string;
    qualification: [string];
    company: string;
    createdAt: Date;
    locations: [string];
  }

  useEffect(() => {
    const fetchData = async () => {
      let fetchedData;
      try {
        if (localStorage.getItem("userEmail")?.trim())
          fetchedData = await axiosUserInstance.post(
            `/getJobs?jobsPerPage=5&page=${pageNumber}`,
            searchData
          );
        else
          fetchedData = await axiosInstance.post(
            `/getJobs?jobsPerPage=5&page=${pageNumber}`,
            searchData
          );

        if (fetchedData.data.status === 201) {
          const data = fetchedData.data;

          const pages = Math.ceil(data.totalJobs / 5);
          console.log(pages, "pagessss");
          setTotalpages(pages);
          setJobsCopy(data.jobData);
          setJobs(data.jobData);
          setMsg("jobs found");
        } else {
          toast.success("No jobs found");
        }
      } catch (error) {
        console.log("Something went wrong,try again");
        setMsg("no jobs");
      }
    };
    fetchData();
    return () => {
      setJobs([]);
      setMsg("No jobs");
    };
  }, [pageNumber, searchData]);

  useEffect(() => {
    if (sortData == "old-new") {
      // console.log(jobs[0].createdAt);
      const jobsSorted = [...jobs].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setJobs(jobsSorted);
    } else {
      const filteredJobs = [...jobs].filter(
        (job) => parseInt(job.salaryScale.split("")[1]) >= 5
      );
      setJobs(filteredJobs);
    }
    return () => {
      const user = localStorage.getItem("authToken");
      if (user && user !== "undefined") {
        console.log(window.history, "window");
      }
    };
  }, [sortData]);


  const handleViewJob = (id: string) => {
    return (_event: React.MouseEvent<HTMLDivElement>) => {
      navigate(`/jobPost/${id}`);
    };
  };
const style = {
  label :{fontSize : '1.1rem',
}

}
const [salary0,setSalary0] = useState<boolean>(false)
const handleFilter = (isChecked : boolean,value : string)=>{
  try {
    let filteredJobs
    if(isChecked) {
          filteredJobs = jobsCopy.filter((job)=>{
        console.log(value,job.salaryScale[0]+job.salaryScale[1],'filter')
        if(Number(value + 10) > Number(job.salaryScale[0]+job.salaryScale[1])) return job
      })}
      else {
        filteredJobs = jobs.filter((job)=>{
        if(Number(value + 10) < Number(job.salaryScale[0]+job.salaryScale[1])) return job
           
        })
      }
      setJobs(filteredJobs)
    
  } catch (error) {
    console.log(error,'error in filtering jobs');
    
  }
}

if (msg != "") {
    return (
      <>
        <ToastContainer />

        <div
          className="Container"
          style={{
            display: "flex",
            marginLeft: "6%",
          }}
        >
          <div
            className="leftSideBar"
            style={{
              flex: "0 0 20%",
              padding: "30px",
              backgroundColor: "#82b182",
              borderRadius: ".5rem",
              margin: "2%",
              marginBottom: "4%",
              fontSize: '50%'
            }}
          >
            <div className="salary">
              <h3>Salary</h3>
              <div>
                <input
                  type="checkbox"
                  value={"0"}
                  checked = {salary0}
              style={{ marginRight: "5%" }}
              onClick={()=>{
                setSalary0(prev=>!prev)
                handleFilter(salary0,'0')}}
                />
                <label style={style.label} htmlFor="filterOption1"> 0-10 Lakhs</label>
              </div>
            <div>
                <input
                  type="checkbox"
                  value={"11"}
                  style={{ marginRight: "5%" }}
                />
                <label  style={style.label}  htmlFor="filterOption1"> 11-20 Lakhs</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={"21"}
                  style={{ marginRight: "5%" }}
                />
                <label style={style.label} htmlFor="filterOption1"> Above 21 Lakhs</label>
              </div>
            </div>
            <div className="salary">
              <h3>Industry</h3>
              <div>
                <input
                  type="checkbox"
                  value={"IT"}
                  style={{ marginRight: "5%" }}
                />
                <label style={style.label} htmlFor="filterOption1"> IT Services and Consulting</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={"banking"}
                  style={{ marginRight: "5%" }}
                />
                <label style={style.label} htmlFor="filterOption1">Banking</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={"e-learning"}
                  style={{ marginRight: "5%" }}
                />
                <label style={style.label} htmlFor="filterOption1">E-learning</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={"marketing"}
                  style={{ marginRight: "5%" }}
                />
                <label style={style.label} htmlFor="filterOption1">Marketing</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={"insurance"}
                  style={{ marginRight: "5%" }}
                />
                <label style={style.label} htmlFor="filterOption1">Insurance</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={"travel"}
                  style={{ marginRight: "5%" }}
                />
                <label style={style.label} htmlFor="filterOption1">Travel & Tourism</label>
              </div>
            </div>
          </div>
          <div style={{ flex: "0 0 70%", padding: "20px" }}>
            {jobs.map((job, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px",
                  marginLeft: "0%",
                  cursor: "pointer",
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
              count={Math.floor(totalPages ? totalPages : 1)}
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

export default UserHome;
