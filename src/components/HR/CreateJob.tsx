import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { axiosHRInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const CreateJobForm = () => {
  const [error, setError] = useState<string>("");

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
  const HREmail = localStorage.getItem("HREmail");

  interface formData {
    createdBy: string | null;
    jobRole: string;
    description: string;
    qualification: QualificationOption[] | string[];
    locations: LocationsInterface[] | string[];
    salaryFrom: string;
    salaryTo: string;
    company: string;
    createdAt: Date | number;
  }

  const onSubmit = async (data: formData): Promise<void> => {
    console.log(data, "data");

    if (data) {
      data.createdAt = Date.now();
      data.createdBy = HREmail;
    }

    if (
      typeof qualification[0] === "object" &&
      !Array.isArray(qualification[0])
    ) {
      data.qualification = (data.qualification as QualificationOption[]).map(
        (option) => option.value
      );
    }
    if (typeof locations[0] === "object" && !Array.isArray(locations[0])) {
      data.locations = (data.locations as LocationsInterface[]).map(
        (option) => option.value
      );
    }

    const response = await axiosHRInstance.post("/hr/createJob", data);
    if (response.data.status === 201) {
      navigate("/hr");
    } else setError(response.data.message);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        width: "50%",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <h2
        style={{ fontSize: "30px", textAlign: "center", marginBottom: "20px" }}
      >
        Create a New Job
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
              required: true,
              pattern: /^[A-Za-z\s]+$/,
            })}
            onChange={() => {
              setError("");
            }}
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
              required: true,
              // pattern: /^[A-Za-z0-9\s\n]+$/,
            })}
            onChange={() => {
              setError("");
            }}
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
            rules={{ required: true }}
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
            rules={{ required: true }}
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
                  Select job type
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
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} isMulti options={locations} />
            )}
          />
          {errors.locations && (
            <p className="errorMsg">This is a required field.</p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="salaryFrom">Salary Scale from (LPA)</label>
          <input
            type="text"
            id="salaryFrom"
            {...register("salaryFrom", {
              required: true,
              pattern: /^[1-9][0-9]?$|^150$/,
            })}
            onChange={() => {
              setError("");
            }}
          />
          {errors.salaryFrom && <span>Salary scale is required</span>}
          {errors.salaryFrom && errors.salaryFrom.type === "pattern" && (
            <span>Salary scale must contain only letters and numbers</span>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="salaryTo">Salary Scale To (LPA)</label>
          <input
            type="text"
            id="salaryTo"
            {...register("salaryTo", {
              required: true,
              pattern: /^[1-9][0-9]?$|^150$/,
            })}
            onChange={() => {
              setError("");
            }}
          />
          {errors.salaryTo && <span>Salary Scale is required</span>}
          {errors.salaryTo && errors.salaryTo.type === "pattern" && (
            <span>Salary Scale must contain only letters and numbers</span>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            {...register("company", {
              required: true,
              // pattern: /^(?:[1-9]|1[0-9])$/,
            })}
            onChange={() => {
              setError("");
            }}
          />
          {errors.company && <span>Company is required</span>}
          {/* {errors.company && errors.company.type === "pattern" && (
    <span>Company must contain only letters and numbers</span>
  )} */}
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
            Create Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
