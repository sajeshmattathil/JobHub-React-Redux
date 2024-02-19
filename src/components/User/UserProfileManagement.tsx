import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./profileManagement.css";
import Select from "react-select";
import upload from "../../Utils/Cloudinary/cloudinary";
import { axiosUserInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";

export default function ProfileManagement() {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password,setPassword] =useState<string>('')
  const [resume, setResume] = useState<string>("");
  const [experience, setExperience] = useState<string>("0");

  const [error, setError] = useState<string>("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userEmail");
        console.log(userId,'userId');
        if(!userId) navigate('/login')
        
        const response = await axiosUserInstance.get(`/getUser/${userId}`);
        console.log(response,'responde');
        
        if (response?.data?.status === 201) {
          setFname(response?.data?.user?.fname);
          setLname(response?.data?.user?.lname);
          setEmail(response?.data?.user?.email);
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

  const onSubmit = async (data: { resume: string; skills: { value: string; label: string; }[] | string[]; }) => {
    data.resume = resume;
    if (typeof skills[0] === "object" && !Array.isArray(skills[0])) {
      data.skills = (data.skills as SkillOption[]).map(
        (option) => option.value
      );
    }
    console.log(data,'profile dataaa');
    try {
      const update = await axiosUserInstance.post("/update", data);
      console.log(update.data.status === 201); setError("User data updated")
      
    } catch (error) {
      console.log("Error in updating profile", error);
    }
  };

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
          
          </div>
        </nav>
  
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
            ) =>{ setFname(e.target.value)
            setError('')
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
            ) => {setLname(e.target.value)
              setError('')

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
            value={'●●●●●●' }
            disabled
          />
          {/* {errors.password?.type === "required" && (
            <p className="errorMsg">Password is required.</p>
          )} */}
          {/* {errors.password?.type === "checkLength" && (
            <p className="errorMsg">
              Password should be at-least 6 characters.
            </p>
          )}
          {errors.password?.type === "matchPattern" && (
            <p className="errorMsg">
              Password should contain at least one uppercase letter, lowercase
              letter, digit, and special symbol.
            </p>
          )} */}
        </div>
        {/* <div className="form-control">
          <label htmlFor="">Work Experience</label>
          {workExperiences.map((workExperience, index) => (
            <div className="work-entry" key={index}>
           

              <label htmlFor={`jobRole${index}`}>Job Role:</label>
              <input
                type="text"
                id={`jobRole${index}`}
                name={`jobRole`}
                value={workExperience.jobRole}
                onChange={(e) =>
                  updateWorkExperience(index, "jobRole", e.target.value)
                }
                required
              />
              <label htmlFor={`jobRole${index}`}>Years:</label>

                <input
                type="text"
                id={`years${index}`}
                name={`years`}
                value={workExperience.years}
                onChange={(e) =>
                  updateWorkExperience(index, "years", e.target.value)
                }
                required
              />

             {index>1 && <button type="button" onClick={() => removeWorkExperience(index)}>
                Remove
              </button>}
            </div>
          ))}
        </div> */}
        <div className="form-control">
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
            Experience should be a non-negative number less than or equal to 30.
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
                required: true,
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
        <div className="form-control">
          <label></label>
          <button type="submit">Update</button>
        </div>
        .
      </form>
    </div>
    </>
  );
}
