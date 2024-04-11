import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./ProfileManagement.css";
import Select from "react-select";
import upload from "../../Utils/Cloudinary/cloudinary";
import { axiosUserInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineWork } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";


import {
  FaRegFilePdf,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCogs,
  FaGraduationCap,
  FaBriefcase,
  FaCreditCard,
} from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

interface experienceInterface {
  jobRole: string;
  company: string;
  from: Date | null;
  to: Date | null;
}
interface subscriptionInterface {
  plan?: string;
  isSubscribed: boolean;
  expireAt?: Date;
}
export default function UsersProfileManagement() {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [experience, setExperience] = useState<string>("0");
  const [skill, setSkills] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [educationalQualification, setEducationalQualification] =
    useState<string>("");
  const [subscription, setSubscription] =
    useState<subscriptionInterface | null>(null);

  const [workExperience, setWorkExperience] = useState<
    experienceInterface[] 
  >([]);
  const navigate = useNavigate();
  console.log(password, "");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userEmail");
        if (!userId) navigate("/login");

        const response = await axiosUserInstance.get(`/getUser`);

        if (response?.data?.status === 201) {
          setFname(response?.data?.user?.fname);
          setLname(response?.data?.user?.lname);
          setEmail(response?.data?.user?.email);
          if (response?.data?.user?.resume)
            setResume(response?.data?.user?.resume);
          if (response?.data?.user?.skills)
            setSkills(response?.data?.user?.skills);
          if (response?.data?.user?.experience)
            setExperience(response?.data?.user?.experience);
          if (response?.data?.user?.educationalQualification)
            setEducationalQualification(
              response?.data?.user?.educationalQualification
            );
          if (response?.data?.user?.subscription.isSubscribed)
            setSubscription({
              isSubscribed: response?.data?.user?.subscription.isSubscribed,
              plan: response?.data?.user?.subscription.plan,
              expireAt: response?.data?.user?.subscription.expireAt,
            });
          else setSubscription({ isSubscribed: false });
          if (response?.data?.user?.resume)
            setResume(response?.data?.user?.resume);
          if (response?.data?.user?.workExperience.length)
            setWorkExperience(response?.data?.user?.workExperience);
        }
      } catch (error) {
        console.log("error in fetching user");
      }
    };
    fetchUser();
  }, [navigate,editProfile]);

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
    workExperience ?:experienceInterface[]
    lname?: string;
    fname?: string;
    course?: string;
    education?: string;
    educationalQualification?: string;
    resume?: string;
    skills?: { value: string; label: string }[] | string[];
  }) => {
    if(data.workExperience) data.workExperience = workExperience
    console.log(data,workExperience, ">>>>>>first");
    window.scrollTo(0, 0);

    if (data.fname == "") data.fname = fname;
    if (data.lname == "") data.lname = lname;
    if (data.skills && !data.skills.length) data.skills = skill;

    data.resume = resume;
    if (data.resume == "") data.resume = resume;
    data.educationalQualification = `${data.education} ${data.course}`;

    if (data.skills?.length) {
      data.skills = (data.skills as SkillOption[]).map(
        (option) => option.value
      );
    }
    console.log(1)

    console.log(data,workExperience,'final>>>>>')
    try {
      const update = await axiosUserInstance.put("/update", data);
      console.log(update, "user data updation ");

      if(update.data.status === 201){
      toast.success("User data updated");
        setTimeout(() => {
          setEditProfile(false)
         }, 2000);  
      }
      
      else toast.success("Updation failed,try again");
    
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Error in updating profile");
      setError(error.response.data.message);
    }
  };

  const handleExperience = () => {
    console.log(workExperience, "work");
    setWorkExperience(prevExperience => [
      ...prevExperience,
      { jobRole: "", company: "", from: null, to: null },
    ]);
  };
  
  const handleRemoveExperience = (index: number) => {
    setWorkExperience(prevExperience => prevExperience.filter((_element, id) => id !== index));
  };
  
  const style = {
    label: { width: "20%", padding: "2%" },
  };
  const handleProfileEdit = () => {
    setEditProfile(true);
  };
 if(workExperience && workExperience.length) console.log('Is jobRole required?', !skill.length);

  if (!editProfile)
    return (
      <div className="profile">
        <div className="profileContainer">
          <div className="profileSection">
            <h2>Profile Information</h2>
            <div className="profileContent">
              <FaUser className="profile-icon" />
              <h3>{`${fname} ${lname}`}</h3>
              <button className="edit-button" onClick={handleProfileEdit}>
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
              <FaCogs className="profile-icon" />
              <label htmlFor="skills" className="profile-label">
                Skills :
              </label>
              <p id="skills">{skill ? skill.join(", ") : "No skills added"}</p>
            </div>
            <div className="profileContent">
              <FaGraduationCap className="profile-icon" />
              <label htmlFor="education" className="profile-label">
                Education :
              </label>
              <p id="education">
                {educationalQualification.trim()
                  ? educationalQualification
                  : "Education is not added"}
              </p>
            </div>
            <div className="profileContent">
              <FaBriefcase className="profile-icon" />
              <label htmlFor="experience" className="profile-label">
                Experience :
              </label>
              <p id="experience">{experience}</p>
            </div>
            <div className="profileContent">
              <FaCreditCard className="profile-icon" />
              <label htmlFor="subscription" className="profile-label">
                Subscription Details :
              </label>
              <p id="subscription">
                {subscription?.isSubscribed
                  ? subscription?.plan
                  : "No plan purchased"}
              </p>
            </div>
            <div className="profileContent">
              <FaRegFilePdf className="profile-icon" />
              <label htmlFor="resume" className="profile-label">
                Resume :
              </label>
              <p id="resume">
                {resume.trim() ? (
                  <div style={{ color: "green" }}>Resume uploaded <MdOutlineCheckCircle /></div>
                ) : (
                  "Upload your resume?"
                )}

              </p>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <>
        <ToastContainer />

        <div className="edit-profile">
          <p>{error}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="">Manage your Profile</h2>
            <div className="form-control">
              <div className="container" style={{ display: "flex" }}>
                <div className="field">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    {...register("fname", {
                      required: false,
                      pattern: /^[A-Za-z]+$/,
                    })}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
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
                </div>
                <div className="field">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    {...register("lname", {
                      required: false,
                      pattern: /^[A-Za-z]+$/,
                    })}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
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
                </div>
              </div>
              <div
                className="container"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <div className="field">
                  <label>Email</label>
                  <input
                    type="text"
                    {...register("email", {
                      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    })}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
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
                </div>
                <div className="field">
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
                    value={"●●●●●●"}
                    disabled
                  />
                </div>
              </div>
              <div className="skill-field">
                <label>Select your skills</label>
                <Controller
                  name="skills"
                  control={control}
                  rules={{ required: !skill.length }}
                  render={({ field }) => (
                    <Select {...field} isMulti options={skills} />
                  )}
                />
                {errors.skills && (
                  <p className="errorMsg">This is a required field.</p>
                )}
              </div>
              
              <div
                className=""
                style={{ display: "flex", borderRadius: "10px" }}
              >
                <div className="field">
                  <label htmlFor="education"></label>
                  <Controller
                    name="education"
                    control={control}
                    defaultValue=""
                    rules={{ required: false }}
                    render={({ field }) => (
                      <select
                        style={{
                          width: "100%",
                          padding: "2%",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          backgroundColor: "#fff",
                          color: "#333",
                          fontSize: "1.5rem",
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

                <div className="field">
                  <label htmlFor="course"></label>
                  <Controller
                    name="course"
                    control={control}
                    defaultValue=""
                    rules={{ required: false }}
                    render={({ field }) => (
                      <select
                        style={{
                          width: "100%",
                          padding: "2%",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          backgroundColor: "#fff",
                          color: "#333",
                          fontSize: "1.5rem",
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
              <div className="">
                <div
                  onClick={handleExperience}
                  style={{
                    backgroundColor: "white",
                    cursor: "pointer",
                    color: "black",
                    fontSize:'1.2rem'
                  }}
                >
                  Add your Experience? <MdOutlineWork />
                </div>
                <div className="">
                  {workExperience &&
                    workExperience.map((_exp, index) => {
                      return (
                        <div className="experience" key={index}>
                          <div className="closeButtonContainer">
                            <AiOutlineCloseCircle
                              className="closeButton"
                              onClick={() => handleRemoveExperience(index)}
                            />
                          </div>
                          <div className="experienceContent">
                            <h3>Experience {index + 1} </h3>
                            <div className="role">
                              <label
                                className="label"
                                style={style.label}
                                htmlFor=""
                              >
                                Job Role
                              </label>
                              <input
                                type="text"
                                {...register(
                                  `workExperience[${index}].jobRole`,
                                  {
                                    required: !workExperience[index]?.jobRole?.trim(),
                                    pattern: /^[A-Za-z]+$/,
                                  }
                                )}
                                placeholder={workExperience[index]?.jobRole}

                                style={{ width: "50%" }}
                              />
                            </div>
                            <div className="company">
                              <label
                                className="label"
                                style={style.label}
                                htmlFor=""
                              >
                                Company
                              </label>
                              <input
                                type="text"
                                {...register(
                                  `workExperience[${index}].company`,
                                  {
                                    required: !workExperience[index]?.jobRole?.trim(),
                                    pattern: /^[A-Za-z]+$/,
                                  }
                                )}
                                id=""
                                placeholder={workExperience[index]?.company}
                                style={{ width: "50%" }}
                              />
                            </div>
                            <div className="period" style={{ display: "flex" }}>
                              <div>
                                {" "}
                                <label
                                  className="label"
                                  style={style.label}
                                  htmlFor=""
                                >
                                  From
                                </label>
                                <Controller
                                  control={control}
                                  name={`workExperience[${index}].from`}
                                  defaultValue={new Date()}
                                  render={({ field }) => (
                                    <DatePicker
                                      selected={field.value}
                                      onChange={(date: Date) =>
                                        field.onChange(date)
                                      }
                                    />
                                  )}
                                />
                              </div>
                              <div>
                                {" "}
                                <label
                                  className="label"
                                  style={style.label}
                                  htmlFor=""
                                >
                                  To
                                </label>
                                <Controller
                                  control={control}
                                  name={`workExperience[${index}].to`}
                                  defaultValue={new Date()}

                                  render={({ field }) => (
                                    <DatePicker
                                      // selected={workExperience[index]?.to  ? workExperience[index]?.to : field.value}
                                      onChange={(date: Date) =>
                                        field.onChange(date)
                                      }
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div>
                <div className="skill-field">
                  <label htmlFor="resume_upload">Upload Resume (PDF)</label>
                  <input
                    type="file"
                    id="resume_upload"
                    accept=".pdf"
                    {...register("resume", {
                      required: resume ? false : true,
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

              <button className="profile-button" type="submit" style={{ backgroundColor: "black" }}>
                Update
              </button>
            </div>
            .
          </form>
        </div>
      </>
    );
}
