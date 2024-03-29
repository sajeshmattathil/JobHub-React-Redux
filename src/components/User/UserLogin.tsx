import { useState } from "react";
import { axiosInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userLogin } from "../../Services/Redux/Slices/UserSlices";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: unknown) => {
    try {
      if (error !== "") return;

      const response = await axiosInstance.post("/login_submit", data);

      if (response?.data?.status === 201) {

        dispatch(userLogin({ userEmail: email }));

        localStorage.setItem("userEmail", email);

        localStorage.setItem("userToken", response.data.token);

        navigate("/");
      } else if (response?.data?.status === 400)
      toast.success(response?.data?.message); 
        // setError(response?.data?.message);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err :any) {
      toast.success(err.response.data.message);    
      // setError(err.response.data.message)
    }
  };

 

  const navigate = useNavigate();

  const handleCreateNewUser = () => {
    navigate("/signup");
  };

  const handleHiringManager = () => {
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
      <ToastContainer />

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
          User Login
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
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>{ 
              setError('')
              setEmail(e.target.value)}}
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
            ) => {
              setError('')
              setPassword(event.target.value)}}
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

          <label></label>
          <button style={{marginTop : '3%',color : "white",backgroundColor : 'black'}} type="submit">Login</button>
        </div>
        <p style={{ cursor: "pointer" }} onClick={handleCreateNewUser}>
          Create a new account
        </p>
      <div style={{display : 'flex',justifyContent :'space-between' }}>
        <p style={{ cursor: "pointer"}} onClick={handleHiringManager}>
          Hiring Manager ?
        </p>
      <span style={{cursor : 'pointer'}} onClick={()=>navigate('/forgotPassword')}>Forgot password?</span>

      </div>
      </form>
    </div>
  );

  
}

export default UserLogin;
