import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { axiosUserInstance } from "../../../Utils/axios/axios";
// import { message } from "antd";

interface File {
  url: string;
  size: number;
  fileName: string;
}
interface ChatMessage {
  time: Date;
  text: string;
  file?: File | null;
  name: string | null;
  recipient1: string;
  recipient2: string;
  id: string;
  socketID: string;
}
interface ChatBodyProps {
  messages: ChatMessage[];
  lastMessageRef: React.RefObject<HTMLDivElement>;
  recipient : string | undefined
  ;
}

const ChatBody: React.FC<ChatBodyProps> = ({ messages, lastMessageRef ,recipient}) => {
  const navigate = useNavigate();
  const [previousChat, setPreviousChat] = useState<ChatMessage[] | null>(null);
  // const recipientRef = useRef<string | null>('');
console.log(recipient,'recpnt')
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchPreviousChat = async () => {
      console.log(messages, "name");
      if (userEmail && recipient) {
        const response = await axiosUserInstance.get(
          `/getChat?recipient1=${recipient}&recipient2=${userEmail}`
        );
        console.log(response, "prev --msag --user");

        if (response.data.status === 201)
          console.log(response.data.chatData, "prev -user");

        setPreviousChat(response.data.chatData);
      }
    };
    fetchPreviousChat();
  }, [recipient]);

  const handleFile = async (fileUrl: string, fileName: string) => {
    try {
      const downloadFile = await axiosUserInstance.post("/downloadFile", {
        url: fileUrl,
        fileName: fileName,
      });

      const blob = new Blob([downloadFile.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);

      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.log("error happened ,try again");
    }
  };

  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes}`;
  };
  return (
    <>
      <header className="chat__mainHeader">
      {recipient && <p>{recipient.split("@")[0]}</p>}
        {userEmail && <h6 style={{ fontStyle: "italic" }}>Online</h6>}
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {previousChat &&
          previousChat.map((message: ChatMessage) =>
            message.recipient2 == localStorage.getItem('userEmail') ? (
              <div className="message__chats" key={message.id}>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
                {message.file?.url.trim() && (
                  <div className="message__sender">
                    <p style={{ fontSize: "1.1rem" }}>
                      {message.file.fileName}{" "}
                      <MdOutlineDownloadForOffline
                        style={{ width: "9%", height: "9%", cursor: "pointer" }}
                        onClick={() => {
                          if (message.file)
                            return handleFile(
                              message.file.url,
                              message.file?.fileName
                            );
                        }}
                      />
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="message__chats" key={message.id}>
                <p>{message.name}</p>
                <div className="message__recipient" ref={lastMessageRef}>
                  <p>{message.text}</p>
                </div>
                {message.file?.url.trim() && (
                  <div className="message__recipient">
                    <p>
                      {message.file.fileName}

                      <MdOutlineDownloadForOffline
                        style={{ width: "9%", height: "9%", cursor: "pointer" }}
                        onClick={() => {
                          if (message.file)
                            return handleFile(
                              message.file.url,
                              message.file?.fileName
                            );
                        }}
                      />
                    </p>
                  </div>
                )}
              </div>
            )
          )}

        {messages.map((message: ChatMessage) =>
          message.recipient2 === localStorage.getItem('userEmail') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>

              <div className="message__sender">
                {message.text && <p>{message.text}</p>}
              </div>
              <p className="sender__name">{formatTime(message.time)}</p>

              {message.file?.url.trim() && (
                <div className="message__sender">
                  <p>
                    {message.file.fileName}{" "}
                    <MdOutlineDownloadForOffline
                      style={{ width: "9%", height: "9%", cursor: "pointer" }}
                      onClick={() => {
                        if (message.file)
                          return handleFile(
                            message.file.url,
                            message.file?.fileName
                          );
                      }}
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
              <p className="message__chats">{formatTime(message.time)}</p>
            </div>
          )
        )}

        {/*This is triggered when a user is typing*/}
        {/* <div className="message__status">
          <p>Someone is typing...</p>
        </div> */}
      </div>
    </>
  );
};

export default ChatBody;
