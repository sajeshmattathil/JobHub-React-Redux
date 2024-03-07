import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { axiosHRInstance } from "../../../Utils/axios/axios";

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
  messages: ChatMessage[] | null;
  lastMessageRef: React.RefObject<HTMLDivElement>;
  recipient: string;
}
const ChatBody: React.FC<ChatBodyProps> = ({
  messages,
  recipient,
  lastMessageRef,
}) => {
  console.log(messages, "msg");

  const [previousChat, setPreviousChat] = useState<ChatMessage[] | null>(null);
  const navigate = useNavigate();
  const HREmail = localStorage.getItem("HREmail");

  const handleLeaveChat = () => {
    localStorage.removeItem("HRName");
    navigate("/hr");
    window.location.reload();
  };
  useEffect(() => {
    const fetchPreviousChat = async () => {
      if (HREmail && recipient) {
        const response = await axiosHRInstance.get(
          `/hr/getChat?recipient1=${HREmail}&recipient2=${recipient}`
        );
        console.log(response, "res---<< chat");
        if (response.data.status === 201)
          setPreviousChat(response.data.chatData);
      }
    };
    fetchPreviousChat();
  }, []);
  const handleFile = async (fileUrl: string, fileName: string) => {
    try {
      console.log(fileUrl, fileName, "req=====>>>>");

      const downloadFile = await axiosHRInstance.post("/hr/downloadFile", {
        url: fileUrl,
        fileName: fileName,
      });

      console.log(downloadFile, "download---->");

      const blob = new Blob([downloadFile.data], { type: "application/pdf" });
      console.log(blob, "blob");

      const url = window.URL.createObjectURL(blob);
      console.log(url, "url");

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      console.log(a, "a");

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
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {previousChat &&
          previousChat.map((message: ChatMessage) =>
            message.name === localStorage.getItem("HREmail") ? (
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
                <p>{message.name}</p>
                <div className="message__recipient" ref={lastMessageRef}>
                  <p>{message.text}</p>
                </div>
                {message.file?.url.trim() && (
                  <div className="message__recipient">
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
            )
          )}

        {messages &&
          messages.map((message: ChatMessage) =>
            message.name === localStorage.getItem("HREmail") ? (
              <div className="message__chats" key={message.id}>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
                {message.file?.url.trim() && (
                  <div className="message__sender">
                    <p style={{ fontSize: "1.1rem" }}>
                      {message.file.fileName}
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
                <p>{message.name}</p>
                <div className="message__recipient" ref={lastMessageRef}>
                  <p>{message.text}</p>
                </div>

                {message.file.url.trim() && (
                  <div className="message__recipient">
                    <p>
                      {message.file.fileName}{" "}
                      <MdOutlineDownloadForOffline
                        style={{
                          width: "9%",
                          height: "9%",
                          cursor: "pointer",
                          marginRight: "10%",
                        }}
                        onClick={() =>
                          handleFile(message.file.url, message.file?.fileName)
                        }
                      />
                    </p>
                  </div>
                )}
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
