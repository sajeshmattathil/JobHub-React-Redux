import { useEffect,  useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useSocket } from "../../../Providers/Socket";

const ChatPageUser = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const recipientRef = useRef<string | null>('');

  const { socket } = useSocket();

  interface ChatMessage {
    time: Date;
    name: string | null;
    text: string;
    recipient1: string;
    id: string;
    socketID: string;
  }

  useEffect(() => {
    if (socket) {
      socket.on("messageResponse", (data: ChatMessage) => {
        setMessages([...messages, data]);
      });
    }
  }, [socket, messages]);
  // useEffect(() => {
  //   if (socket) {
  //     socket.on("messageResponse", (data: ChatMessage) => {
  //       console.log(data,'data2')

  //       setMessages([...messages, data]);
  //     });
  //   }
  // }, [socket,messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter recipient={recipientRef.current} />
      </div>
    </div>
  );
};

export default ChatPageUser;
