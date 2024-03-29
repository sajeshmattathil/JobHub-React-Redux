import { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { Socket } from "socket.io-client";

const ChatPageUser = ({ socket }: { socket: Socket }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [recipient, setRecipient] = useState<string>("");
  const lastMessageRef = useRef<HTMLDivElement>(null);

  interface ChatMessage {
    time: Date;
    name: string | null;

    text: string;
    recipient1: string;
    id: string;
    socketID: string;
  }

  useEffect(() => {
    socket.on("messageResponse", (data: ChatMessage) => {
      console.log(data, "data");

      setRecipient(data.recipient1);
      console.log(recipient, "recip at chat page");

      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          recipient={recipient}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} recipient={recipient} />
      </div>
    </div>
  );
};

export default ChatPageUser;
