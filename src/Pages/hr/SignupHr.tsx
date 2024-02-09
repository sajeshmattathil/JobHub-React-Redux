import React, { useState } from "react";
import axiosInstance from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function SignupHr() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: unknown) => {
    console.log(data);
    try {
      if (error !== "") return;

      const response = await axiosInstance.post("/hr/signup_submit", data);

      if (response?.data?.status === 201) {
        navigate("/hr/login");
      } else if (response?.data?.status === 400)
        setError(response?.data?.message);
    } catch (err) {
      console.log("Error happenend in sigunp submit", err);
    }
  };

  const navigate = useNavigate();

  const handleExistingHr = () => {
    navigate("/hr/login");
  };

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
}

export default SignupHr;
