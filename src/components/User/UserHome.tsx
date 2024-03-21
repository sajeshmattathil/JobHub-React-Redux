/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { axiosInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";

interface SearchValue {
  option : string;
  value : string;
}
const UserHome  = ({searchData ,sortData } :{ searchData :SearchValue | null, sortData : string} ) => {
  console.log(searchData,'location');
  console.log(sortData || 'Date','sort');
  
  const navigate = useNavigate();
  const [pageNumber, setPage] = useState<number>(1);
  const [totalPages, setTotalpages] = useState<number>(1);
  const [jobs, setJobs] = useState<jobData[]>([]);
  const [msg, setMsg] = useState<string>("");

  interface jobData{
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await axiosInstance.post(
          `/getJobs?jobsPerPage=5&page=${pageNumber}`,searchData
        );
        if (fetchedData.data.status === 201) {
          const data = fetchedData.data;
          const pages = Math.ceil(data.totalJobs / 5);
          setTotalpages(pages);
          setJobs(data.jobData);
          setMsg("jobs found");
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
    return () => {
      setJobs([]);
      setMsg("No jobs");
  };
  }, [pageNumber,searchData]);
  
  useEffect(()=>{
   if(sortData == 'old-new') {
    const jobsSorted = jobs.reverse()
    setJobs(jobsSorted)
  }else {
    const jobsSorted = jobs
    setJobs(jobsSorted)
  }
 
  },[jobs, sortData])

const handleViewJob = (id : string)=>{
  return (_event: React.MouseEvent<HTMLDivElement>) => {
  navigate(`/jobPost/${id}`)

};
}

  if (msg != "") {
    return (
      <>
       <div className="Container"  style={{
        display:'flex',
      marginLeft : '6%'
        }}>
        {/* <div className="leftSideBar"
        style={ {
          flex: "0 0 20%",
          padding: "30px",
          backgroundColor: "#82b182",
          borderRadius : '.5rem',
          margin : '2%',
          marginBottom :'4%',
        }}>
          <h3>Salary</h3>
        <div>
          <input type="checkbox" value={'3LPA'} style={{marginRight:'5%'}} />
          <label htmlFor="filterOption1"> 0-3 Lakhs</label>
        </div>
        <div>
          <input type="checkbox" value={'3-6'} style={{marginRight:'5%'}} />
          <label htmlFor="filterOption1"> 3-6 Lakhs</label>
        </div>
        <div>
          <input type="checkbox" value={'6-10'} style={{marginRight:'5%'}}/>
          <label htmlFor="filterOption1"> 6-10 Lakhs</label>
        </div>
          <div>
          <input type="checkbox" value={'10-15'} style={{marginRight:'5%'}} />
          <label htmlFor="filterOption1"> 10-15 Lakhs</label>
        </div> <div>
          <input type="checkbox" value={'15-25'} style={{marginRight:'5%'}}/>
          <label htmlFor="filterOption1"> 15-25 Lakhs</label>
        </div> <div>
          <input type="checkbox" value={'25-50'} style={{marginRight:'5%'}} />
          <label htmlFor="filterOption1"> 25-50 Lakhs</label>
        </div><div>
          <input type="checkbox" value={'50-75'} style={{marginRight:'5%'}}/>
          <label htmlFor="filterOption1"> 50-75 Lakhs</label>
        </div> <div>
          <input type="checkbox" value={'75-100'} style={{marginRight:'5%'}}/>
          <label htmlFor="filterOption1"> 75-100 Lakhs</label>
        </div> 
        </div> */}
        <div
          style={{ flex: "0 0 90%", padding: "20px" }}
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
                marginLeft:'10%',
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

export default UserHome;
