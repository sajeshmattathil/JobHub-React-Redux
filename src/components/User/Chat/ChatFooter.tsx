import  { useEffect, useState } from "react";
// import upload from "../../../Utils/Cloudinary/cloudinary";
// import { useForm } from "react-hook-form";
// import { GrAttachment } from "react-icons/gr";
import { useSocket } from "../../../Providers/Socket";
// import { useParams } from "react-router-dom";
import FileUploadComponent from "../../FileUploadComponent/FileUploadComponent";

const ChatFooter = ({ recipient }: { recipient : string | undefined}) => {
  interface File {
    url: string;
    size: number;
    fileName: string;
  }
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File>({url :'',size : 0,fileName : ''});
  const [hide,setHide] = useState<boolean>(false)

  // const { register } = useForm();
  const {socket} = useSocket()

 useEffect(() => {
    if (recipient === 'showMessages') {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [recipient]);

  const handleSendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setMessage("");
    setFile({url :'',size : 0,fileName : ''})

    const userEmail = localStorage.getItem("userEmail")
   if(socket){
    if ( message.trim() || file?.url.trim()) {
      console.log(recipient,'recip>>>>user')
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
   }
    setMessage("");
    setFile({url :'',size : 0,fileName : ''})
  };
  if(recipient !== 'showMessages')
  return (
    <div className="chat__footer" style={{height:'30%'}}>
    
      {!hide &&<form className="form" onSubmit={handleSendMessage} >
   
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
        <FileUploadComponent setYourFile={setFile} />
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
  
      </form>}
  
    </div>
  );
};

export default ChatFooter;
