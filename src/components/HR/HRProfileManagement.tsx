import { useEffect, useState } from "react";
import "./HRProfileManagement.css";
import upload from "../../Utils/Cloudinary/cloudinary";
import { axiosHRInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FaBriefcase,
  FaEnvelope,
  FaGraduationCap,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Menu, MenuItem } from "@mui/material";

export default function HRProfileManagement() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [experience, setExperience] = useState<string>("0");
  const [company, setCompany] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [EmployeesNumber, setEmployeesNumber] = useState<number | string>(0);
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [followers, setFollowers] = useState<string[] | []>([]);

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const HRId = localStorage.getItem("HREmail");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!HRId) navigate("/hr/login");
        const response = await axiosHRInstance.get("/hr/getHR");
        console.log(response, "res");
        if (response?.data?.status === 201) {
          setName(response?.data?.HR?.name);
          setEmail(response?.data?.HR?.email);
          setCompany(response?.data?.HR?.company);
          setWebsite(response?.data?.HR?.website);
          setExperience(response?.data?.HR?.experience);
          setEmployeesNumber(response?.data?.HR?.EmployeesNumber);
          setFollowers(response?.data?.HR?.followers);
        }
      } catch (error) {
        console.log("error in fetching user");
      }
    };
    fetchUser();
  }, [HRId, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  interface HRProfileData {
    name?: string;
    company?: string;
    website?: string;
    resume?: string;
    employeesNumber?: number | string;
    experience?: number;
    email?: string;
  }

  const onSubmit = async (data: HRProfileData) => {
    window.scrollTo(0, 0);

    data.resume = resume;
    data.name = name;
    data.company = company;
    data.website = website;
    data.employeesNumber = EmployeesNumber;
    data.email = email;
    try {
      await axiosHRInstance.post(`/hr/update/${HRId}`, data);
      toast.success("Data updated");
      setTimeout(() => {
        setEditProfile(false);
      }, 2000);

      setError("User data updated");
    } catch (error) {
      console.log("Error in updating profile");
    }
  };
  const handleProfileEdit = () => {
    setEditProfile(true);
  };
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);
  const handleClick1 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  if (!editProfile)
    return (
      <div className="profile" style={{ marginTop: "5%" }}>
        <div className="profileContainer">
          <div className="profileSection">
            <h2>Profile Information</h2>
            <div className="profileContent">
              <FaUser className="profile-icon" />
              <h3>{name}</h3>

              <button
                className="edit-button"
                onClick={handleProfileEdit}
                style={{ backgroundColor: "grey" }}
              >
                <CiEdit className="profile-icon" style={{ color: "white" }} />
                Edit Profile
              </button>
            </div>
            <div className="profileContent">
              <FaEnvelope className="profile-icon" />
              <label htmlFor="email" className="profile-label">
                Email :
              </label>

              <p id="email">{email}</p>
              {/* <button className="edit-button"  style={{backgroundColor:'grey'}}>
                <CiEdit className="profile-icon" style={{ color: "white" ,}} />
                View followers{}
              </button> */}
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick1}
              >
                <button
                  className="edit-button"
                  style={{ backgroundColor: "grey" }}
                >
                  <CiEdit className="profile-icon" style={{ color: "white" }} />
                  View followers{}
                </button>
              </Button>
              <Menu
                id="chat-menu"
                anchorEl={anchorEl1}
                open={Boolean(anchorEl1)}
                onClose={handleClose1}
              >
                {!followers.length && (
                  <MenuItem
                    onClick={() => {
                      setAnchorEl1(null);
                    }}
                  >
                    No followers
                  </MenuItem>
                )}
                {followers.length &&
                  followers.map((item) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setAnchorEl1(null);
                        }}
                      >
                        {item.split("@")[0]}
                      </MenuItem>
                    );
                  })}
              </Menu>
            </div>
            <div className="profileContent">
              <FaLock className="profile-icon" />
              <label htmlFor="password" className="profile-label">
                Password :
              </label>
              <p id="password">●●●●●●</p>
            </div>
          </div>
          <div className="profileSection">
            <h2>Additional Details</h2>

            <div className="profileContent">
              <FaGraduationCap className="profile-icon" />
              <label htmlFor="education" className="profile-label">
                Company :
              </label>
              <p id="education">{company}</p>
            </div>
            <div className="profileContent">
              <FaBriefcase className="profile-icon" />
              <label htmlFor="experience" className="profile-label">
                Experience :
              </label>
              <p id="experience">{experience ? experience : "Not Added"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <>
        <ToastContainer />

        <div className="App">
          <p>{error}</p>
          <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
            style={{ backgroundColor: "white", width: "150%" }}
          >
            <div className="form-control">
              <h2 className="" style={{ backgroundColor: "white" }}>
                Manage your Profile
              </h2>
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
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => setPassword(event.target.value)}
                value={"●●●●●●" || password}
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
                <p className="errorMsg">Website is required.</p>
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
                  Experience should be a non-negative number less than or equal
                  to 50.
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
                    onChange={async (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      setError("");
                      const files = e.target.files;
                      if (files) {
                        const pdf = files[0];
                        const resumeUrl = await upload(pdf, "resume");
                        if (resumeUrl) setResume(resumeUrl.url);
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
              .{" "}
            </div>
          </form>
        </div>
      </>
    );
}
