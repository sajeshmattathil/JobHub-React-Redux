// import React, { useCallback, useEffect, useState } from "react";
// import { useSocket } from "../../Providers/Socket";
// import { usePeer } from "../../Providers/Peer";
// import ReactPlayer from "react-player";
// import image from '../../../../Screenshot 2024-01-01 103549.png'

// const RoomPage = () => {
//   const { socket } = useSocket();
//   const { createOffer, createAnswer, setRemoteAns } = usePeer() || {};

//   const handleNewUser = useCallback(
//     async (data: { emailId: string }) => {
//       const { emailId } = data;
//       const offer = await createOffer();
//       socket?.emit("call-user", { emailId, offer });
//     },
//     [createOffer, socket]
//   );

//   const handleIncommingCall = useCallback(
//     async (data) => {
//       const { offer, from } = data;
//       if (createAnswer) {
//         const ans = await createAnswer(offer);
//         socket?.emit("call-accepted", { emailId: from, ans });
//       }
//     },
//     [createAnswer, socket]
//   );

//   const handleCallAccepted = useCallback(
//     async (data) => {
//       const { ans } = data;
//       if (setRemoteAns) await setRemoteAns(ans);
//     },
//     [setRemoteAns]
//   );
//   async function checkMediaDevicesAvailability() {
//     try {
//       const devices = await navigator.mediaDevices.enumerateDevices();
      
//       const hasVideoDevice = devices.some(device => device.kind === 'videoinput');
//       const hasAudioDevice = devices.some(device => device.kind === 'audioinput');
  
//       if (hasVideoDevice) {
//         console.log('Video device is available.');
//       } else {
//         console.log('No video device available.');
//       }
  
//       if (hasAudioDevice) {
//         console.log('Audio device is available.');
//       } else {
//         console.log('No audio device available.');
//       }
//     } catch (error) {
//       console.error('Error enumerating media devices:', error);
//     }
//   }
  
//   // Call the function to check the availability of media devices
//   checkMediaDevicesAvailability();
//   const getUserMediaStream = useCallback(async () => {
//     try {
//       const constraints = {
//         video: {
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//           frameRate: { ideal: 30 },
//         },
//         audio: true,
//       };
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       console.log(stream,'stream');
      
//       setMyStream(stream);
//     } catch (error) {
//       if (error.name === 'NotAllowedError') {
//         console.error('User denied permission to access media devices.');
//         // Display a user-friendly message informing them about the permission denial
//       } else {
//         console.error('Error accessing media devices:', error);
//         // Handle other types of errors
//       }
//     }
//   }, []);

//   const [myStream, setMyStream] = useState<MediaStream | null>(null);

//   useEffect(() => {
//     socket?.on("user-joined", handleNewUser);
//     socket?.on("incomming-call", handleIncommingCall);
//     socket?.on("call-accepted", handleCallAccepted);

//     return () => {
//       socket?.off("user-joined", handleNewUser);
//       socket?.off("incomming-call", handleIncommingCall);
//       socket?.off("call-accepted", handleCallAccepted);
//     };
//   }, [socket, handleNewUser, handleIncommingCall, handleCallAccepted]);

//   useEffect(() => {
//     getUserMediaStream();
//   }, []);

//   return (
//     <div className="room-page-container">
//       <h1>Room Page</h1>
//       <video id="videoElement" autoPlay muted controls>
//   <source src={image} type="image/jpeg"/>
//   Your browser does not support the video tag.
// </video>
//       {myStream && (
//         <ReactPlayer
//           url={window.URL.createObjectURL(myStream)}
//           controls
//           playing
//         />
//       )}
//     </div>
//   );
// };

// export default RoomPage;
