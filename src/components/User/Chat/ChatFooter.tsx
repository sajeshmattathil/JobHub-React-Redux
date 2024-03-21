import  { useState } from "react";
import { Socket } from "socket.io-client";
import upload from "../../../Utils/Cloudinary/cloudinary";
import { useForm } from "react-hook-form";
import { GrAttachment } from "react-icons/gr";
// import { useParams } from "react-router-dom";
// import FileUploadComponent from "../../FileUploadComponent/FileUploadComponent";

const ChatFooter = ({ socket,recipient }: { socket: Socket ,recipient : string}) => {
  interface File {
    url: string;
    size: number;
    fileName: string;
  }
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { register } = useForm();

  const handleSendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // console.log({ userName: localStorage.getItem('userName'), message });
    setMessage("");
    setFile(null);
    const userEmail = localStorage.getItem("userEmail")

    if (message.trim() || file?.url.trim()) {
      socket.emit("message", {
        text: message,
        time : Date.now(),
        file: file?.url.trim() ? file : {url :'',size : 0,fileName : ''},
        name: localStorage.getItem("userEmail"),
        recipient1 : recipient,
        recipient2 : userEmail,
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
      <form className="form" onSubmit={handleSendMessage}>
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
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
