import React, { useEffect, useState } from "react";
import avatar from "../../img/seller-img.png";
import "./chatOnline.css";
import axios from "axios";
export default function ChatOnline({ onlineUsers, currentUser }) {
  // const [chatOnlines, setChatOnlines] = useState([]);
  // const array = onlineUsers.filter((item) => item.id !== currentId);
  // useEffect(() => {
  //   setChatOnlines(array);
  // }, []);
  // console.log("online", chatOnlines);
  // console.log("sadsfdsf", currentId);
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src={avatar} alt=""></img>
          <div className="chatOnlineBadge"></div>
        </div>
        <span clasName="chatOnlineName">{currentUser?.name}</span>
      </div>
    </div>
  );
}
