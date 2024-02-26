import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./profileManagement.css";
import Select from "react-select";
import upload from "../../Utils/Cloudinary/cloudinary";
import { axiosUserInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfileManagement() {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [experience, setExperience] = useState<string>("0");
  const [skill,setSkills] = useState<string[]>([])

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userEmail");
        console.log(userId, "userId");
        if (!userId) navigate("/login");

        const response = await axiosUserInstance.get(`/getUser/${userId}`);
        console.log(response, "responde");

        if (response?.data?.status === 201) {
          setFname(response?.data?.user?.fname);
          setLname(response?.data?.user?.lname);
          setEmail(response?.data?.user?.email);
          if(response?.data?.user?.resume) setResume(response?.data?.user?.resume)
          if(response?.data?.user?.skills) setSkills(response?.data?.user?.skills)
          if(response?.data?.user?.experience) setExperience(response?.data?.user?.experience)

        }
      } catch (error) {
        console.log("error in fetching user");
       
        
      }
    };
    fetchUser();
  }, []);

  type SkillOption = { value: string; label: string };

  const skills: SkillOption[] | string[] = [
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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: {
    lname: string;
    fname: string;
    course: string;
    education: string;
    educationalQualification: string;
    resume: string;
    skills: { value: string; label: string }[] | string[];
  }) => {
    if(data.fname == '')data.fname = fname
    if(data.lname == '')data.lname = lname
    if(!data.skills.length)data.skills = skill
    
    data.resume = resume;
    if(data.resume == '')data.resume = resume

    data.educationalQualification = `${data.education} ${data.course}`;

    if (typeof skills[0] === "object" && !Array.isArray(skills[0])) {
      data.skills = (data.skills as SkillOption[]).map(
        (option) => option.value
      );
    }
    console.log(data, "profile dataaa");
    try {
      const update = await axiosUserInstance.put("/update", data);
      console.log(update.data.status === 201);
      // setError("User data updated");
      toast.success("Hello, I'm a toast notification!");

    } catch (error) {
      console.log("Error in updating profile", error);
       // if(error.response.status)
       console.log(error.response.data.message,'response----errorrr');
       setError(error.response.data.message)
    }
  };

  return (
    <>
          <ToastContainer />

      <div className="App">
        <p>{error}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="">Manage your Profile</h2>
          <div className="form-control">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              {...register("fname", {
                required: false,
                pattern: /^[A-Za-z]+$/,
              })}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setFname(e.target.value);
                setError("");
              }}
              value={fname}
            />
            {errors.fname && errors.fname.type === "required" && (
              <p className="errorMsg">First Name is required.</p>
            )}
            {errors.fname && errors.fname.type === "pattern" && (
              <p className="errorMsg">First Name is not valid.</p>
            )}
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              {...register("lname", {
                required: false,
                pattern: /^[A-Za-z]+$/,
              })}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setLname(e.target.value);
                setError("");
              }}
              value={lname}
            />
            {errors.lname && errors.lname.type === "required" && (
              <p className="errorMsg">Last Name is required.</p>
            )}
            {errors.lname && errors.lname.type === "pattern" && (
              <p className="errorMsg">Last Name is not valid.</p>
            )}

            <label>Email</label>
            <input
              type="text"
              {...register("email", {
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setEmail(e.target.value)}
              value={email}
              disabled
            />
            {errors.email && errors.email.type === "required" && (
              <p className="errorMsg">Email is required.</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="errorMsg">Email is not valid.</p>
            )}

            <label>Password</label>
            <input
              type="password"
              // name="password"
              {...register("password", {
                // required: true,
                validate: {
                  // checkLength: (value) => value.length >= 6,
                  // matchPattern: (value) =>
                  //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                  //     value
                  //   ),
                },
              })}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setPassword(event.target.value)}
              value={"●●●●●●"}
              disabled
            />

            <label>Select your skills</label>
            <Controller
              name="skills"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} isMulti options={skills} />
              )}
            />
            {errors.skills && (
              <p className="errorMsg">This is a required field.</p>
            )}

            <div className="" style={{ display: "flex" }}>
              <div className="form-control">
                <label htmlFor="education"></label>
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
                        What you have studied
                      </option>
                      <option value="Diploma">Matriculation</option>
                      <option value="BE">Higher Secondary Education</option>
                      <option value="">Any</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Diploma">Matriculation</option>
                      <option value="BE">Higher Secondary Education</option>
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
                <label htmlFor="course"></label>
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
                        Select course
                      </option>
                      <option value="Any graduation">State Board</option>
                      <option value="Any graduation">CBSE</option>
                      <option value="Any graduation">ICSE</option>
                      <option value="Any graduation">Any graduation</option>
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
                      <option value="Civil Engineering">
                        Civil Engineering
                      </option>
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
                      <option value="Ocean Engineering">
                        Ocean Engineering
                      </option>
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

            <label>Enter your years of Experience</label>
            <input
              type="text"
              {...register("years", {
                required: true,
                pattern: /^(0|[1-9]\d?)$|^30$/,
              })}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setExperience(e.target.value)}
              value={experience}
            />
            {errors.years && errors.years.type === "required" && (
              <p className="errorMsg">Experience is required.</p>
            )}
            {errors.years && errors.years.type === "pattern" && (
              <p className="errorMsg">
                Experience should be a non-negative number less than or equal to
                30.
              </p>
            )}
            <div>
              <div className="form-control">
                <label htmlFor="resume_upload">Upload Resume (PDF)</label>
                <input
                  type="file"
                  id="resume_upload"
                  accept=".pdf"
                  {...register("resume", {
                    required: resume ? false : true ,
                  })}
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    setError("");
                    const files = e.target.files;
                    if (files) {
                      const pdf = files[0];
                      const resumeUrl = await upload(pdf, "resume");
                      if (resumeUrl) setResume(resumeUrl);
                    }
                  }}
                />
                {errors.resume && errors.resume.type === "required" && (
                  <p className="errorMsg">Resume is required.</p>
                )}
              </div>
            </div>
          {/* </div>
          <div className="form-control"> */}
            <label></label>
            <button type="submit" style={{backgroundColor:'black'}}>Update</button>
          </div>
          .
        </form>
      </div>
    </>
  );
}
