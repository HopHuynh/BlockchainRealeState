import React, { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";
import avavar from "../../img/seller-img.png";
export default function Conversation({ Conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = Conversation.members.find((m) => m !== currentUser.id);
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/detail/${friendId}`);
        // callBackcurrent && callBackcurrent(res?.data?.content);
        // console.log("res", res?.data?.content);
        setUser(res?.data?.content);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [Conversation, currentUser]);
  // console.log("user", user);
  return (
    <div className="conversation">
      <img className="conversationImg" src={avavar} alt=""></img>
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}
