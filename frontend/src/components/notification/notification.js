import React, { useState, useEffect, Fragment } from "react";
import "../notification/notification.css";
import { BsFillPersonFill } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ItemNotifAdmin from "./ItemNotifAdmin";
import { toast } from "react-toastify";
const Notification = ({ notis }) => {
  // const [lists, setLists] = useState([]);
  // const [status, setStatus] = useState({
  //   status: true,
  // });
  // const [listRoom, setListRoom] = useState();
  // const [check, setCheck] = useState(false);
  // const [ListBuyer, setListBuyer] = useState([]);
  const user = useSelector((state) => state?.auth?.user);
  console.log("user", user);
  // const [dataRoom, setDataRoom] = useState({
  //   sellerId: user?.id,
  //   BuyerIds: null,
  //   status: false,
  // });
  // const onClickHandle = async (id, userId) => {
  //   console.log("iduser", userId);
  //   const newDataRoom = { ...dataRoom, BuyerIds: userId };
  //   setDataRoom(newDataRoom);
  //   const updateNotif = await axios.put(
  //     `http://localhost:5000/notif/${id}`,
  //     status
  //   );
  //   console.log("update", updateNotif);
  //   console.log("addRoom", updateNotif?.data);
  //   if (updateNotif?.data?.statusCode === 200) {
  //     toast.success("Đã Xác Nhận  !!!");

  //     setCheck(true);
  //   }
  // };
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     await axios
  //       .get(`http://localhost:5000/notif/list`)
  //       .then((res) => {
  //         const listNotif = res.data.content;
  //         console.log("listNotif", listNotif);
  //         let listBuyer = listNotif.filter((User) => {
  //           return User.userId === user?.id && User.status === true;
  //         });
  //         Promise.all(listBuyer);
  //         setListBuyer(listBuyer);
  //         setLists(listNotif);
  //         console.log("list", lists);
  //       })
  //       .catch((error) => console.log(error));
  //   };
  //   fetchdata();
  // }, [user, !check]);
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     await axios
  //       .get(`http://localhost:5000/room/lists`)
  //       .then((res) => {
  //         const newlistroom = res.data.content;
  //         setListRoom(newlistroom);
  //       })
  //       .catch((error) => console.log(error));
  //   };
  //   fetchdata();
  // }, [user]);
  // console.log("lists", listRoom);

  return (
    <div className="notifi-body">
      <div className="notifi-header">
        <span>Notification</span>
        <br />

        <div className="notifi-all">
          <button>All</button>
        </div>
        <div className="notifi-unread">
          <button>Unread</button>
        </div>
      </div>
      {/* {user?.roles === "admin" ? (
        <div className="notifi-detail">
          {lists?.map((Notif) => (
            <div key={Notif?._id} className="notifi-detail-item">
              <div className="notifi-detail-img">
                <img></img>
                <BsFillPersonFill className="notifi-icon"></BsFillPersonFill>
              </div>
              <div className="notifi-detail-content">
                <span>
                  {Notif?.username} đang chờ xác nhận mua nhà {Notif?.namePost}{" "}
                </span>
                {!Notif?.status ? (
                  <button
                    onClick={() => onClickHandle(Notif._id, Notif.userId)}
                    style={{
                      background: "green",
                      padding: "5px",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    xác nhận{" "}
                  </button>
                ) : (
                  <span style={{ color: "green" }}>đã được xác nhận </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) :  */}
      {!user?.roles ? (
        <></>
      ) : user?.roles === "government" ? (
        <div className="notifi-detail">
          {notis?.map((room) => (
            <div>
              <ItemNotifAdmin room={room}></ItemNotifAdmin>
            </div>
          ))}
        </div>
      ) : (
        <div className="notifi-detail">
          {notis?.map((Notif) => (
            <div key={Notif?._id} className="notifi-detail-item">
              <div className="notifi-detail-img">
                <img></img>
                <BsFillPersonFill className="notifi-icon"></BsFillPersonFill>
              </div>
              <div className="notifi-detail-content">
                <span>
                  {user?.username} admin đã xác nhận mua nhà của{" "}
                  {Notif?.namePost} của bạn
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
