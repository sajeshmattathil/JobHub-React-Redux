import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./profileManagement.css";
import Select from "react-select";

export default function ProfileManagement() {
  const departments = [
    { value: "Computer-Science", label: "Computer Science" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Mathematics", label: "Mathematics" },
  ];

  interface workExperience {
    companyName : string,jobRole : string, years : number
  }
  const [workExperiences, setWorkExperiences] = useState<workExperience[]>([
    { companyName: "", jobRole: "", years: 0 },
  ]);


  const [addWorkExpience, setAddWorkExperiences] = useState([
    ...workExperiences,
    { companyName: "", jobRole: "", years: 0 },
  ]);

  

  const updateWorkExperience = (index: number,field : keyof workExperience,value : number | string)=>{
    const updatedWorkexperience : workExperience[]= [...workExperiences]
    updateWorkExperience[index].field = value
    setWorkExperiences(updateWorkExperience)
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <label>Email</label>

        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="errorMsg">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg">Email is not valid.</p>
          )}
        </div>
        <div className="form-control">
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
        </div>
        <div className="form-control">
          <label htmlFor="">Work Experience</label>
          {workExperiences.map((workExperience, index) => (
            <div className="work-entry" key={index}>
              <label htmlFor={`companyName${index}`}>Company Name:</label>
              <input
                type="text"
                id={`companyName${index}`}
                name={`companyName`}
                value={workExperience.companyName}
                onChange={(e) =>
                  updateWorkExperience(index, "companyName", e.target.value)
                }
                required
              />

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

              <label htmlFor={`years${index}`}>Years:</label>
              <input
                type="number"
                id={`years${index}`}
                name={`years`}
                min="1"
                step="1"
                value={workExperience.years}
                onChange={(e) =>
                  updateWorkExperience(index, "years", e.target.value)
                }
                required
              />

              <button type="button" onClick={() => removeWorkExperience(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="form-control">
          <label>Select Department of Interest</label>
          <Controller
            name="department"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} isMulti options={departments} />
            )}
          />
          {errors.department && (
            <p className="errorMsg">This is a required field.</p>
          )}
        </div>

        <div>
          <div className="form-control">
            <label htmlFor="resume_upload">Upload Resume (PDF)</label>
            <input
              type="file"
              id="resume_upload"
              name="resume_upload"
              accept=".pdf"
            />
          </div>
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Update</button>
        </div>.
        <div className="form-control">
          <label></label>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}
