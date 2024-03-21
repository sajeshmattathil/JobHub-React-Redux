import  { useState } from "react";
import { Socket } from "socket.io-client";
import { GrAttachment } from "react-icons/gr";
import upload from "../../../Utils/Cloudinary/cloudinary";
import { useForm } from "react-hook-form";
// import FileUploadComponent from "../../FileUploadComponent/FileUploadComponent";

const ChatFooter = ({
  socket,
  recipient,
}: {
  socket: Socket;
  recipient: string | undefined;
}) => {
  interface File {
    url: string;
    size: number;
    fileName: string;
  }
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  console.log(socket, "socketttt");
  const { register } = useForm();

  const handleSendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(message, "message---<");

    console.log({ userName: localStorage.getItem("HREmail"), message });
    setMessage("");
    const HREmail = localStorage.getItem("HREmail");
    console.log(HREmail, "hr email");

    if (message.trim() || file?.url.trim()) {
      socket.emit("message", {
        text: message,
        time: Date.now(),
        file: file?.url.trim() ? file : { url: "", size: 0, fileName: "" },
        name: localStorage.getItem("HREmail"),
        recipient1: HREmail,
        recipient2: recipient,
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
        <div style={{ margin: "3%" }}>
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
        {/* <FileUploadComponent  upload={upload} setFile={setFile} /> */}

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
