import { useEffect, useState } from "react";
// import { GrAttachment } from "react-icons/gr";
// import upload from "../../../Utils/Cloudinary/cloudinary";
// import { useForm } from "react-hook-form";
import { useSocket } from "../../../Providers/Socket";
import FileUploadComponent from "../../FileUploadComponent/FileUploadComponent";

const ChatFooter = ({ recipient }: { recipient: string | undefined }) => {
  interface File {
    url: string;
    size: number;
    fileName: string;
  }
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File>({ url: "", size: 0, fileName: "" });
  const [hide, setHide] = useState<boolean>(false);

  const { socket } = useSocket();
  // const { register } = useForm();
  useEffect(() => {
    if (recipient === "showMessages") {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [recipient]);
  // const handleSendMessage = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   console.log(socket, "hr---footer");
  //   setMessage("");
  //   setFile({ url: "", size: 0, fileName: "" });
  //   const HREmail = localStorage.getItem("HREmail");

  //   if (socket && recipient) {
  //     if (message.trim() || file?.url.trim()) {
  //       socket.emit(
  //         "message",
  //         {
  //           recipient: recipient,
  //           message: {
  //             text: message,
  //             time: Date.now(),
  //             file: file?.url.trim()
  //               ? file
  //               : { url: "", size: 0, fileName: "" },
  //             name: localStorage.getItem("HREmail"),
  //             recipient1: HREmail,
  //             recipient2: recipient,
  //             id: `${socket.id}${Math.random()}`,
  //             socketID: socket.id,
  //           },
  //         },
  //         (acknowledgment: unknown) => {
  //           console.log("Acknowledgment status:", acknowledgment);
  //         }
  //       );
  //     }
  //   }
  //   setMessage("");
  //   setFile({ url: "", size: 0, fileName: "" });
  // };
  const handleMessageSend = (e: { preventDefault: () => void }) => {
    e.preventDefault();
if(socket){


    socket.emit(
      "message",
      {
         recipient: recipient,
         message: {
           text: message,
           time: Date.now(),
         },
      },
      (acknowledgment: string) => {
         console.log("Acknowledgment callback called with:", acknowledgment);
         if (acknowledgment === "success") {
           console.log("Message sent successfully");
           setMessage("");
         } else {
           console.log("Failed to send message");
         }
      }
     );
    } 
  };

  if (recipient !== "showMessages")
    return (
      <div className="chat__footer">
        {!hide && (
          <form className="form">
            <FileUploadComponent setYourFile={setFile} />

            <input
              type="text"
              placeholder="Write message..✏️"
              className="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleMessageSend} className="sendBtn">
              SEND
            </button>
          </form>
        )}
      </div>
    );
};

export default ChatFooter;
