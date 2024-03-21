import  { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { Socket } from "socket.io-client";

const VideoCall = ({ socket }: { socket: Socket }) => {
  const { userId } = useParams();

  const VURL = "http://localhost:5173/hr/videoCall";
  const navigate = useNavigate();
  const [newMessage] = useState(`${VURL}/${userId}`);
  const HREmail = localStorage.getItem("HREmail");
  //   const [socket, setSocket] = useState(null);

  const myMeeting = async (element: HTMLDivElement) => {
    console.log(element,'element----')
    const appID = 405182362;
    const serverSecret = "75651d7bd9a2ece1f54fce1093141b41";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      String(userId),
      Date.now().toString(),
      v4()
    );
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
    getSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [userId, HREmail]);

  const getSocket = () => {
    if (HREmail) {
      const data = {
        recipient:userId,
        message: newMessage,
      };

      socket.emit("vdo-call", data);
    } else {
      console.error("Socket is null. Cannot send data.");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-full h-full" ref={myMeeting} />
    </div>
  );
};

export default VideoCall;
