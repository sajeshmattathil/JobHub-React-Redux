import React, { useEffect, useState } from "react";
import { useSocket } from "../../Providers/Socket";
import { useNavigate } from "react-router-dom";

const VideoCall = () => {
  const [emailId, setEmail] = useState<string>("");
  const [roomId, setRoom] = useState<number | null>(null);
 
   const navigate = useNavigate()
  const { socket } = useSocket();
  console.log(socket, "socket");
  const handleSubmit = () => {
    if (socket) socket.emit("join-room", { roomId, emailId });
  };

  const handleJoinedRoom = (roomId : string) =>{
    // const {roomId} = data
    console.log('joined room',roomId);
    navigate(`/chat/${roomId}`)
  }
  useEffect(()=>{
    socket?.on('joined-room',handleJoinedRoom)
  },[socket])

  return (
    <div>
      <div
        className="container"
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "30vh",
          padding: "1rem",
        }}
      >
        <div className="form-controller">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="emailId"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Room No.</label>
          <input
            type="text"
            name="roomId"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={handleSubmit} style={{ margin: "1rem" }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
