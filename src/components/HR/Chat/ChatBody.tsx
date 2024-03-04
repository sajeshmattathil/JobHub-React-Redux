import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDownloadForOffline } from "react-icons/md";

interface File {
  url : string;
  size : number;
  fileName : string;
}
interface ChatMessage {
    text: string; 
    file : File | null ;
    name: string | null; 
    id: string;
    socketID: string; 
}
interface ChatBodyProps {
  messages: ChatMessage[];
  lastMessageRef: React.RefObject<HTMLDivElement>;
}
const ChatBody : React.FC<ChatBodyProps> = ({messages,lastMessageRef }) => {
  
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('HRName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message :ChatMessage ) =>
          message.name === localStorage.getItem('HRName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
              {message.file && <div className="message__sender">
                <p>{message.file.fileName} <MdOutlineDownloadForOffline />
</p>
              </div>}
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient" ref ={lastMessageRef}>
                <p>{message.text}</p>
              </div>
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