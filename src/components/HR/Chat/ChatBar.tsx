import { useEffect, useState } from "react";
import { axiosHRInstance } from "../../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  recipient1: string | null;
  recipient2: string;
  time: Date;
  text: string;
  file?: File | null;
  name: string | null;
  id: string;
  socketID: string;
}
interface lastMsgInterface {
  text: string ;
  name: string ;
}
const ChatBar = ({ messages }: { messages: ChatMessage[] }) => {
  const [prevChatUsers, setPrevChatUsers] = useState<lastMsgInterface[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviousChatHRs = async () => {
      try {
        const prevChatUsers = await axiosHRInstance.get("/hr/getPrevChatUsers");
        console.log(prevChatUsers);
        if (prevChatUsers.status === 201)
          setPrevChatUsers(prevChatUsers?.data?.chatData);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchPreviousChatHRs();
  }, []);
  const HREmail = localStorage.getItem("HREmail");

  const handleLastMsg = (user: string) => {
    console.log(user);
    const messageWithUser = messages.map((msg) => {
      if (msg.recipient1 === HREmail && msg.recipient2 === user)
        return { text: msg.text, from: msg.recipient1 };
    });
    console.log(messageWithUser, ">>>>");
    return messageWithUser[messageWithUser.length - 1];
  };

  return (
    <div className="chat__sidebar">
      <h2>Messages</h2>

      <div>
        <h4 className="chat__header"></h4>
        <div className="chat__users">
          {prevChatUsers &&
            prevChatUsers.map((user) => (
              <div>
                <p
                  key={user?.name}
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  onClick={() => navigate(`/hr/chatPage/${user.name}`)}
                >
                  {user?.name.split("@")[0]}
                </p>
                <h6>{handleLastMsg(user.name)?.text ?handleLastMsg(user.name)?.text :user.text }</h6>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
