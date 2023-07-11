import React from "react";
import "./message.css";
import { format } from "timeago.js";
import avatar from "../../img/seller-img.png";
export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={avatar} alt=""></img>
        <p className="messageText">{message.text}</p>
      </div>

      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
