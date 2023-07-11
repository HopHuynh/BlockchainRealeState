// components/UserForm.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./style.css";
const UserForm = ({ createUser, updateUser, editingUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setRole(editingUser.roles);
    } else {
      setName("");
      setEmail("");
      setRole("");
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp");
      return;
    }

    if (currentPassword && currentPassword === newPassword) {
      toast.error("Mật khẩu mới trùng với mật khẩu cũ!");

      return;
    }
    const newUser = { name, email, password, roles };
    const editUser1 = { name, email, roles };
    const editUser2 = { name, email, currentPassword, newPassword, roles };

    if (editingUser) {
      if (currentPassword && currentPassword === newPassword) {
        updateUser(editingUser._id, editUser2);
      } else {
        updateUser(editingUser._id, editUser1);
      }
      toast.success("User updated successfully!");
    } else {
      createUser(newUser);
      toast.success("User created successfully!");
    }
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setConfirmPassword("");
    setCurrentPassword("");
    setNewPassword("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="user-form-container">
      {createUser ? (
        <>
          <h2 className="section-title">Add User</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-password-button"
              onClick={toggleShowPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            <label htmlFor="password">Confirm Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="roles">Role:</label>
            <select
              id="roles"
              value={roles}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="government">Government</option>
            </select>
            <button type="submit">Add</button>
          </form>
        </>
      ) : (
        <>
          <h2 className="section-title">Edit User</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            
            <label htmlFor="roles">Role:</label>
            <select
              id="roles"
              value={roles}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="government">Government</option>
            </select>
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </div>
  );
};

export default UserForm;
