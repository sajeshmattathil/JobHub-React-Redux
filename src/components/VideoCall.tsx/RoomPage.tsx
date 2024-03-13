import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../Providers/Socket";
import { usePeer } from "../../Providers/Peer";
import ReactPlayer from "react-player";

const RoomPage = () => {
  const { socket } = useSocket();
  const { createOffer, createAnswer, setRemoteAns } = usePeer() || {};

  const handleNewUser = useCallback(
    async (data: { emailId: string }) => {
      const { emailId } = data;
      const offer = await createOffer();
      socket?.emit("call-user", { emailId, offer });
    },
    [createOffer, socket]
  );

  const handleIncommingCall = useCallback(
    async (data) => {
      const { offer, from } = data;
      if (createAnswer) {
        const ans = await createAnswer(offer);
        socket?.emit("call-accepted", { emailId: from, ans });
      }
    },
    [createAnswer, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      if (setRemoteAns) await setRemoteAns(ans);
    },
    [setRemoteAns]
  );

  const getUserMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }, []);

  const [myStream, setMyStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    socket?.on("user-joined", handleNewUser);
    socket?.on("incomming-call", handleIncommingCall);
    socket?.on("call-accepted", handleCallAccepted);

    return () => {
      socket?.off("user-joined", handleNewUser);
      socket?.off("incomming-call", handleIncommingCall);
      socket?.off("call-accepted", handleCallAccepted);
    };
  }, [socket, handleNewUser, handleIncommingCall, handleCallAccepted]);

  useEffect(() => {
    getUserMediaStream();
  }, []);

  return (
    <div className="room-page-container">
      <h1>Room Page</h1>
      {myStream && (
        <ReactPlayer
          url={window.URL.createObjectURL(myStream)}
          controls
          playing
        />
      )}
    </div>
  );
};

export default RoomPage;
