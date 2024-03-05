import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { GrAttachment } from "react-icons/gr";
import upload from "../../../Utils/Cloudinary/cloudinary";
import { useForm } from "react-hook-form";

const ChatFooter = ({ socket }: { socket: Socket }) => {
  interface File {
    url: string;
    size: number;
    fileName: string;
  }
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  console.log(socket, "socketttt");
  const { register } = useForm();

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message, "message---<");

    console.log({ userName: localStorage.getItem("HRName"), message });
    setMessage("");
    if (message.trim() || file?.url.trim()) {
      socket.emit("message", {
        text: message,
        file: file?.url.trim() ? file : null,
        name: localStorage.getItem("HRName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
    setFile(null);

    // return <div className="chat__footer">...</div>;
  };
  return (
    <div className="chat__footer">
      <form className="form">
        <div style={{ margin: "3%" }} >
          <GrAttachment style={{ width: "300%", height: "100%" }} />
        </div>
        <input
          type="file"
          id=""
          accept=".pdf"
          {...register("file", {
            required: file ? false : true,
          })}
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
              const pdf = files[0];
              const fileUrl = await upload(pdf, "resume");
              if (fileUrl) setFile(fileUrl);
            }
          }}
         />
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="sendBtn">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
