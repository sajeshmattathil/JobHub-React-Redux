import  { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { useSocket } from "../../../Providers/Socket";

const VideoCall = () => {
  const { userId } = useParams();

  const VURL = "https://jobshub-nine.vercel.app/hr/videoCall";
  const navigate = useNavigate();
  const [newMessage] = useState(`${VURL}/${userId}`);
  const HREmail = localStorage.getItem("HREmail");
  //   const [socket, setSocket] = useState(null);
  const {socket} = useSocket()

  const myMeeting = async (element: HTMLDivElement) => {
  
    //  const appID = import.meta.env.VITE_appID;
    // const serverSecret = import.meta.env.VITE_serverSecret;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      1293873590,
      'a5f7e809758cd1c9e8e860c8c554f44b',
      String(userId),
      Date.now().toString(),
      v4()
    );
    console.log(kitToken,'kittoken')
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onLeaveRoom: () => {
        navigate(`/HR`);
      },
    });
  };
 
  useEffect(() => {
    const getSocket = () => {
      if (HREmail) {
        const data = {
          recipient:userId,
          message: newMessage,
        };
  
       if(socket) socket.emit("vdo-call", data);
      } else {
        console.error("Socket is null. Cannot send data.");
      }
    };
    getSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [userId, HREmail, socket, newMessage]);



  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-full h-full" ref={myMeeting} />
    </div>
  );
};

export default VideoCall;
