/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { axiosInstance, axiosUserInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SalarySlider from "./SalarySlider";

interface SearchValue {
  industry ?: industryInterface[] | [];
  sort?: string;
  option: string;
  value: string;
  salaryPackage?: number;
}
interface industryInterface {
  industry: string;
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
  // const [jobsCopy, setJobsCopy] = useState<jobData[]>([]);
  const [salarySliderValue, setSalarySliderValue] = useState<number>(10);
  const [industryFilter, setIndustryFilter] = useState<
    industryInterface[] | []
  >([]);
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
      if (searchData) {
        searchData.sort = sortData;
        searchData.salaryPackage = salarySliderValue ? salarySliderValue :10;
        searchData.industry =industryFilter
      }
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
          // setJobsCopy(data.jobData);
          setJobs(data.jobData);
          setMsg("");
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
  }, [pageNumber, searchData, sortData, salarySliderValue,industryFilter]);

  const handleViewJob = (id: string) => {
    return (_event: React.MouseEvent<HTMLDivElement>) => {
      navigate(`/jobPost/${id}`);
    };
  };
  const style = {
    label: { fontSize: "1.1rem" },
  };
  interface FiltersState {
    [x: string]: boolean;
    banking: boolean;
    elearning: boolean;
    marketing: boolean;
    travel: boolean;
    IT: boolean;
    insurance : boolean;
  }
  const [filters, setFilters] = useState<FiltersState>({
    banking: false,
    elearning: false,
    marketing: false,
    travel: false,
    IT: false,
    insurance : false
  });

  useEffect(() => {
    console.log("Filters updated:", filters);
  }, [filters]);

  const handleFilter = (
    prevValue: boolean,
    filterKey: keyof FiltersState,
    value: string
  ) => {
    try {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterKey]: !prevFilters[filterKey],
      }));

      if (!prevValue) {
        setIndustryFilter([...industryFilter, { industry: value }]);
      } else {
        const filteredIndustry = [...industryFilter];
        filteredIndustry.filter((element) => element.industry !== value);
        setIndustryFilter(filteredIndustry);
      }
    } catch (error) {
      console.log(error, "error in filtering jobs");
    }
  };

  const handleSalarySliderValue = (value: number) => {
    setSalarySliderValue(value);
  };

  if (!msg.trim()) {
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
              backgroundColor: "white",
              borderRadius: ".5rem",
              margin: "2%",
              marginBottom: "4%",
              fontSize: "50%",
              height: "auto",
            }}
          >
            <div className="salary">
              <h3>Salary</h3>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginLeft: "80%",
                }}
              >
                {salarySliderValue} LPA
              </p>
              <SalarySlider onChangeValue={handleSalarySliderValue} />

              <h3>Industry</h3>

              <div>
                <input
                  type="checkbox"
                  value={"Information Technology"}
                  style={{ marginRight: "5%" }}
                  checked={filters["Information Technology"]}
                  onClick={() =>
                    handleFilter(filters["Information Technology"], "IT", "Information Technology")
                  }
                />
                <label style={style.label} htmlFor="filterOption1">
                IT Services
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={"e-learning"}
                  style={{ marginRight: "5%" }}
                  checked={filters["elearning"]}
                  onClick={() =>
                    handleFilter(filters["elearning"], "elearning", "elearning")
                  }
                />
                <label style={style.label} htmlFor="filterOption1">
                  E-learning
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={"marketing"}
                  style={{ marginRight: "5%" }}
                  checked={filters["marketing"]}
                  onClick={() =>
                    handleFilter(filters["marketing"], "marketing", "marketing")
                  }
                />
                <label style={style.label} htmlFor="filterOption1">
                  Marketing
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={"insurance"}
                  style={{ marginRight: "5%" }}
                  checked={filters["insurance"]}
                  onClick={() =>
                    handleFilter(filters["insurance"], "insurance", "insurance")
                  }
                />
                <label style={style.label} htmlFor="filterOption1">
                  Insurance
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={"travel"}
                  style={{ marginRight: "5%" }}
                  checked={filters["travel"]}
                  onClick={() =>
                    handleFilter(filters["travel"], "travel", "travel")
                  }
                />
                <label style={style.label} htmlFor="filterOption1">
                  Travel & Tourism
                </label>
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
