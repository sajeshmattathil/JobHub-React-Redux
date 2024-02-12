import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../services/popups/popups";
import { ToastContainer } from "react-toastify";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { SignupSchema } from "../../../utils/validationSchema";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import uploadImage from "../../../services/cloudinary/customeImageUpload";

function Signup() {
  const [viewImage, setViewImage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const navigate = useNavigate();

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    image: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const image = viewImage;
      const Data = { ...values, image };

      const response = await userAxios.post(userEndpoints.signup, Data);
      if (response.status === 201) {
        showSuccessToast("Account Created");
        setTimeout(() => {
          navigate(userEndpoints.login);
        }, 2300);
      } else {
        showErrorToast(response?.data?.message);
      }
    } catch (error) {
      showErrorToast((error as Error).message);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Login Image"
          />
        </div>
        <div className="md:w-2/2 px-8 md:px-12 ">
          <h2 className="font-bold text-2xl text-[#002D74] mb-4">
            User Signup
          </h2>
          <ToastContainer />

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}
          >
            <Form>
              <div className="flex justify-between gap-2">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <label>First Name</label>
                  <Field
                    type="text"
                    className="peer block min-h-[auto] mr-5 w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="firstname"
                    placeholder="Enter your first name"
                    style={{ "::placeholder": { color: "black" } }}
                  />
                 
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="error text-sm"
                  />
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                <label>Last Name</label>
                  <Field
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="lastname"
                    placeholder="Enter your last name"
                  />
                
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="error text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <div className="relative mb-6" data-te-input-wrapper-init>
                <label>Email Address</label>
                  <Field
                    type="email"
                    className="peer block min-h-[auto] w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="email"
                    placeholder="Enter your email"
                  />
                 
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error text-sm"
                  />
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                <label>Phone Number</label>
                  <Field
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="mobile"
                    placeholder="Enter your number"
                  />
                
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="error text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <div className="relative mb-6" data-te-input-wrapper-init>
                <label>Password</label>
                  <Field
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="password"
                    placeholder="Create a password"
                  />
               
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error text-sm"
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                <label>Confirm Password</label>
                  <Field
                    type="password"
                    className="peer block min-h-[auto]  w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="confirm_password"
                    placeholder="Confirm password"
                  />
                 
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="error text-sm"
                  />
                </div>
              </div>
              <div  className="image-selection">
                <p>Profile picture</p>
                
                <label htmlFor="image" className="custom-file-upload">
              {image || viewImage
                ? "\u00a0  \u00a0  Choose another image"
                : " \u00a0  \u00a0 Select an image"}
            </label>
                
                <Field
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const imageFileList = e.target.files;
                    if (imageFileList && imageFileList.length > 0) {
                      const image = imageFileList[0];
                      const foldername = "User Image";
                      setImage(image);
                      setLoading(true); 
                      uploadImage(image, foldername).then((url) =>{
                        setViewImage(url);
                        setLoading(false);
                        
                       } );
                    }
                  }}
                  className="file-input"
                  style={{ display: "none" }}
                />
                  {loading && <div>Uploading...</div>}
                <div>
                  {image && (
                    <img
                      style={{
                        width: "auto",
                        height: "100px",
                        margin: "5px 0 15px 0",
                      }}
                      src={viewImage}
                      
                      className="profile-image"
                    />
                  )}
                </div>
                <ErrorMessage
                  name="image"
                  component="div"
                  className="error text-sm"
                />
              </div>

              <div className="mb-6 flex items-center justify-between"></div>

              <div className="text-center lg:text-right">
                <button
                  type="submit"
                  className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#3b71ca] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:bg-primary-700 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  style={{ backgroundColor: "#002D74", marginBottom: "1rem" }}
                >
                  submit
                </button>

                <br />
                <Link to={userEndpoints.login}>Already registered?</Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
}

export default Signup;