import React, { useEffect, useState } from "react";
import "./HRProfileManagement.css";
import upload from "../../Utils/Cloudinary/cloudinary";
import { axiosHRInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function HRProfileManagement() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [experience, setExperience] = useState<string>("0");
  const [company, setCompany] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [EmployeesNumber, setEmployeesNumber] = useState<number | string>(0);

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const HRId = localStorage.getItem("HREmail");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(HRId, "hrId");
        if (!HRId) navigate("/hr/login");

        const response = await axiosHRInstance.get(`/hr/getHR/${HRId}`);
        console.log(response, "response -----------");

        if (response?.data?.status === 201) {
          setName(response?.data?.HR?.name);
          setEmail(response?.data?.HR?.email);
          setCompany(response?.data?.HR?.company)
          setWebsite(response?.data?.HR?.website)
          setExperience(response?.data?.HR?.experience)
          setEmployeesNumber(response?.data?.HR?.EmployeesNumber)


        }
      } catch (error) {
        console.log("error in fetching user",error);
      }
    };
    fetchUser();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

interface HRProfileData {
  name : string,
  company : string;
  website : string;
resume : string;
employeesNumber : number |string;
experience : number;
email : string;
}


  const onSubmit = async (data: HRProfileData) => {
    data.resume = resume;
    data.name = name;
    data.company = company;
    data.website = website
   data.employeesNumber = EmployeesNumber
data.email = email
    console.log(data, "profile dataaa");
    try {
      const update = await axiosHRInstance.post(`/hr/update/${HRId}`, data);
      console.log(update.data.status === 201);
      setError("User data updated");
    } catch (error) {
      console.log("Error in updating profile", error);
    }
  };

  return (
    <>
      

      <div className="App">
        <p>{error}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="">Manage your Profile</h2>
          <div className="form-control">
            <label htmlFor="">Name</label>
            <input
              type="text"
              {...register("name", {
                required: false,
                pattern: /^[A-Za-z]+$/,
              })}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setName(e.target.value);
                setError("");
              }}
              value={name}
            />
            {errors.name && errors.name.type === "required" && (
              <p className="errorMsg">Name is required.</p>
            )}
            {errors.name && errors.name.type === "pattern" && (
              <p className="errorMsg">Name is not valid.</p>
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
          
        
          <label htmlFor="">Company</label>
          <input
            type="text"
            {...register("company", {
              required: false,
              pattern: /^[A-Za-z]+$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setCompany(e.target.value);
              setError("");
            }}
            value={company}
          />
          {errors.company && errors.company.type === "required" && (
            <p className="errorMsg">Company is required.</p>
          )}
          {errors.company && errors.company.type === "pattern" && (
            <p className="errorMsg">Company is not valid.</p>
          )}
          <label htmlFor="">Company Website</label>
          <input
            type="text"
            {...register("website", {
              required: false,
              pattern: /^[A-Za-z]+$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setWebsite(e.target.value);
              setError("");
            }}
            value={website}
          />
          {errors.website && errors.website.type === "required" && (
            <p className="errorMsg">Website  is required.</p>
          )}
          {errors.website && errors.website.type === "pattern" && (
            <p className="errorMsg">Website not valid.</p>
          )}
          <label htmlFor="">No. of Employees</label>
          <input
            type="text"
            {...register("employeesNumber", {
              required: false,
              pattern: /^(0|[1-9]\d?)$|^200000$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setEmployeesNumber(e.target.value);
              setError("");
            }}
            value={EmployeesNumber}
          />
          {errors.employeesNumber &&
            errors.employeesNumber.type === "required" && (
              <p className="errorMsg">Employees number is required.</p>
            )}
          {errors.employeesNumber &&
            errors.employeesNumber.type === "pattern" && (
              <p className="errorMsg">Employees number is not valid.</p>
            )}
          
          <label>Enter your years of Experience</label>
          <input
            type="text"
            {...register("experience", {
              required: true,
              pattern: /^(0|[1-9]\d?)$|^50$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setExperience(e.target.value)}
            value={experience}
          />
          {errors.experience && errors.experience.type === "required" && (
            <p className="errorMsg">Experience is required.</p>
          )}
          {errors.experience && errors.experience.type === "pattern" && (
            <p className="errorMsg">
              Experience should be a non-negative number less than or equal to
              50.
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
                  required: false,
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
          <div className="">
            <label></label>
            <button type="submit">Update</button>
          </div>
          . </div>
        </form>
      </div>
    </>
  );
}
