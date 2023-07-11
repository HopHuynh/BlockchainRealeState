import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { MdManageAccounts, MdKey, MdOutlineSupportAgent } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "./ProfileStyle.css";

const ProfileMenu = () => {
  const user = useSelector((state) => state.auth.user);
  const [userDetail, setUserDetail] = useState({});
  //const [avatar, setAvatar] = useState(null);
  const [img_url, setImg_url] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      img_url && URL.revokeObjectURL(img_url);
    };
  }, [img_url]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const userId = user.id;
      const response = await axios.get(
        `http://localhost:5000/api/user/detail/${userId}`
      );
      setUserDetail(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };


  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    //setImg_url((prev) => [...prev, file]);
    setImg_url(file);
  };

  const handleAvatarUpdate = (e) => {
    e.preventDefault();
    if (img_url) {
      const formData = new FormData();
      formData.append("img_url", img_url);

      axios
        .put(`http://localhost:5000/api/profile/${user.id}`, formData)
        .then((response) => {
          console.log(response.data);
          toast.success("Updated avatar success");
        })
        .catch((error) => {
          console.error(error);
          // Xử lý lỗi
        });
    }
  };
  // const handleAvatarUpdate = (e) => {
  //   e.preventDefault();
  //   if (img_url) {
  //     const formData = new FormData();
  //     formData.append("avatar", img_url);

  //     axios
  //       .put(`http://localhost:5000/api/profile/${user.id}`, formData)
  //       .then((response) => {
  //         console.log(response.data);
  //         // Cập nhật thành công
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         // Xử lý lỗi
  //       });
  //   }
  // };

  return (
    <div className="profile-menu-container">
      <div className="menu-btn-container">
        <div className="img-avt">
          {/* < img 
            src={
              avatar ||
              "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
            }
            alt="Avatar"
          /> */}

          <label htmlFor="input-img-avatar">
            <img
              src={
                img_url ||
                img_url?.preview ||
                userDetail.img_url ||
                "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
              }
              alt="Avatar"
            />
          
          </label>
          <input
            id="input-img-avatar"
            hidden
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleAvatarChange}
            name="img_url"
          />
        </div>

        <p>{userDetail.name || "unknown"}</p>
        <div className="avt-btn">
          {/* <button
            className="choose-file"
            onClick={() => document.getElementById("avatar").click()}
          >
            Choose forder
          </button>
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={handleAvatarChange}
          /> */}
          <button className="btn-update" onClick={handleAvatarUpdate}>
            Update Avatar
          </button>
        </div>
        {/* <div className="avatar-hover-icon" onClick={handleAvatarChange}></div> */}

        <div className="containner-select">
          <NavLink
            to="/profile/userprofile"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <div className="select-menu">
              <MdManageAccounts className="select-menu__icon" />
              <span className="select-menu__text">Account</span>
            </div>
          </NavLink>
        </div>
        <div className="containner-select">
          <NavLink
            to="/profile/reset-password"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <div className="select-menu">
              <MdKey className="select-menu__icon" />
              <span className="select-menu__text">Change Password</span>
            </div>
          </NavLink>
        </div>
        <div className="containner-select">
          <div className="select-menu">
            <MdOutlineSupportAgent className="select-menu__icon" />
            <span className="select-menu__text">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
