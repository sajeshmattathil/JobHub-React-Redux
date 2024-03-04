import React, { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { Socket } from "socket.io-client";


const ChatPageUser = ({socket} :{socket : Socket}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const lastMessageRef = useRef<HTMLDivElement>(null)
    interface ChatMessage {
        text: string; 
        name: string | null; 
        id: string;
        socketID: string; 
    }
    
    useEffect(() => {
      socket.on('messageResponse', (data :ChatMessage) => setMessages([...messages, data]));
    }, [socket, messages]);
  
    useEffect(()=>{
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    },[messages])
    
  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} />
        <ChatFooter  socket = {socket}/>
      </div>
    </div>
  );
};

export default ChatPageUser;
