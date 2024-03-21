import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { axiosHRInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { CiLocationOn } from "react-icons/ci";
import { IoBagRemoveOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

interface ManageJobPostProps {
  jobPostData: JobPostData[];
}
interface JobPostData {
  _id: string;
  jobRole: string;
  description: string;
  qualification: string[];
  locations: string[];
  company: string;
  experience: string;
  salaryScale: string;
  educationalQualification ?: string;
  industry: string;
  jobType: string;
  education: string;
  course: string;
}

const ManageJobPost: React.FC<ManageJobPostProps> = ({ jobPostData }) => {
  const [error, setError] = useState<string>("");
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [jobRole, setJobRole] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [salaryScale, setSalaryScale] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [location, setLocations] = useState<string[]>([]);
  const [educationalQualification, setEducationalQualification] = useState<string>("");

  useEffect(() => {
    const {
        description,
        jobRole,
        experience,
        education,
        jobType,
        course,
        salaryScale,
        industry,
        company,
        qualification,
        locations,
        educationalQualification
    } = jobPostData[0];

    setDescription(description);
    setJobRole(jobRole);
    setExperience(experience);
    setEducation(education);
    setJobType(jobType);
    setCourse(course);
    setSalaryScale(salaryScale);
    setIndustry(industry);
    setCompany(company);
    setSkills(qualification);
    setLocations(locations);

    if (educationalQualification) {
        setEducationalQualification(educationalQualification);
    }
}, [jobPostData]);

 

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  type QualificationOption = { value: string; label: string };
  type LocationsInterface = { value: string; label: string };

  const qualification: QualificationOption[] | string[] = [
    { value: "Javascript", label: "Javascript" },
    { value: "NodeJS", label: "NodeJS" },
    { value: "ReactJS", label: "ReactJS" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "ExpressJS", label: "ExpressJS" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Angular", label: "Angular" },
  ];
  const locations: LocationsInterface[] = [
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Chennai", label: "Chennai" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Pune", label: "Pune" },
    { value: "Ahmedabad", label: "Ahmedabad" },
    { value: "Jaipur", label: "Jaipur" },
    { value: "Kozhikode", label: "Kozhikode" },
    { value: "Kochi", label: "Kochi" },
  ];

  const navigate = useNavigate();

  interface formData {
    jobType ?: string;
    jobId ?: string;
    createdBy ?: string | null;
    jobRole ?: string;
    description ?: string;
    qualification ?: QualificationOption[] | string[];
    locations ?: LocationsInterface[] | string[];
    company ?: string;
    experience ?: string;
    salaryScale ?: string;
    education ?: string;
    course ?: string;
    educationalQualification?: string;
    industry ?: string;
    createdAt ?: Date | number;
  }

  const onSubmit = async (data: formData): Promise<void> => {
    console.log(data, "data");
    window.scrollTo(0, 0);

    try {
      if (data) {
        data.jobId = jobPostData[0]._id;
        data.educationalQualification = `${data.education} ${data.course}`;
      }

   
   
      if (data.description === '') data.description = description
      if (data.jobType === '') data.jobType = jobType
      if (data.qualification && !data.qualification.length) data.qualification = skills
      if (data.locations && !data.locations.length) data.locations = location
      if (data.experience === '') data.experience = experience
      if (data.educationalQualification === '') data.educationalQualification = educationalQualification
      if (data.industry === '') data.industry = industry
      if (data.salaryScale === '') data.salaryScale = salaryScale
      if (data.company === '') data.company = company
console.log(data,'data ----2');

        const response = await axiosHRInstance.post('/hr/updateJob', data);
       console.log(response,'res------');
       toast.success("Job updated succesfully");
    } catch (error) {
      console.log(error, "error in updating job data-------");
      toast.success("Job updating failed,try again");

    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      console.log(id, "id-----");

      const deleteJob = await axiosHRInstance.delete(`/hr/deleteJob/${id}`);
      console.log(deleteJob, "res --- delete job");
      if (deleteJob.data.status == 201)
        toast.success("Job deleted succesfully");
      setTimeout(() => {
        navigate("/hr");
      }, 500);
    } catch (error) {
      console.log(error, "error");
      toast.success("Job deletion  failed,try again");
    }
  };

  if (isDisabled)
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          width: "50%",
          marginTop: "",
          marginBottom: "10%",
          marginLeft: "25%",
          zIndex: "1000",
          // position: "fixed",
        }}
      >
              <ToastContainer />

        <h2
          style={{
            fontSize: "30px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Edit Your Job
        </h2>
        <p
          style={{
            color: "red",
            fontSize: "15px",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          {error}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="jobRole">Job Role</label>
            <input
              type="text"
              id="jobRole"
              {...register("jobRole", {
                required: false,
                pattern: /^[A-Za-z\s]+$/,
              })}
              onChange={() => {
                setError("");
              }}
              disabled
              value={jobRole}
            />
            {errors.jobRole && errors.jobRole.type === "required" && (
              <span>Job Role is required</span>
            )}
            {errors.jobRole && errors.jobRole.type === "pattern" && (
              <span>Job Role is not valid</span>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              {...register("description", {
                required: false,
                // pattern: /^[A-Za-z0-9\s\n]+$/,
              })}
              onChange={(e) => {
                setDescription(e.target.value);
                setError("");
              }}
              value={description}
            />
            {errors.description && errors.description.type === "required" && (
              <span>Description is required</span>
            )}
            {/* {errors.description && errors.description.type === "pattern" && (
    <span>Description must contain only letters and numbers</span>
  )} */}
          </div>
          <div className="form-control">
            <label>Skills required</label>
            <Controller
              name="qualification"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Select {...field} isMulti options={qualification} />
              )}
            />
            {errors.qualification && (
              <p className="errorMsg">This is a required field.</p>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="jobType">Job Type:</label>
            <Controller
              name="jobType"
              control={control}
              defaultValue="Office"
              rules={{ required: false }}
              render={({ field }) => (
                <select
                  style={{
                    width: "200px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    color: "#333",
                    fontSize: "16px",
                  }}
                  {...field}
                >
                  <option value="" disabled>
                    {jobType || "Select job type"}
                  </option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="office">Office</option>
                </select>
              )}
            />
            {errors.jobType && (
              <p className="errorMsg">This is a required field.</p>
            )}
          </div>

          <div className="form-control">
            <label>Location</label>
            <Controller
              name="locations"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Select {...field} isMulti options={locations} />
              )}
            />
            {errors.locations && (
              <p className="errorMsg">This is a required field.</p>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="jobType">Experience:</label>
            <Controller
              name="experience"
              control={control}
              defaultValue="0"
              rules={{ required: false }}
              render={({ field }) => (
                <select
                  style={{
                    width: "200px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    color: "#333",
                    fontSize: "16px",
                  }}
                  {...field}
                  value={""}
                >
                  <option value="" disabled>
                    Select years of experience
                  </option>
                  <option value={experience || 0}> {experience || 0} Yr</option>
                  <option value="1">1 Yr</option>
                  <option value="2">2 Yrs</option>
                  <option value="3">3 Yrs</option>
                  <option value="4">4 Yrs</option>
                  <option value="5">5 Yrs</option>
                  <option value="6">6 Yr</option>
                  <option value="10">10 Yrs</option>
                  <option value="15">15 Yrs</option>
                  <option value="20">20 Yrs</option>
                  <option value="0-1">0-1 Yr</option>
                  <option value="0-2">0-2 Yr</option>
                  <option value="0-3">0-3 Yr</option>
                  <option value="1-3">1-3 Yr</option>
                  <option value="3-5">3-5 Yr</option>
                  <option value="5-7">5-7 Yr</option>
                  <option value="7-10">7-10 Yr</option>
                </select>
              )}
            />
            {errors.experience && (
              <p className="errorMsg">This is a required field.</p>
            )}
          </div>

          <div className="" style={{ display: "flex" }}>
            <div className="form-control">
              <label htmlFor="education">Education:</label>
              <Controller
                name="education"
                control={control}
                defaultValue=""
                rules={{ required: false }}
                render={({ field }) => (
                  <select
                    style={{
                      width: "200px",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "16px",
                    }}
                    {...field}
                  >
                    <option value="" disabled>
                      Select education level
                    </option>
                    <option value={education || "Any"}>
                      {education || "Any"}
                    </option>
                    <option value="Any">Any</option>
                    <option value="Any">Any</option>

                    <option value="Diploma">Diploma</option>

                    <option value="BE">BE</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="BSc">BSc</option>
                    <option value="BA">BA</option>
                    <option value="BCA">BCA</option>
                    <option value="BCom">BCom</option>
                    <option value="BBA">BBA</option>
                    <option value="MBBS">MBBS</option>
                    <option value="B.Pharm">B.Pharm</option>
                    <option value="LLB">LLB</option>
                    <option value="B.Arch">B.Arch</option>
                    <option value="B.Ed">B.Ed</option>
                    <option value="BDS">BDS</option>
                    <option value="BAMS">BAMS</option>
                    <option value="BHMS">BHMS</option>
                    <option value="B.V.Sc">B.V.Sc</option>
                    <option value="BPT">BPT</option>
                    <option value="BUMS">BUMS</option>
                    <option value="MCA">MCA</option>
                    <option value="MCom">MCom</option>
                    <option value="MBA">MBA</option>
                    <option value="MD">MD</option>
                    <option value="MS">MS</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MSc">MSc</option>
                    <option value="MA">MA</option>
                    <option value="MPH">MPH</option>
                    <option value="M.Arch">M.Arch</option>
                    <option value="M.Ed">M.Ed</option>
                    <option value="MDS">MDS</option>
                    <option value="M.Pharm">M.Pharm</option>
                    <option value="MDS">MDS</option>
                    <option value="MAMS">MAMS</option>
                    <option value="MHMS">MHMS</option>
                    <option value="M.V.Sc">M.V.Sc</option>
                    <option value="MPT">MPT</option>
                    <option value="MUMS">MUMS</option>
                  </select>
                )}
              />
              {errors.education && (
                <p className="errorMsg">This is a required field.</p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="course">Course:</label>
              <Controller
                name="course"
                control={control}
                defaultValue=""
                rules={{ required: false }}
                render={({ field }) => (
                  <select
                    style={{
                      width: "200px",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "16px",
                    }}
                    {...field}
                  >
                    <option value="" disabled>
                      {course || "Select course"}
                    </option>
                    <option value="Any graduation">Any graduation</option>
                    <option value="Any post graduation">
                      Any post graduation
                    </option>

                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                    <option value="Computer Science Engineering">
                      Computer Science Engineering
                    </option>
                    <option value="Electrical Engineering">
                      Electrical Engineering
                    </option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Electronics and Communication Engineering">
                      Electronics and Communication Engineering
                    </option>
                    <option value="Aeronautical Engineering">
                      Aeronautical Engineering
                    </option>
                    <option value="Chemical Engineering">
                      Chemical Engineering
                    </option>
                    <option value="Automobile Engineering">
                      Automobile Engineering
                    </option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Agricultural Engineering">
                      Agricultural Engineering
                    </option>
                    <option value="Bioinformatics">Bioinformatics</option>
                    <option value="Mechatronics Engineering">
                      Mechatronics Engineering
                    </option>
                    <option value="Robotics Engineering">
                      Robotics Engineering
                    </option>
                    <option value="Environmental Engineering">
                      Environmental Engineering
                    </option>
                    <option value="Petroleum Engineering">
                      Petroleum Engineering
                    </option>
                    <option value="Nuclear Engineering">
                      Nuclear Engineering
                    </option>
                    <option value="Textile Engineering">
                      Textile Engineering
                    </option>
                    <option value="Ocean Engineering">Ocean Engineering</option>
                    <option value="Materials Science and Engineering">
                      Materials Science and Engineering
                    </option>
                    <option value="Industrial Engineering">
                      Industrial Engineering
                    </option>
                    <option value="Mining Engineering">
                      Mining Engineering
                    </option>
                    <option value="Metallurgical Engineering">
                      Metallurgical Engineering
                    </option>
                    <option value="Zoology">Zoology</option>
                    <option value="Botany">Botany</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Statistics">Statistics</option>
                    <option value="Geology">Geology</option>
                    <option value="Microbiology">Microbiology</option>
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Environmental Science">
                      Environmental Science
                    </option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Nursing">Nursing</option>
                    <option value="Physiotherapy">Physiotherapy</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Veterinary Science">
                      Veterinary Science
                    </option>
                  </select>
                )}
              />
              {errors.course && (
                <p className="errorMsg">This is a required field.</p>
              )}
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="industry">Industry Type:</label>
            <Controller
              name="industry"
              control={control}
              defaultValue=""
              rules={{ required: false }}
              render={({ field }) => (
                <select
                  style={{
                    width: "200px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    color: "#333",
                    fontSize: "16px",
                  }}
                  {...field}
                >
                  <option value="" disabled>
                    {industry || "Select industry type"}
                  </option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Education">Education</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Construction">Construction</option>
                  <option value="Telecommunications">Telecommunications</option>
                </select>
              )}
            />
            {errors.industry && (
              <p className="errorMsg">This is a required field.</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="salaryScale">Salary Scale:</label>
            <Controller
              name="salaryScale"
              control={control}
              defaultValue=""
              rules={{ required: false }}
              render={({ field }) => (
                <select
                  style={{
                    width: "200px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    color: "#333",
                    fontSize: "16px",
                  }}
                  {...field}
                >
                  <option value="" disabled>
                    {salaryScale || "Select salary scale"}
                  </option>
                  <option value="Not Disclosed">Not Disclosed</option>
                  <option value="1-2 LPA">1-2 LPA</option>
                  <option value="2-3 LPA">2-3 LPA</option>
                  <option value="3-4 LPA">3-4 LPA</option>
                  <option value="4-5 LPA">4-5 LPA</option>
                  <option value="5-6 LPA">5-6 LPA</option>
                  <option value="6-7 LPA">6-7 LPA</option>
                  <option value="7-8 LPA">7-8 LPA</option>
                  <option value="8-9 LPA">8-9 LPA</option>
                  <option value="9-10 LPA">9-10 LPA</option>
                  <option value="10-12 LPA">10-12 LPA</option>
                  <option value="12-15 LPA">12-15 LPA</option>
                  <option value="15-20 LPA">15-20 LPA</option>
                  <option value="20+ LPA">20+ LPA</option>
                </select>
              )}
            />
            {errors.salaryScale && (
              <p className="errorMsg">This is a required field.</p>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              {...register("company", {
                required: false,
                pattern: /^[a-zA-Z0-9\s]+$/,
              })}
              onChange={(e) => {
                setCompany(e.target.value);
                setError("");
              }}
              value={company}
            />
            {errors.company && <span>Company is required</span>}
            {errors.company && errors.company.type === "pattern" && (
              <span>Company must contain only letters and numbers</span>
            )}
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    );
  else
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
            zIndex: "1000",
            position: "fixed",
          }}
        >
          {jobPostData && (
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
              <ToastContainer />

              <h2 style={{ marginBottom: "10px", marginTop: "4vh" }}>
                {jobPostData[0].jobRole}
              </h2>
              <span style={{ fontSize: "17px", marginBottom: "5px" }}>
                {jobPostData[0].company}
              </span>
              <div style={{ fontSize: "17px", marginBottom: "5px" }}>
                <span>
                  <IoBagRemoveOutline />
                </span>{" "}
                {jobPostData[0].experience} yrs
              </div>
              <div style={{ fontSize: "17px", marginBottom: "5px" }}>
                <span>
                  <CiLocationOn />
                </span>{" "}
                {jobPostData[0].locations.map(
                  (location: string) => `${location} ,`
                )}
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
                  {jobPostData[0].qualification.map(
                    (skill: string) => `${skill} ,`
                  )}
                </span>

                <div style={{ height: "1vh" }}></div>

                <h5>Job Desciption</h5>
                <div style={{ fontSize: "17px", marginBottom: "5px" }}>
                  {jobPostData[0].description}
                </div>
                <div style={{ height: "3vh" }}></div>
                <h1></h1>
                <span style={{ fontSize: "17px", marginBottom: "5px" }}>
                  Education: {jobPostData[0].educationalQualification}
                </span>
                <div style={{ fontSize: "17px", marginBottom: "5px" }}>
                  Industry Type: {jobPostData[0].industry}
                </div>
                <button
                  style={{ margin: ".5%" }}
                  onClick={() => handleDeleteJob(jobPostData[0]._id)}
                >
                  Delete Job
                </button>
                <button
                  style={{ margin: ".5%" }}
                  onClick={() => setDisabled((prev) => !prev)}
                >
                  Edit Job
                </button>

                <div
                  style={{
                    marginLeft: "30%",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </>
    );
};

export default ManageJobPost;
