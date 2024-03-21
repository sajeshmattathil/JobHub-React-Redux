import  { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";


const ChatPageUser = ({socket} :{socket : Socket}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const lastMessageRef = useRef<HTMLDivElement>(null)
    interface ChatMessage {
      time:Date;
        text: string; 
        name: string | null; 
        id: string;
        socketID: string; 
    }
  const {recipient} = useParams()
    
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
        <ChatBody messages={messages} recipient = {recipient} lastMessageRef={lastMessageRef} />
        <ChatFooter  socket = {socket} recipient = {recipient}/>
      </div>
    </div>
  );
};

export default ChatPageUser;
