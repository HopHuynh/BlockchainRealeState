import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./chatbox.css";

import { Link } from "react-router-dom";
import { AiTwotoneSetting, AiOutlineSend,AiOutlineSearch } from "react-icons/ai";
import Conversation from "../conversation/conversation";
import Message from "../message/message";
import ChatOnline from "../chatOnline/chatOnline";
import axios from "axios";
import { io } from "socket.io-client";
import { createReceiver } from "../../redux/userSlice/chatBoxSlice";
import { updateReceiver } from "../../redux/userSlice/chatBoxSlice";

function Chatbox() {
  // khiem
  const [socketKhiem, setSocketKhiem] = useState(null);
  useEffect(() => {
    setSocketKhiem(io("http://localhost:8900"));
  }, []);
  useEffect(() => {
    socketKhiem?.emit("co tin nhan moi");
  }, []);
  useEffect(() => {
    socketKhiem?.on("da nhan tin nhan moi", (tinNhanMoi) => {});
  }, [socketKhiem]);
  //khiem
  const roomchat = useSelector((state) => state?.chatbox?.room);
  const [conversations, setConversations] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newmessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userChatCurrent, setUserChatCurrent] = useState(null);
  const [userchat, setUserChat] = useState(null);

  const socket = useRef();
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);
  //console.log("log", arrivalMessage);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser", user?.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);
  useEffect(() => {
    const getConversations = async () => {
      await axios
        .get(`http://localhost:5000/conversation/${user?.id}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setConversations(data.content);
        });
    };

    getConversations();
  }, [user?.id, arrivalMessage, roomchat]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/user/message` + currentChat?._id
        );
        setMessages(res.data.content);
      } catch (error) {
        console.log("error", error);
      }
    };
    getMessages();
  }, [currentChat, userchat]);

  // console.log("mess", messages);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newmessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== user.id);
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: receiverId,
      text: newmessage,
    });
    try {
      const res = await axios.post(
        "http://localhost:5000/user/message",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/detail/${currentChat.members[0]}`
        );
        setUserChatCurrent(res?.data?.content);

        // callBackcurrent && callBackcurrent(res?.data?.content);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentChat]);
  // console.log("userChatCurrent", userChatCurrent);
  // const callBackcurrent = (current) => {
  //   setCurrentChat(current);
  // };
  // console.log("curtrent", currentChat);
  const handleOnclick = (e) => {
    setCurrentChat(e);
    const friendId = e.members.find((m) => m !== user.id);
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/detail/${friendId}`
        );

        setUserChat(res?.data?.content);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  };
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input
            placeholder="Search for friends"
            className="chatMenuInput"
            
          >

          </input>
          <AiOutlineSearch className="search-icon"></AiOutlineSearch>
          {conversations?.map((c) => (
            <div onClick={() => handleOnclick(c)}>
              <Conversation
                Conversation={c}
                currentUser={user}
                //  callBackcurrent={callBackcurrent}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="chatBox">
        <span style={{ height: "50px", fontSize: "20px" }}>
          <b>{userchat?.name}</b>
        </span>
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages?.map((m) => (
                  <div ref={scrollRef}>
                    <Message
                      message={m}
                      own={m.sender === user.id ? true : false}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write somthing..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newmessage}

                  
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>{" "}
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
      {/* <div className="chatOnline">
        <div className="chatOnlineWrapper">
        <ChatOnline onlineUsers={onlineUsers} currentUser={userChatCurrent} />
        </div>
      </div> */}
      </div>
  );
}
export default Chatbox;
