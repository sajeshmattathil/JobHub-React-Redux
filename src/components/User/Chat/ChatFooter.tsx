import  { useState } from "react";
// import upload from "../../../Utils/Cloudinary/cloudinary";
// import { useForm } from "react-hook-form";
// import { GrAttachment } from "react-icons/gr";
import { useSocket } from "../../../Providers/Socket";
// import { useParams } from "react-router-dom";
// import FileUploadComponent from "../../FileUploadComponent/FileUploadComponent";

const ChatFooter = ({ recipient }: { recipient : string | undefined}) => {
  interface File {
    url: string;
    size: number;
    fileName: string;
  }
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // const { register } = useForm();
  const {socket} = useSocket()


  const handleSendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // console.log({ userName: localStorage.getItem('userName'), message });
    setMessage("");
    setFile(null);
    const userEmail = localStorage.getItem("userEmail")

   if(socket){
    if ( message.trim() || file?.url.trim()) {
      console.log(recipient,'recip>>>>user')
      socket.emit("message", {
        text: message,
        time : Date.now(),
        file: file?.url.trim() ? file : {url :'',size : 0,fileName : ''},
        name: localStorage.getItem("userName")?.split('@')[0],
        recipient1 : recipient,
        recipient2 : userEmail,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
   }
    setMessage("");
    setFile(null);

    // return <div className="chat__footer">...</div>;
  };
  if(recipient !== 'showMessages')
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        {/* <div style={{ margin: "3%" }}>
          <GrAttachment style={{ width: "300%", height: "100%" }} />
        </div> */}

        {/* <input
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
        /> */}
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
