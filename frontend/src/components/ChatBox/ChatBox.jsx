import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequests";
import "./ChatBox.css";
import { Card, Button, IconButton, Typography } from "@mui/material";
import InputEmoji from "react-input-emoji";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useTheme } from "@mui/material";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const theme = useTheme();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    let isMounted = true;

    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        const messagesWithUserData = [];
        for (const message of data) {
          const { data: usrData } = await getUser(message.senderId);
          message.user = usrData;
          messagesWithUserData.push(message);
        }
        if (isMounted) {
          setMessages(messagesWithUserData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();

    return () => {
      isMounted = false; // Set to false when unmounting
    };
  }, [chat, messages]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();

    // Get the input element where the user selects the image
    const fileInput = imageRef.current;
    let fileName = "";
    // Extract the file name from the selected file
    fileInput.files.length > 0
      ? (fileName = fileInput.files[0].name)
      : (fileName = null);

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
      image: fileName, // Include the file name in the message object
    };

    const receiverId = chat.members.find((id) => id !== currentUser);

    // Send message to socket server
    setSendMessage({ ...message, receiverId });

    try {
      // Add the message to the database
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      {chat && chat.members.length === 1 ? (
        <Typography component={"div"} variant={"h4"}>
          No Users To Chat With Because You Are The Only User On The Website.
          When A New User Is Registered, Then You Will Be Able To Chat With Them
        </Typography>
      ) : (
        <Card className="ChatBox-container">
          {chat ? (
            <>
              {/* chat-header */}
              <div className="chat-header">
                <div className="follower">
                  <div>
                    <img
                      src={
                        chat.members.length > 1
                          ? "http://localhost:5001/images/tiger-logo.jpg"
                          : userData?.profilePicture
                          ? "http://localhost:5001/images/" +
                            userData.profilePicture
                          : "http://localhost:5001/images/" +
                            "defaultProfile.png"
                      }
                      alt="Profile"
                      className="followerImage"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="name" style={{ fontSize: "0.9rem" }}>
                      <span>
                        {chat.members.length > 1
                          ? "Gamer's Utopia Public Chatroom"
                          : userData?.firstname + " " + userData?.lastname}
                        {/* {userData?.firstname + " " + userData?.lastname} */}
                      </span>
                    </div>
                  </div>
                </div>
                <hr
                  style={{
                    width: "95%",
                    border: "0.1px solid #ececec",
                    marginTop: "20px",
                  }}
                />
              </div>
              {/* chat-body */}
              <div className="chat-body">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                    style={{ background: theme.palette.background.default }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      {message.senderId !== currentUser && (
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                          }}
                        >
                          <img
                            className="followerImage"
                            style={{ width: "30px", height: "30px" }}
                            src={
                              message.user && message.user.profilePicture
                                ? "http://localhost:5001/images/" +
                                  message.user.profilePicture
                                : "http://localhost:5001/images/" +
                                  "defaultProfile.png"
                            }
                            alt="Profile"
                          />
                          <span className="sender-name">
                            {message.user && message.user.username}
                          </span>
                        </div>
                      )}
                      {message.image && (
                        <img
                          src={"http://localhost:5001/images/" + message.image}
                        />
                      )}
                      <span>{message.text}</span>{" "}
                      {/* <span>{format(message.createdAt)}</span> */}
                    </div>
                  </div>
                ))}
              </div>
              {/* chat-sender */}
              <Card
                className="chat-sender"
                style={{ background: theme.palette.background.paper }}
              >
                <div style={{ backgroundColor: "transparent" }}>
                  <IconButton onClick={() => imageRef.current.click()}>
                    <AddAPhotoIcon />
                  </IconButton>
                </div>
                <InputEmoji value={newMessage} onChange={handleChange} />
                <Button variant="contained" type="submit" onClick={handleSend}>
                  Send
                </Button>
                <input
                  type="file"
                  name=""
                  id=""
                  style={{ display: "none" }}
                  ref={imageRef}
                />
              </Card>{" "}
            </>
          ) : (
            <span className="chatbox-empty-message">
              Tap on a chat to start conversation...
            </span>
          )}
        </Card>
      )}
    </>
  );
};

export default ChatBox;
