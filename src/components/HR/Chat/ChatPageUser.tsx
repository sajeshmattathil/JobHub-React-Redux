import { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../Providers/Socket";

const ChatPageUser = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  interface ChatMessage {
    time: Date;
    text: string;
    name: string | null;
    recipient1: string;
    recipient2: string;
    id: string;
    socketID: string;
  }
  const { socket } = useSocket();
  const { recipient } = useParams();
  console.log(socket, "soooo");

  useEffect(() => {
    if (socket) {
      console.log(socket,'socket++hrrr');
      
      const messageResponseListener = (data: ChatMessage) => {
        if (data.recipient2 === recipient) {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      };
  
      socket.on("messageResponse", messageResponseListener);
  
      return () => {
        socket.off("messageResponse", messageResponseListener);
      };
    }
  }, [socket, recipient]);
  

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar messages={messages} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          recipient={recipient}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter recipient={recipient} />
      </div>
    </div>
  );
};

export default ChatPageUser;
