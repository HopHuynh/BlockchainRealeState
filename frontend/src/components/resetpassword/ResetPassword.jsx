import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
const ResetPassword = () => {
  const user = useSelector((state) => state?.auth?.user);

  const email = user?.email;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  console.log(email);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("IDD:", email);
      const response = await axios.put("http://localhost:5000/reset-password", {
        email,
        oldPassword,
        newPassword,
        confirmNewPassword,
      });
      if (response.status === 200) {
        setIsSuccess(true);
        setMessage(response.data.message);
      } else {
        setIsSuccess(false);
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Error");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="label">
            <span htmlFor="email">Email</span>
            <input type="email" id="email" value={email} />
          </div>
          <div className="label">
            <span htmlFor="oldPassword">Old password</span>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
            />
          </div>
          <div className="label">
            <span htmlFor="newPassword">New password</span>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="label">
            <span htmlFor="confirmNewPassword">Confirm New password</span>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Enter confirm password"
            />
          </div>
          {message && (
            <p className={isSuccess ? "success" : "error"}>{message}</p>
          )}
          <div className=".container-btn-submit">
            <button type="submit">Reset password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
