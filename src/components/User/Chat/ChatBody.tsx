import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { axiosUserInstance } from "../../../Utils/axios/axios";

interface File {
  url: string;
  size: number;
  fileName: string;
}
interface ChatMessage {
  text: string;
  file: File | null;
  name: string | null;
  id: string;
  socketID: string;
}
interface ChatBodyProps {
  messages: ChatMessage[];
  lastMessageRef: React.RefObject<HTMLDivElement>;
}
const ChatBody: React.FC<ChatBodyProps> = ({ messages }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  const handleFile = async (fileUrl: string, fileName: string) => {
    try {
      console.log(fileUrl, fileName, "req=====>>>>");

      const downloadFile = await axiosUserInstance.post("/downloadFile", {
        url: fileUrl,
        fileName: fileName,
      });

      console.log(downloadFile, "download---->user");

      const blob = new Blob([downloadFile.data], { type: "application/pdf" });
      console.log(blob,'blob-user');
      
      const url = window.URL.createObjectURL(blob);
      console.log(url,'url-user');

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName; 
      document.body.appendChild(a);
      console.log(a,'a-user');
      
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.log(error, "errrorss");
    }

  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message: ChatMessage) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                {message.text && <p>{message.text}</p>}
              </div>
              {message.file && (
                <div className="message__sender">
                  <p>
                    {message.file.fileName}{" "}
                    <MdOutlineDownloadForOffline
                      style={{ width: "9%", height: "9%", cursor: "pointer" }}
                      onClick={() =>
                        handleFile(message.file.url, message.file?.fileName)
                      }
                    />
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              {message.text.trim() && <p>{message.name}</p>}
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
