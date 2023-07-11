import React, { Fragment, useEffect, useState, useRef } from "react";
import "./header.css";
import {
  BiHelpCircle,
  BiDownload,
  BiBell,
  BiSearch,
  BiLogOut,
  BiHome,
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
import { CustomButton } from "../RainbowkitCustomButton/Button";
import { useAccount, useSigner } from "wagmi";
import UseGetGovernment from "../../hooks/GetGovernment";
import { io } from "socket.io-client";
import authHeader from "../../services/auth.header";
export default function Header({ setNotifBox }) {
  const socket = useRef();

  const { GetGovernment } = UseGetGovernment();
  const user = useSelector((state) => state?.auth?.user);
  const receiverId = useSelector((state) => state.chatBox.receiverId);
  const [governemnt, setGovernemnt] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [chatBoxNotifUser, setChatBoxNotifUser] = useState();
  const [chatBoxReceiver, setChatBoxReceiver] = useState();
  const [chatBoxNotif, setChatBoxNotif] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      console.log("Debug ====>", user);
      axios
        .get(`http://localhost:5000/notif/role/${user?.roles}`)
        .then((res) => {
          setNotifBox(res?.data?.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setChatBoxNotifUser(data.senderId);
      setChatBoxNotif(1);
      setChatBoxReceiver(receiverId);

      console.log("datamesssage", data.text);
    });
  }, [socket, chatBoxNotif]);
  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("logout");
    await dispatch(logout());

    <Link to={"/homepage"} className="nav-link"></Link>;
  };

  const fetchGovernment = async () => {
    const res = await GetGovernment();
    setGovernemnt(res);
  };

  useEffect(() => {
    fetchGovernment();
  }, []);
  const { data } = useSigner();
  const handlechage = (e) => {
    setInputSearch(e.target.value);
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

  return (
    <div>
      {" "}
      <div className="header">
        <div className="grid">
          {/* <div className="header__navbar"></div> */}
          <div className="header__navbar header__navbar--manager">
            <div>
              <Link to={"/homepage"} className="nav-link">
                <img
                  className="logo-header"
                  src={Logoheader}
                  alt={Logoheader}
                ></img>
              </Link>
            </div>
            <ul className="header__navbar-list">
              <Link to={"/myhome"} className="nav-link">
                <li className="header__navbar--manager--item">
                  <BiHome></BiHome>
                  <span className="header__navbar--manager--item--title">
                    My Home
                  </span>
                </li>
              </Link>
              {user?.roles === "admin" ? (
                <Link to={"/admin"} className="nav-link">
                  <li className="header__navbar--manager--item">
                    <RiAdminLine className="header__navbar--manager--item-icon"></RiAdminLine>
                    <span className="header__navbar--manager--item--title">
                      Management
                    </span>
                  </li>
                </Link>
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

              <Link to={"/notification"} className="nav-link">
                <li className="header__navbar--manager--item">
                  <BiBell className="header__navbar--manager--item-icon"></BiBell>
                  <span className="header__navbar--manager--item--title">
                    Notification
                  </span>
                </li>
              </Link>

              <li className="header__navbar--manager--item">
                <div id="menu-discover-item">
                  <ul>
                    <li className="discover-edit">
                      <a href="">
                        <div className="discover-edit-item">
                          <BsFillPersonLinesFill className="icon-item header__navbar--manager--item-icon"></BsFillPersonLinesFill>
                          {!user ? (
                            <span className="text-white">Tài khoản </span>
                          ) : (
                            <span className="text-white">{user?.roles} </span>
                          )}
                          {console.log("deeeeeebuggggggg", user)}
                          <BsFillCaretDownFill className="icon-item header__navbar--manager--item-icon"></BsFillCaretDownFill>
                        </div>
                      </a>
                      {!user ? (
                        <ul className="sub-menu-discover-item">
                          <li>
                            <a href="#">
                              <Link to={"/login"} className="nav-link">
                                <FiLogIn className="icon-subnav"></FiLogIn>
                                <span className="sub-menu-discover-item-text">
                                  Log in
                                </span>{" "}
                              </Link>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <Link to={"/register"} className="nav-link">
                                <FaRegRegistered className="icon-subnav"></FaRegRegistered>
                                <span className="sub-menu-discover-item-text">
                                  Register
                                </span>
                              </Link>
                            </a>
                          </li>
                          {user ? (
                            <li>
                              <Link
                                to="/profile/userprofile"
                                className="nav-link"
                              >
                                <MdManageAccounts className="icon-subnav mr-0"></MdManageAccounts>{" "}
                                <span className="sub-menu-discover-item-text">
                                  Information Account
                                </span>
                              </Link>
                            </li>
                          ) : (
                            <Fragment></Fragment>
                          )}
                          <li>
                            <a href="#">
                              <RiShoppingCart2Fill className="icon-subnav"></RiShoppingCart2Fill>
                              <span className="sub-menu-discover-item-text">
                                Order Management
                              </span>
                            </a>
                          </li>
                        </ul>
                      ) : (
                        <ul className="sub-menu-discover-item">
                          {data && data._address === governemnt && (
                            <li>
                              <Link to="/government">
                                <MdManageAccounts className="icon-subnav"></MdManageAccounts>{" "}
                                <span className="sub-menu-discover-item-text">
                                  Goverment
                                </span>
                              </Link>
                            </li>
                          )}
                          <li>
                            <CustomButton label="Connect Wallet" />
                          </li>
                          {user ? (
                            <li>
                              <Link
                                to="/profile/userprofile"
                                className="nav-link"
                              >
                                <MdManageAccounts className="icon-subnav mr-0"></MdManageAccounts>{" "}
                                <span className="sub-menu-discover-item-text">
                                  Information Account
                                </span>
                              </Link>
                            </li>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          <li>
                            <a href="#">
                              <RiShoppingCart2Fill className="icon-subnav"></RiShoppingCart2Fill>
                              <span className="sub-menu-discover-item-text">
                                Order Management
                              </span>
                            </a>
                          </li>
                          {/* <li>
                            <a href="#">
                              <button className="wallet">
                                <AiOutlineWallet className="icon-subnav mr-0"></AiOutlineWallet>{" "}
                                <span className="sub-menu-discover-item-text">
                                  Wallet
                                </span>
                              </button>
                            </a>
                          </li> */}
                          <li>
                            <a href="#" onClick={handleLogout}>
                              <Link to={"/homepage"} className="nav-link">
                                <BiLogOut className="icon-subnav"></BiLogOut>
                                <span className="sub-menu-discover-item-text">
                                  Log out
                                </span>
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
          <div className="header__navbar header__navbar--operation justify-center">
            <div className="header__navbar--input">
              <input
                type="text"
                placeholder="Search"
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
            <button type="button" className="input-button-label--icon">
              <TfiWrite className="input-button--icon"></TfiWrite>
              {user ? (
                <Link to={"/postsell"} className="nav-link">
                  <p className="input-button--name">Post for Sale</p>
                </Link>
              ) : (
                <Link to={"/login"} className="nav-link">
                  <p className="input-button--name">Post for Sale</p>
                </Link>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
