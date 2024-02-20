// import React from 'react'

// const Otp = () => {
//   return (
//     <div>
//     <div
//       className="otp"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundColor: "white",
//       }}
//     >
//       <div
//         className="otpInner items-center justify-center "
//         style={{
//           backgroundColor: "white",
//           padding: "40px",

//           borderRadius: "8px",
//           boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
//         }}
//       >
//         <p
//           style={{
//             fontWeight: "bolder",
//             fontFamily: "sans-serif",
//             fontSize: "17px",
//           }}
//         >
//           Enter your OTP
//         </p>
//         <p
//           style={{
//             color: "red",
//             fontSize: "15px",
//             alignItems: "center",
//             justifyItems: "center",
//             marginLeft: "27%",
//           }}
//         >
//           {error}
//         </p>
//         {resendClicked && (
//           <p
//             style={{ fontWeight: "bold" }}
//           >{`Time Remaining : ${minutes}:${seconds}`}</p>
//         )}

//         <span>
//           <input
//             type="text"
//             style={{
//               border: "solid black 2px",
//               borderRadius: ".5rem",
//               margin: ".5rem",
//             }}
//             onChange={(e) => {
//               setEnteredOtp(e.target.value);
//               setError("");
//             }}
//           />

//           <button
//             style={{
//               borderRadius: ".5rem",
//               color: "white",
//               backgroundColor: "black",
//               border: "none",
//             }}
//             onClick={handleOtp}
//           >
//             Submit
//           </button>
//         </span>
//         <p style={{ cursor: "pointer" }} onClick={handleResendOTP}>
//           Resend OTP
//         </p>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default Otp