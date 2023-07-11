import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "./ProfileStyle.css";

const ProfilePage = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [userDetail, setUserDetail] = useState({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/detail/${user.id}`
      );
      setUserDetail(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: name,
        username: username,
        phoneNumber: phoneNumber,
        birthday: birthday,
        address: address,
      };
      const response = await axios.put(
        `http://localhost:5000/api/users/${user.id}`,
        updatedData
      );
      toast.success("Updated success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-profile-container">
      {console.log("user detail:", userDetail)}
      <div className="info-container">
        <h1>Account Setting</h1>
        <form onSubmit={handleAccountUpdate}>
          <div className="label">
            <span htmlFor="email">Email</span>
            <input type="email" id="email" value={user.email} />
          </div>
          <div className="label">
            <span htmlFor="name">Name</span>
            <input
              type="text"
              id="name"
              defaultValue={userDetail.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="label">
            <span htmlFor="username">Username</span>
            <input
              type="text"
              id="username"
              defaultValue={userDetail.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="label">
            <span htmlFor="birthday">Birthday</span>
            <input
              id="birthday"
              defaultValue={userDetail.birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className="label">
            <span htmlFor="phoneNumber">Phone</span>
            <input
              type="text"
              id="phoneNumber"
              defaultValue={userDetail.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="[0]{1}[0-9]{9}"
            />
          </div>
          <div className="label">
            <span htmlFor="address">Address</span>
            <input
              type="text"
              id="address"
              defaultValue={userDetail.address}
              // value={userDetail.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="btn-update-info">
            <button type="submit" onClick={handleAccountUpdate}>
              Update account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
