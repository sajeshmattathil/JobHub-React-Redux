import  { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../Providers/Socket";

const ChatPageUser = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const lastMessageRef = useRef<HTMLDivElement>(null)
    interface ChatMessage {
      time:Date;
        text: string; 
        name: string | null; 
        recipient1:string;
        recipient2 :string;
        id: string;
        socketID: string; 
    }
    const {socket} = useSocket()
  const {recipient} = useParams()
    
    useEffect(() => {
    if(socket)  socket.on('messageResponse', (data :ChatMessage) =>{
      console.log(data,recipient,'data>>hrrrrrr')
    if(data.recipient2 === recipient) {
      console.log('helloooo')
      setMessages([...messages, data])
    }
    } 
    );
    }, [socket, messages, recipient]);
  
    useEffect(()=>{
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    },[messages])
    
  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody messages={messages} recipient = {recipient} lastMessageRef={lastMessageRef} />
        <ChatFooter  recipient = {recipient}/>
      </div>
    </div>
  );
};

export default ChatPageUser;
