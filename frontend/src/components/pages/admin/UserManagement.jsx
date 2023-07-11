// components/AdminPage.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import UserList from "../../admin/users/UserList";
import UserForm from "../../admin/users/UserForm";

import "./admin.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [editingUser, setEditingUser] = useState(null);
 

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      console.log("response",response)
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (newUser) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/signupp",
        newUser
      );
      getUsers();
      setUsers([...users, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (userId, updatedUser) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, updatedUser);
      getUsers(); // Lấy danh sách người dùng mới sau khi cập nhật
      // setEditingUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(users?.content?.filter((user) => user._id !== userId));
      getUsers();
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="user-manage">
        <UserList
          users={users}
          deleteUser={deleteUser}
          updateUser={updateUser}
        />
        <button
          className="create-user-button"
          onClick={() => setShowModal(true)}
        >
          Create User
        </button>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
              <UserForm
                createUser={createUser}
                // updateUser={updateUser}
                // editingUser={editingUser}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
