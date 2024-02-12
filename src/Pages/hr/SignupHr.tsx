import React, { useState } from "react";
import axiosInstance from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import upload from "../../Utils/Cloudinary/cloudinary";
import generateOtp from "../../Utils/OtpGenerator/otpGenerator";

function SignupHr() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resume, setResume] = useState<string>('');
  const [company, setCompany] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otp, setOtp] = useState<string>("");

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  interface dataInterface{
    name : string,
    email : string,
    password : string,
    resume : string | undefined,
    company : string,
    website : string
    otp : string | undefined,
    createdAt : number
  }


  const onSubmit = async (data: dataInterface) => {
    try {
      if (error !== "") return;
      if(resume === '') setError('Resume not selected,try again')
      data.resume = resume
     console.log(data);

     const OneTimePassword = generateOtp();
     const createdAt = Date.now();
     data.otp = OneTimePassword
     data.createdAt = createdAt
     
      const response = await axiosInstance.post(
        "/hr/signup_submit",
       data 
      );
      console.log(response.data,'djhjdddddddddd');

      if (response?.data?.status === 201) {
        setError("");
        if (OneTimePassword){
          setOtp(OneTimePassword);
          console.log(OneTimePassword,'OneTimePassword')
        } 
      } 
       if(response?.data?.status === 400){
        setError(response?.data?.message);
      }
      if(response?.data?.status === 409){
        setError(response?.data?.message);
      }

    } catch (err) {
      console.log("Error happenend in sigunp submit", err);
      setError('Internal Server Down')
    }
  };
  const handleOtp = async () => {
    try {
      if (enteredOtp.trim().length === 6) {
        const response = await axiosInstance.post("/hr/verifyOtp", {
          otp: enteredOtp,
          userId: email,
        });
        console.log(response, "response");

        if (response.data.status === 201){
          setError("");
          navigate("/hr/login");
        } 
        if (response.data.status === 401) setError(response.data.message);
        if (response.data.status === 500) setError(response.data.message);
        if (response.data.status === 404) setError(response.data.message);

        setOtp("");
      } else {
        setError("Enter correct OTP");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong try again");
      setOtp("");
    }
  };

  const navigate = useNavigate();

  const handleExistingHr = () => {
    navigate("/hr/login");
  };


  if (otp.trim() === "") {
    return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <form
        className="items-center justify-center"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <p style={{ fontFamily: "", fontSize: "30px", marginLeft: "25%" }}>
          Recruiter Sign Up
        </p>
        <p
          style={{
            color: "red",
            fontSize: "15px",
            alignItems: "center",
            justifyItems: "center",
            marginLeft: "27%",
          }}
        >
          {error}
        </p>

        <div className="form-control">
          <label htmlFor="resume_upload">Name</label>
          <input
            type="text"
            {...register("name", {
              required: true,
              pattern: /^[A-Za-z]+$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setName(e.target.value)}
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
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setEmail(e.target.value)}
            value={email}
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
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value
                  ),
              },
            })}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setPassword(event.target.value)}
            value={password}
          />
          {errors.password?.type === "required" && (
            <p className="errorMsg">Password is required.</p>
          )}
          {errors.password?.type === "checkLength" && (
            <p className="errorMsg">
              Password should be at-least 6 characters.
            </p>
          )}
          {errors.password?.type === "matchPattern" && (
            <p className="errorMsg">
              Password should contain at least one uppercase letter, lowercase
              letter, digit, and special symbol.
            </p>
          )}
          <label htmlFor="resume_upload">Upload Resume (PDF)</label>
          <input
            type="file"
            id="resume_upload"
            accept=".pdf"
            {...register("resume", {
              required: true,
            })}
            onChange={ async (e: React.ChangeEvent<HTMLInputElement>) => {
              setError('')
              const files = e.target.files;
            if(files){
              const pdf = files[0];
              const resumeUrl = await upload(pdf, "resume");
            if(resumeUrl) setResume( resumeUrl )
            }  
             
            }}
          />
          {errors.resume && errors.resume.type === "required" && (
            <p className="errorMsg">Resume is required.</p>
          )}
          <label htmlFor="resume_upload">Company Name</label>
          <input
            type="text"
            {...register("company", {
              required: true,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setCompany(e.target.value)}
            value={company}
          />
          {errors.company && errors.company.type === "required" && (
            <p className="errorMsg">Company Name is required.</p>
          )}

          <label htmlFor="resume_upload">
            Website of currently working company
          </label>
          <input
            type="text"
            {...register("website", {
              required: true,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setWebsite(e.target.value)}
            value={website}
          />
          {errors.website && errors.website.type === "required" && (
            <p className="errorMsg">Website is required.</p>
          )}

          <label></label>
          <button type="submit">Sign In</button>
        </div>
        <p style={{ cursor: "pointer" }} onClick={handleExistingHr}>
          Already have a account?
        </p>
      </form>
    </div>
  );
}else{
  return (
    <div>
      <div
        className="otp"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <div
          className="otpInner items-center justify-center "
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <p style={{ fontWeight: "bold" }}>Enter your OTP</p>
          <p
            style={{
              color: "red",
              fontSize: "15px",
              alignItems: "center",
              justifyItems: "center",
              marginLeft: "27%",
            }}
          >
            {error}
          </p>

          <span>
            <input
              type="text"
              style={{
                border: "solid black 2px",
                borderRadius: ".5rem",
                margin: "1rem",
              }}
              onChange={(e) => {
                setEnteredOtp(e.target.value);
                setError("");
              }}
            />

            <button
              style={{
                borderRadius: ".5rem",
                color: "white",
                backgroundColor: "black",
                border: "none",
              }}
              onClick={handleOtp}
            >
              Submit
            </button>
          </span>
          <p>Resend OTP</p>
        </div>
      </div>
    </div>
  );
}
}

export default SignupHr;
