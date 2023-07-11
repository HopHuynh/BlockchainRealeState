import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function ItemNotifAdmin({ room }) {
  console.log("Debug ====> Noti Component", room);

  const navigate = useNavigate();

  const updateNotif = async (id) => {
    await axios.put(`http://localhost:5000/notif/${id}`, {
      status: "Read",
    });
  };

  return (
    <div>
      <div key={room?._id} className="notifi-detail-item">
        <div className="notifi-detail-img">
          <img></img>
          <BsFillPersonFill className="notifi-icon"></BsFillPersonFill>
        </div>
        <div className="notifi-detail-content">
          <span>{room?.detail}</span>
          <span> Status: {room?.status} </span>
          <br></br>
          <button
            style={{
              background: "green",
              padding: "5px",
              color: "white",
              borderRadius: "5px",
            }}
            onClick={async () => {
              console.log("Debug ===>", room);
              await updateNotif(room?._id);
              if (room?.type == "Buy") {
                navigate(`/product?id=${room?.postId}`);
              } else {
                navigate(`/goverment?id=${room?.postId}`);
              }
            }}
          >
            xác nhận{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
