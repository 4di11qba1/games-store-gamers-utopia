import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Card } from "@mui/material";
import { useTheme } from "@mui/material";

const Chat = () => {
  const theme = useTheme();
  // const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div
      className="Chat"
      style={{
        backgroundColor: theme.palette.background.default,
        marginLeft: "64px",
      }}
    >
      {/* Left Side */}
      <div className="Left-side-chat">
        {/* <div style={{height: '56px'}}></div> */}
        <Card
          className="Chat-container"
          style={{ backgroundColor: theme.palette.background.paper }}
        >
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        {/* <div style={{ width: "20rem", alignSelf: "center" }}>
          <NavIcons />
        </div> */}
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
