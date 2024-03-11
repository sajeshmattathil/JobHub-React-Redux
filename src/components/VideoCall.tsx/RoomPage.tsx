import React, { useCallback, useEffect } from "react";
import { useSocket } from "../../Providers/Socket";
import { usePeer } from "../../Providers/Peer";

const RoomPage = () => {
  const { socket } = useSocket();
  const { peer, createOffer } = usePeer() || {};  console.log(peer, createOffer, "offer and peer");

  const handleNewUser = useCallback(
    async (data: { emaiId: string; }) => {
      const { emailId } = data;
      console.log(data,'data user-joined');
      
      console.log(emailId, "new user");
      const offer = await createOffer();
      socket?.emit("call-user", { emailId, offer });
    },
    [createOffer, socket]
  );
  
  const handleIncommingCall = useCallback((data) => {
    const { offer, from } = data;
    console.log(from,'from');
    
    console.log("incoming from", from, offer);
  }, []);

  
  useEffect(() => {
    socket?.on("user-joined", handleNewUser);
    socket?.on("incomming-call", handleIncommingCall);
  }, [socket, handleNewUser]);

  return <div>RoomPage</div>;
};

export default RoomPage;
