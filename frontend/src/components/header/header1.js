import React, { Fragment, useEffect, useState, useRef } from "react";
import "./header.css";
import {
  BiHelpCircle,
  BiDownload,
  BiBell,
  BiSearch,
  BiLogOut,
} from "react-icons/bi";
import {
  BsFillPersonLinesFill,
  BsFillCaretDownFill,
  BsChatDots,
} from "react-icons/bs";
import { AiOutlineWallet } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FaRegRegistered } from "react-icons/fa";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdManageAccounts, MdOutlineEventNote } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { Link } from "react-router-dom";
import Logoheader from "../../img/zyro-image.png";
import { logout } from "../../redux/userSlice/authSlice";
import { getlistpost } from "../../redux/userSlice/listPosts";
import axios from "axios";
import { Web3Button } from "@web3modal/react";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { io } from "socket.io-client";
export default function Header() {
  const socket = useRef();
  const { address: userAccount, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: userBalance, isSuccess: isBalanceSuccess } = useBalance({
    address: userAccount,
  });
  const [notifLength, setNotifLength] = useState();
  const [notifLengthUser, setNotifLengthUser] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const receiverId = useSelector((state) => state.chatBox.receiverId);
  console.log("chat", receiverId);
  const [inputSearch, setInputSearch] = useState("");
  const [listRoom, setListRoom] = useState();
  const [chatBoxNotif, setChatBoxNotif] = useState(0);
  const [notifGoverment, setNotifGoverment] = useState();
  const [chatBoxNotifUser, setChatBoxNotifUser] = useState();
  const [chatBoxReceiver, setChatBoxReceiver] = useState();
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("logout");
    await dispatch(logout());

    <Link to={"/homepage"} className="nav-link"></Link>;
  };
  const handlechage = (e) => {
    setInputSearch(e.target.value);
  };
  const handlechageNotif = () => {
    setNotifLength(null);
    setNotifLengthUser(null);
    setNotifGoverment(null);
  };
  const handleonClick = async () => {
    const listPosts = await axios.get(
      `http://localhost:5000/search/${inputSearch}`
    );
    console.log("sjdgsaghdsa", listPosts);
    await dispatch(getlistpost(listPosts));
  };

  if (!user) {
    <Link to={"/"} className="nav-link"></Link>;
  }

  const [showPage, setShowPage] = useState(false);

  const togglePage = () => {
    setShowPage(!showPage);
  };
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get(`http://localhost:5000/notif/count`)
        .then((res) => {
          const listNotifLength = res?.data?.content;
          setNotifLength(listNotifLength);
        })
        .catch((error) => console.log(error));
    };
    fetchdata();
  }, [user]);

  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get(`http://localhost:5000/notif/list`)
        .then((res) => {
          const listNotif = res.data.content;

          var listBuyer = listNotif.filter((User) => {
            return User.userId === user?.id && User.status === true;
          });
          Promise.all(listBuyer);
          const lengthnotif = listBuyer.length;
          setNotifLengthUser(lengthnotif);
        })
        .catch((error) => console.log(error));
    };
    fetchdata();
  }, [user]);
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get(`http://localhost:5000/room/lists`)
        .then((res) => {
          const newlistroom = res.data.content;
          setListRoom(newlistroom);
          setNotifGoverment(newlistroom?.length);
        })
        .catch((error) => console.log(error));
    };
    fetchdata();
  }, [user]);

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setChatBoxNotifUser(data.senderId);
      setChatBoxNotif(1);
      setChatBoxReceiver(receiverId);

      console.log("datamesssage", data.text);
    });
  }, [socket, chatBoxNotif]);
  console.log("ChatBoxNotif", chatBoxNotifUser);
  return (
    <div>
      {" "}
      <div className="header">
        <div className="grid">
          <div className="header__navbar"></div>
          <div className="header__navbar header__navbar--manager">
            <ul>
              <Link to={"/homepage"} className="nav-link">
                <img
                  className="logo-header"
                  src={Logoheader}
                  alt={Logoheader}
                ></img>
              </Link>
            </ul>
            <ul className="header__navbar-list">
              {user?.roles === "admin" ? (
                <Link to={"/admin"} className="nav-link">
                  <li className="header__navbar--manager--item">
                    <RiAdminLine className="header__navbar--manager--item-icon"></RiAdminLine>
                    Management
                  </li>
                </Link>
              ) : (
                <Fragment></Fragment>
              )}
              {user?.roles === "goverment" ? (
                <li className="header__navbar--manager--item">
                  <Link
                    to={"../listprocess"}
                    className="header__navbar--manager--item"
                  >
                    <BsChatDots className="header__navbar--manager--item-icon"></BsChatDots>
                    Confirmation Waiting List
                  </Link>
                </li>
              ) : (
                <Fragment></Fragment>
              )}

              <li className="header__navbar--manager--item">
                <Link
                  to={"../chatbox"}
                  className="header__navbar--manager--item"
                >
                  {user?.id !== chatBoxNotifUser ? (
                    <span className="chatBoxNotif">{chatBoxNotif}</span>
                  ) : (
                    <span className="chatBoxNotif">0</span>
                  )}
                  <BsChatDots className="header__navbar--manager--item-icon"></BsChatDots>
                  Chat
                </Link>
              </li>

              <li
                className="header__navbar--manager--item"
                onClick={handlechageNotif}
              >
                <Link
                  to={"../notification"}
                  className="header__navbar--manager--item"
                >
                  {user?.roles === "admin" ? (
                    <span className="notif">{notifLength?.count}</span>
                  ) : user?.roles === "" ? (
                    <span className="notif">{notifLengthUser}</span>
                  ) : user?.roles === "goverment" ? (
                    <span className="notif">{notifGoverment}</span>
                  ) : (
                    <Fragment></Fragment>
                  )}
                  <BiBell className="header__navbar--manager--item-icon"></BiBell>
                  Notification
                </Link>
              </li>

              <li className="header__navbar--manager--item">
                <div id="menu-discover-item">
                  <ul>
                    <li className="discover-edit">
                      <a href="">
                        <div className="discover-edit-item">
                          <BsFillPersonLinesFill className="icon-item"></BsFillPersonLinesFill>
                          {!user ? (
                            <span>Account </span>
                          ) : (
                            <span>{user?.username} </span>
                          )}
                          <BsFillCaretDownFill className="icon-item"></BsFillCaretDownFill>
                        </div>
                      </a>
                      {!user ? (
                        <ul className="sub-menu-discover-item">
                          <li>
                            <a href="#">
                              <Link to={"/login"} className="nav-link">
                                <FiLogIn className="icon-item"></FiLogIn>Login{" "}
                              </Link>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <Link to={"/register"} className="nav-link">
                                <FaRegRegistered className="icon-item"></FaRegRegistered>
                                Register
                              </Link>
                            </a>
                          </li>
                          <li>
                            <Link to={"/profile"} className="nav-link">
                              <MdManageAccounts className="icon-item"></MdManageAccounts>
                              Information Account
                            </Link>
                          </li>
                          <li>
                            <a href="#">
                              <RiShoppingCart2Fill className="icon-item"></RiShoppingCart2Fill>
                              Order Management
                            </a>
                          </li>
                        </ul>
                      ) : (
                        <ul className="sub-menu-discover-item">
                          <li>
                            <Link
                              to={"/profile/userprofile"}
                              className="nav-link"
                            >
                              <MdManageAccounts className="icon-item"></MdManageAccounts>
                              Information Account
                            </Link>
                          </li>

                          <li>
                            <a href="#">
                              <Link to="../listProcess">
                                <RiShoppingCart2Fill className="icon-item"></RiShoppingCart2Fill>
                                Order Management
                              </Link>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <Web3Button
                                style={{
                                  "--w3m-accent-color": "goldenrod",
                                  "--w3m-background-color": "yello",
                                }}
                              >
                                {isConnected ? userAccount : "Not connected"}
                              </Web3Button>
                            </a>
                          </li>
                          <li>
                            <a href="#" onClick={handleLogout}>
                              <Link to={"/homepage"} className="nav-link">
                                <BiLogOut className="icon-item"></BiLogOut> Log
                                out
                              </Link>
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="header__navbar header__navbar--operation">
            <div className="header__navbar--input">
              <input
                type="text"
                placeholder=" Search"
                className="input-search"
                name="inputSearch"
                onChange={handlechage}
              />
              <Link to={"/search"} className="nav-link">
                <div
                  className="input-search-label--icon"
                  onClick={handleonClick}
                >
                  <BiSearch className="input-search--icon"></BiSearch>
                </div>
              </Link>
              <span></span>
            </div>
            {user?.roles === "admin" ? (
              <button type="button" className="input-button-label--icon">
                <Link to={"/postsell"} className="nav-link">
                  <TfiWrite className="input-button--icon"> </TfiWrite>
                  <p className="input-button--name">POST</p>
                </Link>
              </button>
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
