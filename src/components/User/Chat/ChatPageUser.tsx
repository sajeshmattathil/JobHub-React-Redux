import { useEffect,  useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useSocket } from "../../../Providers/Socket";
import { useParams } from "react-router-dom";

const ChatPageUser = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { socket } = useSocket();
  const {recipient} = useParams()


  interface ChatMessage {
    time: Date;
    name: string | null;
    text: string;
    recipient1: string;
    recipient2: string;
    id: string;
    socketID: string;
  }

  useEffect(() => {
    if (socket) {
      socket.on("messageResponse", (data: ChatMessage) => {
        console.log(data,'data');
        
       if(data.recipient2 === localStorage.getItem('userEmail')) setMessages([...messages, data]);
      });
    }
  }, [socket, messages]);


  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(recipient,'chatpage >>> user')
  return (
    <div className="chat">
      <ChatBar messages={messages} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          recipient={recipient}
        />
        <ChatFooter recipient={recipient} />
      </div>
    </div>
  );
};

export default ChatPageUser;
